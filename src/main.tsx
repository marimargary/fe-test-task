import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MuiProvider from "./Components/UI/MuiProvider.tsx";
import { Provider } from "react-redux";
import store from "./Store/store.ts";

import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiProvider>
        <App />
      </MuiProvider>
    </Provider>
  </React.StrictMode>,
);
