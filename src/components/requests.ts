import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { Schema } from "../schema";
import {
  ListEntryNamesQuery,
  CreateEntryNameInput,
  CreateEntryNameMutation,
  CreateEntryInput,
  CreateEntryMutation,
} from "../API";
import { CREATE_NEW_ENTRY } from "../constants";

const requests = {
  listEntryNames: async function listEntryNames() {
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
  },
  createEntry: async function (entry: Schema) {
    let entryNameId = entry.select.value;

    // Create entry name if new
    if (entryNameId === CREATE_NEW_ENTRY) {
      const name =
        (entry.select.label === CREATE_NEW_ENTRY
          ? entry.name
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
      sortByDate: "sort",
      ...(entry.value && { value: entry.value }),
    };
    return await API.graphql<GraphQLQuery<CreateEntryMutation>>({
      query: mutations.createEntry,
      variables: {
        input: createEntryInput,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  },
};

export default requests;
