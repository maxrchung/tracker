import * as yup from "yup";
import { CREATE_NEW_ENTRY, MAX_ENTRY_TYPES } from "../../constants";
import { EntryName } from "../../API";
import { SelectProps } from "@cloudscape-design/components/select";

export const buildSchema = (entryNames: EntryName[]) =>
  yup.object({
    select: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .test(
        "required",
        "Type is required.",
        (select) => select && !!select.value
      ),
    name: yup.string().when("select", {
      is: (select: SelectProps.Option | null) =>
        select?.value === CREATE_NEW_ENTRY,
      then: (schema) =>
        schema
          .required("Entry type is required.")
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
              return `${value} is already a type. Select it from the Type drop down.`;
            },
            (value) => !entryNames.some((item) => item.name === value)
          ),
    }),
    value: yup
      .number()
      .typeError("Value is required.")
      .required("Value is required."),
  });

// lol? this can't be right
const tempSchema = buildSchema([]);
export type Schema = yup.InferType<typeof tempSchema>;
