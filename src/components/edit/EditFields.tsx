import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Alert from "@cloudscape-design/components/alert";

import { Controller } from "react-hook-form";

export default function EditFields() {
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

        <Alert type="info">
          Changing the type affects all similar entries.
        </Alert>
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
