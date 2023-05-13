import type { GraphQLResult } from "@aws-amplify/api";

// User defined type check: https://stackoverflow.com/a/44078574
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMessageProperty = (error: any): error is Error => {
  return !!error.message;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasErrorsProperty = (error: any): error is GraphQLResult => {
  return !!error.errors;
};

export const getErrorMessage = (error: Error | GraphQLResult) => {
  if (hasMessageProperty(error)) {
    return error.message;
  }

  if (hasErrorsProperty(error)) {
    return error.errors?.map((error) => error.message.trim()).join(" ") ?? "";
  }

  return "";
};
