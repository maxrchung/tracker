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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      </Route>
      <Route
        path="analytics"
        element={<Analytics />}
        handle={{ crumb: "Analytics" }}
      />
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const { user } = useAuthenticator();
  return !user ? (
    <Authenticator variation="modal" />
  ) : (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
