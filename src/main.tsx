import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { EventProvider } from "./context/EventProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </StrictMode>
);
