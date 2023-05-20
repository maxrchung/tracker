import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import format from "date-fns/format";
import requests from "../requests";
import { Entry } from "../API";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";

export default function Entries() {
  const [selectedItem, setSelectedItem] = React.useState<Entry>();
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);

  const mapEntryNames = useQuery({
    queryKey: ["mapEntryNames"],
    queryFn: requests.mapEntryNames,
  });
  const entryNames = mapEntryNames.data ?? {};

  const [page, setPage] = useState<number>(0);
  // null means that there are no more results
  const [tokens, setTokens] = useState<(undefined | string | null)[]>([
    undefined,
  ]);
  // Explicitly reset when adding or deleting entries
  const resetPage = () => {
    setPage(0);
    setTokens([undefined]);
  };

  const listEntries = useQuery({
    queryKey: ["listEntries", tokens[page]],
    queryFn: () => requests.listEntries(tokens[page]),
    onSuccess: ({ nextToken }) => {
      if (page + 1 >= tokens.length) {
        setTokens([...tokens, nextToken]);
      }
    },
  });
  const entries = listEntries.data?.entries ?? [];

  return (
    <Table
      variant="full-page"
      resizableColumns
      stickyHeader
      selectionType="single"
      selectedItems={selectedItem ? [selectedItem] : []}
      onSelectionChange={({ detail }) =>
        setSelectedItem(detail.selectedItems[0])
      }
      header={
        <Header
          variant="h1"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                disabled={!selectedItem}
                onClick={() => setIsDeleteVisible(true)}
              >
                Delete
              </Button>
              <Button disabled={!selectedItem}>Edit</Button>
              <Button variant="primary" onClick={() => setIsAddVisible(true)}>
                Add
              </Button>
            </SpaceBetween>
          }
        >
          Entries
          <DeleteModal
            isVisible={isDeleteVisible}
            entry={selectedItem}
            entryName={
              selectedItem?.nameId
                ? entryNames[selectedItem?.nameId]?.name ?? ""
                : ""
            }
            onCancel={() => setIsDeleteVisible(false)}
            onSubmit={() => {
              setIsDeleteVisible(false);
              setSelectedItem(undefined);
            }}
            resetPage={resetPage}
          />
          <AddModal
            isVisible={isAddVisible}
            onDismiss={() => setIsAddVisible(false)}
            resetPage={resetPage}
          />
        </Header>
      }
      columnDefinitions={[
        {
          id: "name",
          header: "Type",
          cell: (e) => entryNames[e.nameId]?.name ?? "",
        },
        {
          id: "value",
          header: "Value",
          cell: (e) => e.value ?? "-",
        },
        {
          id: "date",
          header: `Time ${format(Date.now(), "(zzzz)")}`,
          cell: (e) => format(new Date(e.createdAt), "MMMM d, y, h:mm:ss aa"),
        },
      ]}
      items={entries}
      trackBy="id"
      loading={mapEntryNames.isLoading || listEntries.isLoading}
      loadingText="Loading entries..."
      empty={
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: "s" }} variant="p" color="inherit">
            No entries to display.
          </Box>
          <Button onClick={() => setIsAddVisible(true)}>Add</Button>
        </Box>
      }
      pagination={
        <Pagination
          currentPageIndex={page + 1} // 0 index to 1 index
          pagesCount={
            tokens[tokens.length - 1] === null
              ? tokens.length - 1
              : tokens.length
          }
          openEnd={tokens[tokens.length - 1] != null}
          onChange={({ detail }) => setPage(detail.currentPageIndex - 1)}
        />
      }
    />
  );
}
