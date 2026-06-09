// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "@/presentation/views/providers/MessageProvider.tsx";
import { LoadingProvider } from "@/presentation/views/providers/LoadingProvider.tsx";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <BrowserRouter>
    <LoadingProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
