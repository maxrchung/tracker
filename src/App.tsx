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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route path="/" element={<Home />} />
      <Route path="entries" element={<Entries />} />
      <Route path="analytics" element={<Analytics />} />
    </Route>
  )
);

export default function App() {
  const { user } = useAuthenticator();
  return !user ? <Login /> : <RouterProvider router={router} />;
}
