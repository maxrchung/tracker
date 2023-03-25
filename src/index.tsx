import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from "aws-amplify";
import "@cloudscape-design/global-styles/index.css";
import { Authenticator } from "@aws-amplify/ui-react";

// Not much luck with resolving this so suppressing
// https://stackoverflow.com/a/71793890
// eslint-disable-next-line import/no-unresolved
import "@aws-amplify/ui-react/styles.css";

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
