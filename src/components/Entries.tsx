import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { API } from "aws-amplify";
import {
  EntriesByCreatedAtAndNameIdQuery,
  Entry,
  EntryName,
  ListEntriesQuery,
  ListEntryNamesQuery,
} from "./API";
import * as queries from "../graphql/queries";
import { GraphQLQuery } from "@aws-amplify/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import format from "date-fns/format";

export default function Entries() {
  const [selectedItems, setSelectedItems] = React.useState<Entry[]>([]);

  const listEntryNames = useQuery({
    queryKey: ["listEntryNames2"],
    queryFn: async () => {
      const query = await API.graphql<GraphQLQuery<ListEntryNamesQuery>>({
        query: queries.listEntryNames,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      // flatMap to handle null: https://stackoverflow.com/a/59726888
      const items: EntryName[] =
        query.data?.listEntryNames?.items?.flatMap((item) =>
          item ? [item] : []
        ) ?? [];
      // Return map so that we can quickly look up
      const map = items.reduce<Record<string, EntryName>>((map, curr) => {
        map[curr.id] = curr;
        return map;
      }, {});
      return map;
    },
  });

  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>();
  // null means that there are no more results
  const [nextToken, setNextToken] = useState<string | null>();
  const listEntries = useQuery({
    queryKey: ["listEntries", page],
    queryFn: async () => {
      const query = await API.graphql<
        GraphQLQuery<EntriesByCreatedAtAndNameIdQuery>
      >({
        query: queries.entriesByCreatedAtAndNameId,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      // I think this nextToken management works because react-query will cache pages
      const nextToken = query.data?.entriesByCreatedAtAndNameId?.nextToken;
      setNextToken(nextToken);
      if (nextToken === null) {
        setLastPage(page);
      }

      // flatMap to handle null: https://stackoverflow.com/a/59726888
      const items: Entry[] =
        query.data?.entriesByCreatedAtAndNameId?.items?.flatMap((item) =>
          item ? [item] : []
        ) ?? [];
      return items;
    },
  });

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
              <Button disabled={!!selectedItems}>Delete</Button>
              <Button disabled={!!selectedItems}>Edit</Button>
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
          header: "Name",
          cell: (e) => listEntryNames.data?.[e.nameId]?.name ?? "",
        },
        {
          id: "value",
          header: "Number value",
          cell: (e) => e.value,
        },
        {
          id: "date",
          header: `Date ${format(Date.now(), "(zzzz)")}`,
          cell: (e) => format(new Date(e.createdAt), "yyyy-MM-dd hh:mm aa"),
        },
      ]}
      items={listEntries.data ?? []}
      trackBy="id"
      loading={false}
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
        listEntries?.data &&
        listEntries.data.length > 0 && (
          <Pagination
            currentPageIndex={page + 1} // 0 index to 1 index
            pagesCount={lastPage ?? Infinity}
            openEnd={nextToken !== null}
            onNextPageClick={() => {
              console.log("Next page");
            }}
          />
        )
      }
    />
  );
}
