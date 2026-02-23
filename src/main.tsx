import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-600.css";
import "@fontsource/roboto/latin-700.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const root = document.documentElement;
let fontReadyApplied = false;

const markFontsReady = () => {
  if (fontReadyApplied) return;
  fontReadyApplied = true;
  root.classList.remove("font-loading");
};

const ensureRobotoReady = async () => {
  if (!("fonts" in document) || !document.fonts.load) {
    return;
  }

  await Promise.all([
    document.fonts.load("400 1em Roboto"),
    document.fonts.load("500 1em Roboto"),
    document.fonts.load("600 1em Roboto"),
    document.fonts.load("700 1em Roboto"),
  ]);

  await document.fonts.ready;
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
};

Promise.race([
  ensureRobotoReady(),
  new Promise<void>((resolve) => window.setTimeout(resolve, 8000)),
])
  .catch(() => {})
  .finally(markFontsReady);
