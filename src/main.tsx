import { App } from "@/app.tsx";
import "@/app/index.css";
import { appStarted } from "@/shared";
import React from "react";
import ReactDOM from "react-dom/client";

appStarted();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
