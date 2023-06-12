import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GraphQLResult } from "@aws-amplify/api"; // ??? idk
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotificationStore } from "../../stores/notification";
import { getErrorMessage } from "../../error";
import requests from "../../requests";
import BoldEntry from "../BoldEntry";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import { Schema, buildSchema } from "./schema";
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

  const listEntryNames = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: requests.listEntryNames,
  });
  const entryNames = listEntryNames.data ?? [];
  const schema = buildSchema(entryNames, entryName);

  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    values: {
      name: entryName,
      // @ts-expect-error: Need to purposely set default value as undefined
      value: entry?.value ?? undefined,
    },
  });

  const onReset = () => {
    form.reset();
    onDismiss();
  };

  const editEntry = useMutation({
    mutationFn: requests.editEntry,
    onSuccess: (_data, { name, value }) => {
      onReset();
      addSuccess(
        <>
          You edited <BoldEntry entryName={name} value={value} />.
        </>
      );
      queryClient.clear();
    },
    onError: (error: Error | GraphQLResult, { name, value }) => {
      addError(
        <>
          Failed to edit <BoldEntry entryName={name} value={value} />.{" "}
          {getErrorMessage(error)}
        </>
      );
    },
  });

  return (
    <Modal
      onDismiss={onReset}
      visible={isVisible}
      header="Edit"
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
                    ...data,
                    nameId: entry?.nameId ?? "",
                    entryId: entry?.id ?? "",
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
              ...data,
              nameId: entry?.nameId ?? "",
              entryId: entry?.id ?? "",
            })
          )}
        >
          <Form variant="embedded">
            <EditFields />
          </Form>
        </form>
      </FormProvider>
    </Modal>
  );
}
