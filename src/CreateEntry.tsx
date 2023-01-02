import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useState } from "react";

export default function CreateEntry() {
  const [inputValue, setInputValue] = useState("");

  const [selectedOption, setSelectedOption] = useState({
    label: "Option 1",
    value: "1",
    tags: ["OptionTag1", "Tag2", "Tag3"],
  });

  return (
    <ContentLayout header={<Header variant="h1">Create Entry</Header>}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" variant="link" href="/entries">
                Cancel
              </Button>
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
          header={<Header variant="h1">Form header</Header>}
        >
          <SpaceBetween size="l">
            <FormField label="Activity">
              <Select
                selectedOption={selectedOption}
                // onChange={({ detail }) =>
                //   setSelectedOption(detail.selectedOption)
                // }
                options={[
                  {
                    label: "Create activity",
                    value: "0",
                  },
                  {
                    label: "Option 1",
                    value: "1",
                    tags: ["OptionTag1", "Tag2", "Tag3"],
                  },
                  {
                    label: "Option 2",
                    value: "2",
                    tags: ["OptionTag1", "Tag2", "Tag3"],
                  },
                ]}
                selectedAriaLabel="Selected"
              />
            </FormField>
            <FormField label="Activity name">
              <Input
                value={inputValue}
                onChange={(event) => setInputValue(event.detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </form>
    </ContentLayout>
  );
}
