/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      nameId
      value
      sortByDate
      createdAt
      id
      updatedAt
      owner
    }
  }
`;
export const listEntries = /* GraphQL */ `
  query ListEntries(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        nameId
        value
        sortByDate
        createdAt
        id
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const entriesByNameIdAndCreatedAt = /* GraphQL */ `
  query EntriesByNameIdAndCreatedAt(
    $nameId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    entriesByNameIdAndCreatedAt(
      nameId: $nameId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        nameId
        value
        sortByDate
        createdAt
        id
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const entriesBySortByDateAndCreatedAt = /* GraphQL */ `
  query EntriesBySortByDateAndCreatedAt(
    $sortByDate: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    entriesBySortByDateAndCreatedAt(
      sortByDate: $sortByDate
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        nameId
        value
        sortByDate
        createdAt
        id
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEntryName = /* GraphQL */ `
  query GetEntryName($id: ID!) {
    getEntryName(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEntryNames = /* GraphQL */ `
  query ListEntryNames(
    $filter: ModelEntryNameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntryNames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
