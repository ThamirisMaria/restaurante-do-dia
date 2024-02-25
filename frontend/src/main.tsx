import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import "./lib/i18n.ts";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
