import "./index.css";
import "@shopify/polaris/build/esm/styles.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import en from "@shopify/polaris/locales/en.json";
import ReducerProvider from "@avada/reducers/store";
import { AppProvider } from "@shopify/polaris";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReducerProvider>
      <AppProvider i18n={en}>
        <App />
      </AppProvider>
    </ReducerProvider>
  </React.StrictMode>
);
