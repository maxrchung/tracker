import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { GraphQLResult } from "@aws-amplify/api"; // ??? idk
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotificationStore } from "../../stores/notification";
import { getErrorMessage } from "../../error";
import { Schema, buildSchema } from "./schema";
import requests from "../../requests";
import { CREATE_NEW_ENTRY } from "../../constants";
import EditFields from "./AddFields";
import BoldEntry from "../BoldEntry";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import { useApplicationStore } from "../../stores/application";
import useForceRefetch from "../useForceRefetch";

interface AddModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  resetPage: () => void;
}

export default function AddModal({
  isVisible,
  onDismiss,
  resetPage,
}: AddModalProps) {
  const addError = useNotificationStore((state) => state.addError);
  const addSelect = useApplicationStore((state) => state.addSelect);
  const setAddSelect = useApplicationStore((state) => state.setAddSelect);
  const forceRefetch = useForceRefetch();

  const listEntryNames = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: requests.listEntryNames,
  });
  const entryNames = listEntryNames.data ?? [];
  const schema = buildSchema(entryNames);

  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    values: {
      select: addSelect,
      // @ts-expect-error: Need to purposely set default value as undefined
      value: undefined,
    },
  });

  const onReset = () => {
    form.reset();
    onDismiss();
  };

  const createEntry = useMutation({
    mutationFn: requests.createEntry,
    onSuccess: async (entryNameId, { select, name }) => {
      onReset();
      if (select.value === CREATE_NEW_ENTRY) {
        setAddSelect({ value: entryNameId, label: name });
      }
      forceRefetch();
      resetPage();
    },
    onError: (error: Error | GraphQLResult, { select, name, value }) => {
      const entryName = select.label === CREATE_NEW_ENTRY ? name : select.label;
      addError(
        <>
          Failed to add <BoldEntry entryName={entryName} value={value} />.{" "}
          {getErrorMessage(error)}
        </>
      );
    },
  });

  return (
    <Modal
      onDismiss={onReset}
      visible={isVisible}
      header="Add"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onReset}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                form.handleSubmit((data) => createEntry.mutate(data))()
              }
            >
              Add
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => createEntry.mutate(data))}>
          <Form variant="embedded">
            <EditFields entryNames={listEntryNames.data} />
          </Form>
        </form>
      </FormProvider>
    </Modal>
  );
}
