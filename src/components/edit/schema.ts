import * as yup from "yup";

export const schema = yup.object({
  value: yup.number(),
});

export type Schema = yup.InferType<typeof schema>;
