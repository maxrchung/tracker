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
import { useQuery } from "@tanstack/react-query";
import { ListEntryNamesQuery } from "./API";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { listEntryNames } from "./graphql/queries";
import Alert from "@cloudscape-design/components/alert";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Link from "@cloudscape-design/components/link";
import Spinner from "@cloudscape-design/components/spinner";

export default function AddEntry() {
  const [inputValue, setInputValue] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: async () => {
      const allTodos = await API.graphql<GraphQLQuery<ListEntryNamesQuery>>({
        query: listEntryNames,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(allTodos);
      return allTodos;
    },
  });

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

  const header = <Header variant="h1">Add entry</Header>;

  if (isError) {
    return (
      <ContentLayout header={header}>
        <Alert statusIconAriaLabel="Error" type="error" header="Error">
          We couldn't load the page. This could be a temporary loading issue.{" "}
          <Link href="/entries/create">Try refreshing the page.</Link>
        </Alert>
      </ContentLayout>
    );
  }

  if (isLoading || !data) {
    return (
      <ContentLayout header={header}>
        <Container>
          <Spinner size="big" />
        </Container>
      </ContentLayout>
    );
  }

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
        header={header}
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
