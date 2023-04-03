import Entries from "./Entries";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Analytics from "./Analytics";
import Error from "./Error";
import AddEntry from "./AddEntry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      handle={{ crumb: "tracker" }}
      errorElement={<Error />}
    >
      <Route path="/" element={<Home />} handle={{ crumb: "tracker" }} />
      <Route path="entries" handle={{ crumb: "Entries" }}>
        <Route index element={<Entries />} />
        <Route
          path="create"
          element={<AddEntry />}
          handle={{ crumb: "Create entry" }}
        />
      </Route>
      <Route
        path="analytics"
        element={<Analytics />}
        handle={{ crumb: "Analytics" }}
      />
    </Route>
  )
);

const queryClient = new QueryClient();

export default function App() {
  const { user } = useAuthenticator();
  return !user ? (
    <Authenticator variation="modal" />
  ) : (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
