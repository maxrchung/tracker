import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Alert from "@cloudscape-design/components/alert";

import { Controller, useWatch } from "react-hook-form";
import { Schema } from "./schema";

interface EditFieldsProps {
  entryName: string;
}

export default function EditFields({ entryName }: EditFieldsProps) {
  const name = useWatch<Schema>({ name: "name" });

  return (
    <SpaceBetween size="l">
      <SpaceBetween size="s">
        <Controller
          name="name"
          render={({ field, fieldState: { error } }) => {
            const { onChange, value } = field;
            return (
              <FormField label="Type" errorText={error?.message}>
                <Input
                  {...field}
                  value={value ?? ""}
                  onChange={(event) => onChange(event.detail.value)}
                  type="text"
                  inputMode="text"
                />
              </FormField>
            );
          }}
        />

        {name !== entryName && (
          <Alert type="info">Changing the type affects all entries.</Alert>
        )}
      </SpaceBetween>

      <Controller
        name="value"
        render={({ field, fieldState: { error } }) => {
          const { onChange, value } = field;
          return (
            <FormField
              label="Value"
              errorText={error?.message}
              constraintText="Numeric values only."
            >
              <Input
                {...field}
                value={value?.toString() ?? ""}
                onChange={(event) => onChange(event.detail.value)}
                type="number"
                inputMode="decimal"
              />
            </FormField>
          );
        }}
      />
    </SpaceBetween>
  );
}
