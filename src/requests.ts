import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { Schema } from "./schema";
import {
  ListEntryNamesQuery,
  CreateEntryNameInput,
  CreateEntryNameMutation,
  CreateEntryInput,
  CreateEntryMutation,
  Entry,
  EntriesBySortByDateAndCreatedAtQuery,
  EntriesBySortByDateAndCreatedAtQueryVariables,
  EntryName,
  ModelSortDirection,
  EntriesByNameIdAndCreatedAtQuery,
  EntriesByNameIdAndCreatedAtQueryVariables,
  DeleteEntryInput,
  DeleteEntryMutation,
  DeleteEntryNameInput,
} from "./API";
import { CREATE_NEW_ENTRY, MAX_PAGE, SORT_KEY } from "./constants";

const listEntryNames = async () => {
  const query = await API.graphql<GraphQLQuery<ListEntryNamesQuery>>({
    query: queries.listEntryNames,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  const entryNames =
    // flatMap to handle null: https://stackoverflow.com/a/59726888
    query.data?.listEntryNames?.items?.flatMap((item) =>
      item ? [item] : []
    ) ?? [];
  return entryNames;
};

const mapEntryNames = async () => {
  const entryNames = await listEntryNames();
  // Return map so that we can quickly look up
  const map = entryNames.reduce<Record<string, EntryName>>((map, curr) => {
    map[curr.id] = curr;
    return map;
  }, {});
  return map;
};

const listEntries = async (currToken: undefined | string | null) => {
  const variables: EntriesBySortByDateAndCreatedAtQueryVariables = {
    sortByDate: SORT_KEY,
    nextToken: currToken,
    sortDirection: ModelSortDirection.DESC,
    limit: MAX_PAGE,
  };
  const query = await API.graphql<
    GraphQLQuery<EntriesBySortByDateAndCreatedAtQuery>
  >({
    query: queries.entriesBySortByDateAndCreatedAt,
    variables,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });

  // flatMap to handle null: https://stackoverflow.com/a/59726888
  const entries: Entry[] =
    query.data?.entriesBySortByDateAndCreatedAt?.items?.flatMap((item) =>
      item ? [item] : []
    ) ?? [];
  const nextToken = query.data?.entriesBySortByDateAndCreatedAt?.nextToken;

  return {
    entries,
    nextToken,
  };
};

const createEntry = async (entry: Schema) => {
  let entryNameId = entry.select.value;

  // Create entry name if new
  if (entryNameId === CREATE_NEW_ENTRY) {
    const name =
      (entry.select.label === CREATE_NEW_ENTRY
        ? entry.name?.trim() // Trim so we don't get some weird spacing
        : entry.select.label) ?? "";
    const input: CreateEntryNameInput = { name };

    const createEntryName = await API.graphql<
      GraphQLQuery<CreateEntryNameMutation>
    >({
      query: mutations.createEntryName,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    entryNameId = createEntryName.data?.createEntryName?.id;
  }

  if (!entryNameId) {
    throw new Error(
      "There was a problem adding entry type. Try submitting again."
    );
  }

  const input: CreateEntryInput = {
    nameId: entryNameId,
    sortByDate: SORT_KEY,
    ...(entry.value && { value: entry.value }),
  };
  await API.graphql<GraphQLQuery<CreateEntryMutation>>({
    query: mutations.createEntry,
    variables: { input },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
};

const hasOnlyOneEntry = async (nameId: string) => {
  const variables: EntriesByNameIdAndCreatedAtQueryVariables = {
    limit: 2,
    nameId,
  };
  const query = await API.graphql<
    GraphQLQuery<EntriesByNameIdAndCreatedAtQuery>
  >({
    query: queries.entriesByNameIdAndCreatedAt,
    variables,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });

  const entries = query.data?.entriesByNameIdAndCreatedAt?.items ?? [];
  return entries.length === 1;
};

const deleteEntry = async ({ id, nameId }: Entry) => {
  const hasOnlyOne = await hasOnlyOneEntry(nameId);

  const input: DeleteEntryInput = { id };
  await API.graphql<GraphQLQuery<DeleteEntryMutation>>({
    query: mutations.deleteEntry,
    variables: { input },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });

  // Cleanup entry name entry
  if (hasOnlyOne) {
    const input: DeleteEntryNameInput = { id: nameId };
    await API.graphql<GraphQLQuery<DeleteEntryMutation>>({
      query: mutations.deleteEntryName,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  }
};

// Not inlining the functions here so that mapEntryNames can call listEntryNames.
const requests = {
  listEntryNames,
  mapEntryNames,
  createEntry,
  listEntries,
  deleteEntry,
};
export default requests;
