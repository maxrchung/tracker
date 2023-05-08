/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEntryInput = {
  nameId: string,
  value?: number | null,
  sortByDate: string,
  createdAt?: string | null,
  id?: string | null,
};

export type ModelEntryConditionInput = {
  nameId?: ModelStringInput | null,
  value?: ModelFloatInput | null,
  sortByDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEntryConditionInput | null > | null,
  or?: Array< ModelEntryConditionInput | null > | null,
  not?: ModelEntryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Entry = {
  __typename: "Entry",
  nameId: string,
  value?: number | null,
  sortByDate: string,
  createdAt: string,
  id: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateEntryInput = {
  nameId?: string | null,
  value?: number | null,
  sortByDate?: string | null,
  createdAt?: string | null,
  id: string,
};

export type DeleteEntryInput = {
  id: string,
};

export type CreateEntryNameInput = {
  id?: string | null,
  name: string,
};

export type ModelEntryNameConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelEntryNameConditionInput | null > | null,
  or?: Array< ModelEntryNameConditionInput | null > | null,
  not?: ModelEntryNameConditionInput | null,
};

export type EntryName = {
  __typename: "EntryName",
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateEntryNameInput = {
  id: string,
  name?: string | null,
};

export type DeleteEntryNameInput = {
  id: string,
};

export type ModelEntryFilterInput = {
  nameId?: ModelStringInput | null,
  value?: ModelFloatInput | null,
  sortByDate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEntryFilterInput | null > | null,
  or?: Array< ModelEntryFilterInput | null > | null,
  not?: ModelEntryFilterInput | null,
};

export type ModelEntryConnection = {
  __typename: "ModelEntryConnection",
  items:  Array<Entry | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelEntryNameFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelEntryNameFilterInput | null > | null,
  or?: Array< ModelEntryNameFilterInput | null > | null,
  not?: ModelEntryNameFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelEntryNameConnection = {
  __typename: "ModelEntryNameConnection",
  items:  Array<EntryName | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionEntryFilterInput = {
  nameId?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionFloatInput | null,
  sortByDate?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEntryFilterInput | null > | null,
  or?: Array< ModelSubscriptionEntryFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionEntryNameFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEntryNameFilterInput | null > | null,
  or?: Array< ModelSubscriptionEntryNameFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateEntryMutationVariables = {
  input: CreateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type CreateEntryMutation = {
  createEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateEntryMutationVariables = {
  input: UpdateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type UpdateEntryMutation = {
  updateEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteEntryMutationVariables = {
  input: DeleteEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type DeleteEntryMutation = {
  deleteEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateEntryNameMutationVariables = {
  input: CreateEntryNameInput,
  condition?: ModelEntryNameConditionInput | null,
};

export type CreateEntryNameMutation = {
  createEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateEntryNameMutationVariables = {
  input: UpdateEntryNameInput,
  condition?: ModelEntryNameConditionInput | null,
};

export type UpdateEntryNameMutation = {
  updateEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteEntryNameMutationVariables = {
  input: DeleteEntryNameInput,
  condition?: ModelEntryNameConditionInput | null,
};

export type DeleteEntryNameMutation = {
  deleteEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetEntryQueryVariables = {
  id: string,
};

export type GetEntryQuery = {
  getEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListEntriesQueryVariables = {
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntriesQuery = {
  listEntries?:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      nameId: string,
      value?: number | null,
      sortByDate: string,
      createdAt: string,
      id: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EntriesByNameIdAndCreatedAtQueryVariables = {
  nameId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EntriesByNameIdAndCreatedAtQuery = {
  entriesByNameIdAndCreatedAt?:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      nameId: string,
      value?: number | null,
      sortByDate: string,
      createdAt: string,
      id: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EntriesBySortByDateAndCreatedAtQueryVariables = {
  sortByDate: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EntriesBySortByDateAndCreatedAtQuery = {
  entriesBySortByDateAndCreatedAt?:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      nameId: string,
      value?: number | null,
      sortByDate: string,
      createdAt: string,
      id: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEntryNameQueryVariables = {
  id: string,
};

export type GetEntryNameQuery = {
  getEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListEntryNamesQueryVariables = {
  filter?: ModelEntryNameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntryNamesQuery = {
  listEntryNames?:  {
    __typename: "ModelEntryNameConnection",
    items:  Array< {
      __typename: "EntryName",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEntrySubscriptionVariables = {
  filter?: ModelSubscriptionEntryFilterInput | null,
  owner?: string | null,
};

export type OnCreateEntrySubscription = {
  onCreateEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateEntrySubscriptionVariables = {
  filter?: ModelSubscriptionEntryFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEntrySubscription = {
  onUpdateEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteEntrySubscriptionVariables = {
  filter?: ModelSubscriptionEntryFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEntrySubscription = {
  onDeleteEntry?:  {
    __typename: "Entry",
    nameId: string,
    value?: number | null,
    sortByDate: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateEntryNameSubscriptionVariables = {
  filter?: ModelSubscriptionEntryNameFilterInput | null,
  owner?: string | null,
};

export type OnCreateEntryNameSubscription = {
  onCreateEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateEntryNameSubscriptionVariables = {
  filter?: ModelSubscriptionEntryNameFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEntryNameSubscription = {
  onUpdateEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteEntryNameSubscriptionVariables = {
  filter?: ModelSubscriptionEntryNameFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEntryNameSubscription = {
  onDeleteEntryName?:  {
    __typename: "EntryName",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
