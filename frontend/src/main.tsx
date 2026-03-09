// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
