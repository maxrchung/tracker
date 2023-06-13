/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry(
    $filter: ModelSubscriptionEntryFilterInput
    $owner: String
  ) {
    onCreateEntry(filter: $filter, owner: $owner) {
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
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry(
    $filter: ModelSubscriptionEntryFilterInput
    $owner: String
  ) {
    onUpdateEntry(filter: $filter, owner: $owner) {
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
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry(
    $filter: ModelSubscriptionEntryFilterInput
    $owner: String
  ) {
    onDeleteEntry(filter: $filter, owner: $owner) {
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
export const onCreateEntryName = /* GraphQL */ `
  subscription OnCreateEntryName(
    $filter: ModelSubscriptionEntryNameFilterInput
    $owner: String
  ) {
    onCreateEntryName(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateEntryName = /* GraphQL */ `
  subscription OnUpdateEntryName(
    $filter: ModelSubscriptionEntryNameFilterInput
    $owner: String
  ) {
    onUpdateEntryName(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteEntryName = /* GraphQL */ `
  subscription OnDeleteEntryName(
    $filter: ModelSubscriptionEntryNameFilterInput
    $owner: String
  ) {
    onDeleteEntryName(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
