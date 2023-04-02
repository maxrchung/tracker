/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!, $nameId: String!) {
    getEntry(id: $id, nameId: $nameId) {
      id
      nameId
      value
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEntries = /* GraphQL */ `
  query ListEntries(
    $id: ID
    $nameId: ModelStringKeyConditionInput
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEntries(
      id: $id
      nameId: $nameId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        nameId
        value
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const entriesByCreatedAtAndNameId = /* GraphQL */ `
  query EntriesByCreatedAtAndNameId(
    $createdAt: AWSDateTime!
    $nameId: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    entriesByCreatedAtAndNameId(
      createdAt: $createdAt
      nameId: $nameId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        nameId
        value
        createdAt
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
