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

const createEntry = async (entry: Schema) => {
  let entryNameId = entry.select.value;

  // Create entry name if new
  if (entryNameId === CREATE_NEW_ENTRY) {
    const name =
      (entry.select.label === CREATE_NEW_ENTRY
        ? entry.name?.trim() // Trim so we don't get some weird spacing
        : entry.select.label) ?? "";
    const createEntryNameInput: CreateEntryNameInput = {
      name,
    };

    const createEntryName = await API.graphql<
      GraphQLQuery<CreateEntryNameMutation>
    >({
      query: mutations.createEntryName,
      variables: {
        input: createEntryNameInput,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    entryNameId = createEntryName.data?.createEntryName?.id;
  }

  if (!entryNameId) {
    throw new Error("Entry failed to be created. Try submitting again.");
  }

  const createEntryInput: CreateEntryInput = {
    nameId: entryNameId,
    sortByDate: SORT_KEY,
    ...(entry.value && { value: entry.value }),
  };
  return await API.graphql<GraphQLQuery<CreateEntryMutation>>({
    query: mutations.createEntry,
    variables: {
      input: createEntryInput,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
};

const listEntries = (currToken: undefined | string | null) => async () => {
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

// Not inlining the functions here so that mapEntryNames can call listEntryNames.
const requests = {
  listEntryNames,
  mapEntryNames,
  createEntry,
  listEntries,
};
export default requests;
