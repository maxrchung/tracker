import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import { Schema as AddSchema } from "./components/add/schema";
import { Schema as EditSchema } from "./components/edit/schema";
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
  UpdateEntryInput,
  UpdateEntryNameInput,
  UpdateEntryNameMutation,
  UpdateEntryMutation,
} from "./API";
import {
  CREATE_NEW_ENTRY,
  DEFAULT_RESULTS,
  MAX_PAGE,
  SORT_KEY,
} from "./constants";
import { ChartResults, TimeOption } from "./types";
import subMonths from "date-fns/subMonths";
import subWeeks from "date-fns/subWeeks";
import subDays from "date-fns/subDays";
import { compareDesc } from "date-fns";

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
  entryNames.sort();
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

const listPageEntries = async (token: undefined | string | null) => {
  const variables: EntriesBySortByDateAndCreatedAtQueryVariables = {
    sortByDate: SORT_KEY,
    nextToken: token,
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

const listEntries = async (currToken: undefined | string | null) => {
  const pageEntries = await listPageEntries(currToken);
  const entries = pageEntries.entries;

  // Apparently it's possible when you list with a nextToken to get no items
  // back. Weird. This will introduce some odd behavior when a customer goes to
  // a 2nd page and sees no entries. To account for this, I'm going to perform a
  // second lookup and verify if that's empty.

  let nextToken = pageEntries.nextToken;
  if (nextToken) {
    const nextEntries = await listPageEntries(nextToken);
    if (nextEntries.entries.length === 0) {
      nextToken = null;
    }
  }

  return {
    entries,
    nextToken,
  };
};

const getTime = (timeOption: string) => {
  switch (timeOption) {
    case TimeOption.LAST_MONTH:
      return subMonths(new Date(), 1);
    case TimeOption.LAST_WEEK:
      return subWeeks(new Date(), 1);
    case TimeOption.LAST_DAY:
      return subDays(new Date(), 1);
    case TimeOption.ALL_TIME:
    default:
      return new Date(0);
  }
};

const listEntriesChart = async (type?: string, timeOption?: string) => {
  if (!type || !timeOption) {
    return DEFAULT_RESULTS;
  }

  const time = getTime(timeOption).toISOString();
  const variables: EntriesByNameIdAndCreatedAtQueryVariables = {
    sortDirection: ModelSortDirection.DESC,
    nameId: type,
    createdAt: { gt: time },
  };
  const query = await API.graphql<
    GraphQLQuery<EntriesByNameIdAndCreatedAtQuery>
  >({
    query: queries.entriesByNameIdAndCreatedAt,
    variables,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });

  const entries: Entry[] =
    query.data?.entriesByNameIdAndCreatedAt?.items?.flatMap((item) =>
      item ? [item] : []
    ) ?? [];

  const results = entries.reduce(
    (prev, curr) => {
      if (curr.value && curr.value > prev.maxValue) {
        prev.maxValue = curr.value;
      }

      const createdAt = new Date(curr.createdAt);
      if (
        timeOption === TimeOption.ALL_TIME &&
        compareDesc(createdAt, prev.minDate) === 1
      ) {
        prev.minDate = createdAt;
      }

      return prev;
    },
    {
      entries,
      maxValue: 0,
      minDate: timeOption === TimeOption.ALL_TIME ? new Date() : time,
    } as ChartResults
  );
  return results;
};

const createEntry = async (entry: AddSchema) => {
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
    value: entry.value,
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

type EditSchemaWithIds = EditSchema & {
  entryId: string;
  nameId: string;
};

const editEntry = async ({
  name,
  value,
  nameId,
  entryId,
}: EditSchemaWithIds) => {
  if (name) {
    const input: UpdateEntryNameInput = { id: nameId, name };
    await API.graphql<GraphQLQuery<UpdateEntryNameMutation>>({
      query: mutations.updateEntryName,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  }

  if (value) {
    const input: UpdateEntryInput = { id: entryId, value };
    await API.graphql<GraphQLQuery<UpdateEntryMutation>>({
      query: mutations.updateEntry,
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
  listEntriesChart,
  deleteEntry,
  editEntry,
};
export default requests;
