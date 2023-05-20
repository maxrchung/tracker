import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GraphQLResult } from "@aws-amplify/api"; // ??? idk
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotificationStore } from "../../stores/notification";
import { getErrorMessage } from "../../error";
import requests from "../../requests";
import BoldEntry from "../BoldEntry";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import { Schema, schema } from "./schema";
import EditFields from "./EditFields";
import { Entry } from "../../API";

interface EditModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  entry?: Entry;
  entryName: string;
}

export default function EditModal({
  isVisible,
  onDismiss,
  entry,
  entryName,
}: EditModalProps) {
  const addSuccess = useNotificationStore((state) => state.addSuccess);
  const addError = useNotificationStore((state) => state.addError);
  const queryClient = useQueryClient();

  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    values: {
      value: entry?.value ?? undefined,
    },
  });

  const onReset = () => {
    form.reset();
    onDismiss();
  };

  const editEntry = useMutation({
    mutationFn: requests.editEntry,
    onSuccess: (_data, { value }) => {
      onReset();
      addSuccess(
        <>
          You edited <BoldEntry entryName={entryName} value={value} />.
        </>
      );
      queryClient.clear();
    },
    onError: (error: Error | GraphQLResult, { value }) => {
      addError(
        <>
          Failed to edit <BoldEntry entryName={entryName} value={value} />.{" "}
          {getErrorMessage(error)}
        </>
      );
    },
  });

  return (
    <Modal
      onDismiss={onReset}
      visible={isVisible}
      header="Edit entry"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onReset}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                form.handleSubmit((data) =>
                  editEntry.mutate({
                    id: entry?.id ?? "",
                    value: data.value,
                  })
                )()
              }
            >
              Edit
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            editEntry.mutate({
              id: entry?.id ?? "",
              value: data.value,
            })
          )}
        >
          <Form variant="embedded">
            <EditFields entryName={entryName} />
          </Form>
        </form>
      </FormProvider>
    </Modal>
  );
}
