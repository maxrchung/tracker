import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@cloudscape-design/global-styles/index.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// Allows this JS file to be imported without type definitions.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>
);
