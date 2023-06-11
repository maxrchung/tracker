import * as yup from "yup";
import { EntryName } from "../../API";
import { MAX_ENTRY_TYPES } from "../../constants";

export const buildSchema = (entryNames: EntryName[], entryName: string) =>
  yup.object({
    name: yup
      .string()
      .required("Type is required.")
      .max(100, "Type has a maximum of 100 characters.")
      .test(
        "max",
        () =>
          `Failed to add new type. Only ${MAX_ENTRY_TYPES} types are allowed.`,
        () => entryNames.length <= MAX_ENTRY_TYPES
      )
      .test(
        "unique",
        ({ value }) => {
          return `${value} is already a type. Enter another type name.`;
        },
        (value) =>
          !entryNames.some((item) => item.name === value) ||
          // Don't show error if same as existing
          value === entryName
      ),
    value: yup
      .number()
      .typeError("Value is required.")
      .required("Value is required."),
  });

// lol? this can't be right
const tempSchema = buildSchema([], "");
export type Schema = yup.InferType<typeof tempSchema>;
