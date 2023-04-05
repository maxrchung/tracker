import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Container from "@cloudscape-design/components/container";
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
    select: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .test(
        "required",
        "Entry is required",
        (select) => select && !!select.label && !!select.value
      ),
    name: yup
      .string()
      .max(100, "Entry name has a maximum of 100 characters")
      .when("select", {
        is: (select: SelectOption | null) =>
          select && select.label === "Create new entry...",
        then: (schema) =>
          schema.required("Entry name is required").test(
            "unique",
            (name) =>
              `${name} is already an entry. Select it from the Entry drop down.`,
            (value) => !data?.includes(value)
          ),
      }),
    value: yup.number(),
  });

  type Entry = yup.InferType<typeof schema>;

  const { handleSubmit, control, watch } = useForm<Entry>({
    resolver: yupResolver(schema),
  });
  const select = watch("select");

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
    <form
      onSubmit={handleSubmit((data) => {
        console.log("data", data);
      })}
    >
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
            <Controller
              name="select"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value } = field;
                return (
                  <FormField label="Entry" errorText={error?.message}>
                    <Select
                      {...field}
                      onChange={(event) =>
                        onChange(event.detail.selectedOption)
                      }
                      selectedOption={value}
                      options={[
                        {
                          label: "Create new entry...",
                          value: "Create new entry...",
                        },
                        ...data.map((entryName) => ({
                          label: entryName,
                          value: entryName,
                        })),
                      ]}
                      selectedAriaLabel="Selected"
                    />
                  </FormField>
                );
              }}
            />

            {select && (
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const { onChange, value } = field;
                  return (
                    <FormField
                      label="New entry name"
                      errorText={error?.message}
                    >
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
              control={control}
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
      </Form>
    </form>
  );
}
