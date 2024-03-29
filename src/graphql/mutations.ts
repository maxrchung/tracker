/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
      nameId
      value
      sortByDate
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateEntry = /* GraphQL */ `
  mutation UpdateEntry(
    $input: UpdateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    updateEntry(input: $input, condition: $condition) {
      nameId
      value
      sortByDate
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteEntry = /* GraphQL */ `
  mutation DeleteEntry(
    $input: DeleteEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    deleteEntry(input: $input, condition: $condition) {
      nameId
      value
      sortByDate
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const createEntryName = /* GraphQL */ `
  mutation CreateEntryName(
    $input: CreateEntryNameInput!
    $condition: ModelEntryNameConditionInput
  ) {
    createEntryName(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateEntryName = /* GraphQL */ `
  mutation UpdateEntryName(
    $input: UpdateEntryNameInput!
    $condition: ModelEntryNameConditionInput
  ) {
    updateEntryName(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteEntryName = /* GraphQL */ `
  mutation DeleteEntryName(
    $input: DeleteEntryNameInput!
    $condition: ModelEntryNameConditionInput
  ) {
    deleteEntryName(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
