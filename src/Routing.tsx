import Entries from "./Entries";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from "./Login";
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
import CreateEntry from "./CreateEntry";

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
          element={<CreateEntry />}
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

export default function Routing() {
  const { user } = useAuthenticator();
  return !user ? <Login /> : <RouterProvider router={router} />;
}
