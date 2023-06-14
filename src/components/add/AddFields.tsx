import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { Controller, useWatch } from "react-hook-form";
import { EntryName } from "../../API";
import { CREATE_NEW_ENTRY } from "../../constants";
import { useApplicationStore } from "../../stores/application";

interface AddFieldsProps {
  entryNames?: EntryName[];
}

export default function AddFields({ entryNames }: AddFieldsProps) {
  const select = useWatch({ name: "select" });
  const setAddEntrySelect = useApplicationStore((state) => state.setAddSelect);
  return (
    <SpaceBetween size="l">
      <Controller
        name="select"
        render={({ field, fieldState: { error } }) => {
          const { onChange, value } = field;
          return (
            <FormField label="Type" errorText={error?.message}>
              <Select
                {...field}
                loadingText="Loading types..."
                statusType={entryNames ? "finished" : "loading"}
                onChange={(event) => {
                  setAddEntrySelect(event.detail.selectedOption);
                  onChange(event.detail.selectedOption);
                }}
                selectedOption={value}
                options={
                  !entryNames
                    ? []
                    : [
                        { value: CREATE_NEW_ENTRY },
                        ...(entryNames?.map((item) => ({
                          label: item.name,
                          value: item.id,
                        })) ?? []),
                      ]
                }
                selectedAriaLabel="Selected"
              />
            </FormField>
          );
        }}
      />

      {select?.value === CREATE_NEW_ENTRY && (
        <Controller
          name="name"
          render={({ field, fieldState: { error } }) => {
            const { onChange, value } = field;
            return (
              <FormField label="New type" errorText={error?.message}>
                <Input
                  {...field}
                  name="New type"
                  value={value ?? ""}
                  onChange={(event) => onChange(event.detail.value)}
                  type="text"
                  inputMode="text"
                />
              </FormField>
            );
          }}
        />
      )}

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
