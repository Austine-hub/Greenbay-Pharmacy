// ===============================================================
// MAIN ENTRY — Modern React 18+ with TypeScript (2025 Best Practices)
// ===============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css"; // ✅ Global reset + base styles

// === Root Element Check (Type-Safe) ===
const container = document.getElementById("root");

if (!container) {
  throw new Error("❌ Root container not found. Ensure #root exists in index.html");
}

// === Create React Root ===
const root = createRoot(container);

// === Render Application ===
root.render(
  <StrictMode>
    {/* 
      BrowserRouter handles routing.
      basename can be configured if deploying under a subpath.
      Example: <BrowserRouter basename="/pharmacy" />
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// ===============================================================
// Notes:
// ✅ Uses React.StrictMode for runtime warnings & accessibility checks
// ✅ Ensures root element exists before rendering (prevents silent crashes)
// ✅ Preps for PWA or hydration compatibility
// ✅ Ready for accessibility auditing (React Aria / Lighthouse)
// ===============================================================
