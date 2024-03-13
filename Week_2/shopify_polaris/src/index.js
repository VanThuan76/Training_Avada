import "./index.css";
import "./polaris.css";
import App from "./App";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "@avada/shared/store";
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider i18n={translations}>
      <Provider store={store}>
        <App />
      </Provider>
    </AppProvider>
  </React.StrictMode>
);
reportWebVitals();
