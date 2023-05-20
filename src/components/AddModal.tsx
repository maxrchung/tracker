import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GraphQLResult } from "@aws-amplify/api"; // ??? idk
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotificationStore } from "../stores/notification";
import { getErrorMessage } from "../error";
import { Schema, buildSchema } from "../schema";
import requests from "../requests";
import { CREATE_NEW_ENTRY } from "../constants";
import AddEntryFields from "./AddFields";
import BoldEntry from "./BoldEntry";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";

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
  const addSuccess = useNotificationStore((state) => state.addSuccess);
  const addError = useNotificationStore((state) => state.addError);
  const queryClient = useQueryClient();

  const listEntryNames = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: requests.listEntryNames,
  });
  const entryNames = listEntryNames.data ?? [];
  const schema = buildSchema(entryNames);

  const form = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const onReset = () => {
    form.reset();
    onDismiss();
  };

  const createEntry = useMutation({
    mutationFn: requests.createEntry,
    onSuccess: (_data, { select, name, value }) => {
      onReset();
      const entryName = select.label === CREATE_NEW_ENTRY ? name : select.label;
      addSuccess(
        <>
          You added <BoldEntry entryName={entryName} value={value} />.
        </>
      );
      queryClient.clear();
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
      header="Add entry"
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
            <AddEntryFields entryNames={listEntryNames.data} />
          </Form>
        </form>
      </FormProvider>
    </Modal>
  );
}
