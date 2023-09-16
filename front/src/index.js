import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "./context";
import "../src/css/style.css";
import { SnackbarProvider } from "notistack";
import SocketsAlertas from './hooks/SocketsAlertas.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
    <BrowserRouter>
      <MaterialTailwindControllerProvider>
        <SocketsAlertas />
        <App />
      </MaterialTailwindControllerProvider>
    </BrowserRouter>
  </SnackbarProvider>
);
serviceWorkerRegistration.register();
