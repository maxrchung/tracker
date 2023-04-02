/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEntryInput = {
  id?: string | null,
  nameId: string,
  value?: number | null,
  createdAt?: string | null,
};

export type ModelEntryConditionInput = {
  value?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEntryConditionInput | null > | null,
  or?: Array< ModelEntryConditionInput | null > | null,
  not?: ModelEntryConditionInput | null,
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

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Entry = {
  __typename: "Entry",
  id: string,
  nameId: string,
  value?: number | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateEntryInput = {
  id: string,
  nameId: string,
  value?: number | null,
  createdAt?: string | null,
};

export type DeleteEntryInput = {
  id: string,
  nameId: string,
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

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelEntryFilterInput = {
  id?: ModelIDInput | null,
  nameId?: ModelStringInput | null,
  value?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelEntryFilterInput | null > | null,
  or?: Array< ModelEntryFilterInput | null > | null,
  not?: ModelEntryFilterInput | null,
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelEntryConnection = {
  __typename: "ModelEntryConnection",
  items:  Array<Entry | null >,
  nextToken?: string | null,
};

export type ModelEntryNameFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelEntryNameFilterInput | null > | null,
  or?: Array< ModelEntryNameFilterInput | null > | null,
  not?: ModelEntryNameFilterInput | null,
};

export type ModelEntryNameConnection = {
  __typename: "ModelEntryNameConnection",
  items:  Array<EntryName | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionEntryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  nameId?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEntryFilterInput | null > | null,
  or?: Array< ModelSubscriptionEntryFilterInput | null > | null,
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

export type CreateEntryMutationVariables = {
  input: CreateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type CreateEntryMutation = {
  createEntry?:  {
    __typename: "Entry",
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
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
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
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
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
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
  nameId: string,
};

export type GetEntryQuery = {
  getEntry?:  {
    __typename: "Entry",
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListEntriesQueryVariables = {
  id?: string | null,
  nameId?: ModelStringKeyConditionInput | null,
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEntriesQuery = {
  listEntries?:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      id: string,
      nameId: string,
      value?: number | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EntriesByCreatedAtAndNameIdQueryVariables = {
  createdAt: string,
  nameId?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EntriesByCreatedAtAndNameIdQuery = {
  entriesByCreatedAtAndNameId?:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      id: string,
      nameId: string,
      value?: number | null,
      createdAt: string,
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
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
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
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
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
    id: string,
    nameId: string,
    value?: number | null,
    createdAt: string,
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
