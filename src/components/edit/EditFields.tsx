import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { Controller } from "react-hook-form";

interface EditFieldsProps {
  entryName: string;
}

export default function EditFields({ entryName }: EditFieldsProps) {
  return (
    <SpaceBetween size="l">
      <FormField label="Type">
        <Select
          loadingText="Loading entry types..."
          statusType="finished"
          selectedOption={{
            label: entryName,
          }}
          selectedAriaLabel="Selected"
          disabled
        />
      </FormField>

      <Controller
        name="value"
        render={({ field, fieldState: { error } }) => {
          const { onChange, value } = field;
          return (
            <FormField
              label={
                <span>
                  Value <i>- optional</i>
                </span>
              }
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
