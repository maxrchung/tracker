import { useMutation } from "@tanstack/react-query";
import { Entry } from "../API";
import Modal from "@cloudscape-design/components/modal";
import { getErrorMessage } from "../error";
import requests from "../requests";
import BoldEntry from "./BoldEntry";
import { useNotificationStore } from "../stores/notification";
import type { GraphQLResult } from "@aws-amplify/api";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

interface DeleteModalProps {
  isVisible: boolean;
  entry?: Entry;
  entryName: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function DeleteModal({
  isVisible,
  entry,
  entryName,
  onCancel,
  onSubmit,
}: DeleteModalProps) {
  const addSuccess = useNotificationStore((state) => state.addSuccess);
  const addError = useNotificationStore((state) => state.addError);

  const deleteEntry = useMutation({
    mutationFn: requests.deleteEntry,
    onSuccess: () => {
      addSuccess(
        <>
          You deleted <BoldEntry entryName={entryName} value={entry?.value} />.
        </>
      );
      onSubmit();
    },
    onError: (error: Error | GraphQLResult) => {
      addError(
        <>
          Failed to delete <strong>{entryName}</strong>.{" "}
          {getErrorMessage(error)}
        </>
      );
    },
  });

  return (
    <Modal
      onDismiss={onCancel}
      visible={isVisible}
      header="Delete entry"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!entry} // Shouldn't happen but you never know
              loading={deleteEntry.isLoading}
              onClick={() => entry && deleteEntry.mutate(entry)}
            >
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      Are you sure you want to delete{" "}
      <BoldEntry entryName={entryName} value={entry?.value} />?
    </Modal>
  );
}
