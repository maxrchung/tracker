import * as yup from "yup";
import { SelectOption } from "./types";
import { CREATE_NEW_ENTRY } from "./constants";
import { EntryName } from "./API";

export const buildSchema = (entryNames: EntryName[]) =>
  yup.object({
    select: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .test(
        "required",
        "Entry is required",
        (select) => select && !!select.label && !!select.value
      ),
    name: yup
      .string()
      .max(100, "Entry name has a maximum of 100 characters")
      .when("select", {
        is: (select: SelectOption | null) => select?.value === CREATE_NEW_ENTRY,
        then: (schema) =>
          schema
            .required("Entry name is required")
            .test(
              "max",
              () =>
                "Entry can't be added. Only 10 different entry types are allowed.",
              () => entryNames.length <= 10
            )
            .test(
              "unique",
              ({ value }) => {
                return `${value} is already an entry. Select it from the Entry drop down.`;
              },
              (value) => !entryNames.some((item) => item.name === value)
            ),
      }),
    value: yup.number(),
  });

// lol? this can't be right
const tempSchema = buildSchema([]);
export type Schema = yup.InferType<typeof tempSchema>;
