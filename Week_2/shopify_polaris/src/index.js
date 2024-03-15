import "./index.css";
import "@shopify/polaris/build/esm/styles.css";
import App from "./App";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
//dynamic import 

import reportWebVitals from "./reportWebVitals";
import { store } from "@avada/shared/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider i18n={en}>
      <Provider store={store}>
        <App />
      </Provider>
    </AppProvider>
  </React.StrictMode>
);
reportWebVitals();
