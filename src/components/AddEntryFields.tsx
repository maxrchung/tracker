import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Container from "@cloudscape-design/components/container";
import { Controller, useWatch } from "react-hook-form";
import { CREATE_NEW_ENTRY } from "../constants";
import { EntryName } from "../API";

interface AddEntryFieldsProps {
  entryNames: EntryName[];
}

export default function AddEntryFields({ entryNames }: AddEntryFieldsProps) {
  const select = useWatch({ name: "select" });

  return (
    <Container>
      <SpaceBetween size="l">
        <Controller
          name="select"
          render={({ field, fieldState: { error } }) => {
            const { onChange, value } = field;
            return (
              <FormField label="Type" errorText={error?.message}>
                <Select
                  {...field}
                  onChange={(event) => onChange(event.detail.selectedOption)}
                  selectedOption={value}
                  options={[
                    {
                      label: CREATE_NEW_ENTRY,
                      value: CREATE_NEW_ENTRY,
                    },
                    ...(entryNames.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) ?? []),
                  ]}
                  selectedAriaLabel="Selected"
                />
              </FormField>
            );
          }}
        />

        {select?.label === CREATE_NEW_ENTRY && (
          <Controller
            name="name"
            render={({ field, fieldState: { error } }) => {
              const { onChange, value } = field;
              return (
                <FormField label="New type" errorText={error?.message}>
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
        )}

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
    </Container>
  );
}
