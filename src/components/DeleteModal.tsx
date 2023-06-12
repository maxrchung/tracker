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
import { useApplicationStore } from "../stores/application";
import useForceRefetch from "./useForceRefetch";

interface DeleteModalProps {
  isVisible: boolean;
  entry?: Entry;
  entryName: string;
  onCancel: () => void;
  onSubmit: () => void;
  resetPage: () => void;
}

export default function DeleteModal({
  isVisible,
  entry,
  entryName,
  onCancel,
  onSubmit,
  resetPage,
}: DeleteModalProps) {
  const addError = useNotificationStore((state) => state.addError);
  const addSelect = useApplicationStore((state) => state.addSelect);
  const setAddSelect = useApplicationStore((state) => state.setAddSelect);
  const chartType = useApplicationStore((state) => state.chartType);
  const setChartType = useApplicationStore((state) => state.setChartType);
  const forceRefetch = useForceRefetch();

  const deleteEntry = useMutation({
    mutationFn: requests.deleteEntry,
    onSuccess: (hasOnlyOne) => {
      // Reset default selections if entry name no longer exists.
      if (hasOnlyOne && addSelect.value === entry?.nameId) {
        setAddSelect({});
      }
      if (hasOnlyOne && chartType.value === entry?.nameId) {
        setChartType({});
      }
      onSubmit();
      forceRefetch();
      resetPage();
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
      header="Delete"
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
