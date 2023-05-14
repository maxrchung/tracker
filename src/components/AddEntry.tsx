import Button from "@cloudscape-design/components/button";
import Form from "@cloudscape-design/components/form";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Container from "@cloudscape-design/components/container";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { GraphQLResult } from "@aws-amplify/api";
import Alert from "@cloudscape-design/components/alert";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Link from "@cloudscape-design/components/link";
import Spinner from "@cloudscape-design/components/spinner";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../stores/notification";
import { getErrorMessage } from "../error";
import { Schema, buildSchema } from "../schema";
import requests from "../requests";
import { CREATE_NEW_ENTRY } from "../constants";
import AddEntryFields from "./AddEntryFields";

export default function AddEntry() {
  const navigate = useNavigate();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const listEntryNames = useQuery({
    queryKey: ["listEntryNames"],
    queryFn: requests.listEntryNames,
  });
  const entryNames = listEntryNames.data ?? [];
  const schema = buildSchema(entryNames);

  const createEntry = useMutation({
    mutationFn: requests.createEntry,
    onSuccess: (_data, { select, name, value }) => {
      const entryName = select.label === CREATE_NEW_ENTRY ? name : select.label;
      navigate("/entries");
      addNotification({
        type: "success",
        content: (
          <>
            You added{" "}
            <strong>
              {entryName} {value != null && <>({value})</>}
            </strong>
            .
          </>
        ),
      });
    },
    onError: (error: Error | GraphQLResult, { select, name }) => {
      const entryName = select.label === CREATE_NEW_ENTRY ? name : select.label;
      addNotification({
        type: "error",
        content: (
          <>
            Failed to add <strong>{entryName}</strong>. {getErrorMessage(error)}
          </>
        ),
      });
    },
  });

  const form = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const header = <Header variant="h1">Add entry</Header>;

  if (listEntryNames.isError) {
    return (
      <ContentLayout header={header}>
        <Alert statusIconAriaLabel="Error" type="error" header="Error">
          We couldn&apos;t load the page. Our service may be temporarily
          unavailable.{" "}
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((data) => createEntry.mutate(data))}>
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
          <AddEntryFields entryNames={entryNames} />
        </Form>
      </form>
    </FormProvider>
  );
}
