import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Container from "@cloudscape-design/components/container";
import { useState } from "react";
import AttributeEditor from "@cloudscape-design/components/attribute-editor";

export default function AddEntry() {
  const [inputValue, setInputValue] = useState("");

  const [selectedOption, setSelectedOption] = useState({
    label: "Option 1",
    value: "1",
    tags: ["OptionTag1", "Tag2", "Tag3"],
  });

  const [items, setItems] = useState([
    {
      key: "some-key-1",
      value: "some-value-1",
      type: { label: "Text", value: "text" },
    },
    {
      key: "some-key-2",
      value: "some-value-2",
      type: { label: "Number", value: "number" },
    },
  ]);

  return (
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
        header={<Header variant="h1">Add entry</Header>}
      >
        <Container>
          <SpaceBetween size="l">
            <FormField label="Entry">
              <Select
                selectedOption={selectedOption}
                // onChange={({ detail }) =>
                //   setSelectedOption(detail.selectedOption)
                // }
                options={[
                  {
                    label: "Create new entry type...",
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
            <FormField label="Entry name">
              <Input
                value={inputValue}
                onChange={(event) => setInputValue(event.detail.value)}
              />
            </FormField>
            <AttributeEditor
              onAddButtonClick={() =>
                setItems([
                  ...items,
                  {
                    key: "",
                    value: "",
                    type: { label: "Number", value: "number" },
                  },
                ])
              }
              onRemoveButtonClick={({ detail: { itemIndex } }) => {
                const tmpItems = [...items];
                tmpItems.splice(itemIndex, 1);
                setItems(tmpItems);
              }}
              items={items}
              addButtonText="Add new field"
              definition={[
                {
                  label: "Entry field",
                  control: (item) => <Input value={item.key} />,
                },
                {
                  label: "Type",
                  control: (item) => (
                    <Select
                      selectedOption={item.type}
                      options={[
                        { label: "Number", value: "number" },
                        { label: "Text", value: "text" },
                      ]}
                    />
                  ),
                },
                {
                  label: "Value",
                  control: (item) => <Input value={item.value} />,
                },
              ]}
              removeButtonText="Remove"
              empty="No items associated with the resource."
            />
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
