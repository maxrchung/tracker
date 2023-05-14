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

export default function Entries() {
  const [selectedItems, setSelectedItems] = React.useState<Entry[]>([]);
  const [page, setPage] = useState<number>(0);

  const mapEntryNames = useQuery({
    queryKey: ["mapEntryNames"],
    queryFn: requests.mapEntryNames,
  });

  // null means that there are no more results
  const [tokens, setTokens] = useState<(undefined | string | null)[]>([
    undefined,
  ]);

  const listEntries = useQuery({
    queryKey: ["listEntries", tokens[page]],
    queryFn: requests.listEntries(tokens[page]),
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
      selectedItems={selectedItems ? selectedItems : []}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      header={
        <Header
          variant="h1"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={selectedItems.length === 0}>Delete</Button>
              <Button disabled={selectedItems.length === 0}>Edit</Button>
              <Button variant="primary" href="/entries/create">
                Add entry
              </Button>
            </SpaceBetween>
          }
        >
          Entries
        </Header>
      }
      columnDefinitions={[
        {
          id: "name",
          header: "Type",
          cell: (e) => mapEntryNames.data?.[e.nameId]?.name ?? "",
        },
        {
          id: "value",
          header: "Value",
          cell: (e) => e.value,
        },
        {
          id: "date",
          header: `Time ${format(Date.now(), "(zzzz)")}`,
          cell: (e) => format(new Date(e.createdAt), "MMMM d, y, h:mm aa"),
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
          <Button>Add entry</Button>
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
