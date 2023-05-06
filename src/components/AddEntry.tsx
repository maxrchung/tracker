import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Container from "@cloudscape-design/components/container";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateEntryInput,
  CreateEntryMutation,
  CreateEntryNameInput,
  CreateEntryNameMutation,
  ListEntryNamesQuery,
} from "./API";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import type { GraphQLResult } from "@aws-amplify/api";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import Alert from "@cloudscape-design/components/alert";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Link from "@cloudscape-design/components/link";
import Spinner from "@cloudscape-design/components/spinner";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../stores/notification-store";
import { getErrorMessage } from "../error-utils";

interface SelectOption {
  label: string;
  value: string;
}

const createNewEntry = "Create new entry...";

export default function AddEntry() {
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const listEntryNames = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: async () => {
      const query = await API.graphql<GraphQLQuery<ListEntryNamesQuery>>({
        query: queries.listEntryNames,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      return (
        // flatMap to handle null: https://stackoverflow.com/a/59726888
        query.data?.listEntryNames?.items?.flatMap((item) =>
          item ? [item] : []
        ) ?? []
      );
    },
  });

  const createEntry = useMutation({
    mutationFn: async (entry: Entry) => {
      let entryNameId = entry.select.value;

      // Create entry name if new
      if (entryNameId === createNewEntry) {
        const name =
          (entry.select.label === createNewEntry
            ? entry.name
            : entry.select.label) ?? "";
        const createEntryNameInput: CreateEntryNameInput = {
          name,
        };

        const createEntryName = await API.graphql<
          GraphQLQuery<CreateEntryNameMutation>
        >({
          query: mutations.createEntryName,
          variables: {
            input: createEntryNameInput,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        entryNameId = createEntryName.data?.createEntryName?.id;
      }

      if (!entryNameId) {
        throw new Error("Entry failed to be created. Try submitting again.");
      }

      const createEntryInput: CreateEntryInput = {
        nameId: entryNameId,
        ...(entry.value && { value: entry.value }),
      };
      return await API.graphql<GraphQLQuery<CreateEntryMutation>>({
        query: mutations.createEntry,
        variables: {
          input: createEntryInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    },
    onSuccess: (_data, { select, name }) => {
      const entryName = select.label === createNewEntry ? name : select.label;
      navigate("/entries");
      addNotification({
        type: "success",
        content: `Successfully added ${entryName}.`,
      });
    },
    onError: (error: Error | GraphQLResult) => {
      addNotification({
        type: "error",
        content: `Failed to add entry. ${getErrorMessage(error)}`,
      });
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
          select && select.value === createNewEntry,
        then: (schema) =>
          schema
            .required("Entry name is required")
            .test(
              "max",
              () =>
                "Entry can't be added. Only 10 different entry types are allowed.",
              () => listEntryNames.data && listEntryNames.data?.length <= 10
            )
            .test(
              "unique",
              ({ value }) => {
                return `${value} is already an entry. Select it from the Entry drop down.`;
              },
              (value) =>
                !listEntryNames.data?.some((item) => item.name === value)
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

  if (listEntryNames.isError) {
    return (
      <ContentLayout header={header}>
        <Alert statusIconAriaLabel="Error" type="error" header="Error">
          We couldn't load the page. Our service may be temporarily unavailable.{" "}
          <Link href="/entries/create">Try refreshing the page.</Link>
        </Alert>
      </ContentLayout>
    );
  }

  if (listEntryNames.isLoading || !listEntryNames.data) {
    return (
      <ContentLayout header={header}>
        <Container>
          <Spinner size="big" />
        </Container>
      </ContentLayout>
    );
  }

  return (
    <form onSubmit={handleSubmit((data) => createEntry.mutate(data))}>
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
                          label: createNewEntry,
                          value: createNewEntry,
                        },
                        ...(listEntryNames.data?.map((item) => ({
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

            {select?.label === createNewEntry && (
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
