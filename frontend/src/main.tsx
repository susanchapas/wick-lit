import "@fontsource-variable/mona-sans/wght.css";
import "@fontsource/faculty-glyphic/latin-400.css";
import "@fontsource/dm-mono/latin-400.css";
import "@fontsource/dm-mono/latin-500.css";
import "./styles/tokens.css";
import "./styles/components.css";
import "./styles/app.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ripple } from "./lib/effects";
import { applySettings } from "./lib/settings";

applySettings();
document.addEventListener("pointerdown", ripple);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
