import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Container from "@cloudscape-design/components/container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListEntryNamesQuery } from "./API";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { listEntryNames } from "./graphql/queries";
import Alert from "@cloudscape-design/components/alert";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Link from "@cloudscape-design/components/link";
import Spinner from "@cloudscape-design/components/spinner";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SelectOption {
  label: string;
  value: string;
}

export default function AddEntry() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: async () => {
      const query = await API.graphql<GraphQLQuery<ListEntryNamesQuery>>({
        query: listEntryNames,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      return (
        // flatMap to handle null: https://stackoverflow.com/a/59726888
        query.data?.listEntryNames?.items
          ?.flatMap((item) => (item ? [item] : []))
          .map((item) => item.name) ?? []
      );
    },
  });

  const schema = yup.object({
    select: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    name: yup
      .string()
      .max(100, "Entry has a maximum of 100 characters")
      .when("select", {
        is: (select: SelectOption | null) =>
          select && select.label === "Create new entry...",
        then: (schema) =>
          schema.required().test(
            "is-unique",
            (label) =>
              `${label} is already an entry. Select it from the Entry drop down.`,
            (value) => data?.includes(value)
          ),
      }),
    value: yup.number(),
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

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const header = <Header variant="h1">Add entry</Header>;

  if (isError) {
    return (
      <ContentLayout header={header}>
        <Alert statusIconAriaLabel="Error" type="error" header="Error">
          We couldn't load the page. Our service may be temporarily unavailable.{" "}
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
              <Controller
                name="entry"
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Select
                    {...field}
                    selectedOption={field.value}
                    options={[
                      {
                        label: "Create new entry...",
                        value: "",
                      },
                      ...data.map((entryName) => ({
                        label: entryName,
                        value: entryName,
                      })),
                    ]}
                    selectedAriaLabel="Selected"
                  />
                )}
              />
            </FormField>
            <FormField label="Entry name">
              <Input
                type="text"
                inputMode="text"
                value={name}
                onChange={(event) => setName(event.detail.value)}
              />
            </FormField>
            <FormField
              label={
                <span>
                  Value <i>- optional</i>
                </span>
              }
            >
              <Input
                type="number"
                inputMode="decimal"
                value={value}
                onChange={(event) => setValue(event.detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
