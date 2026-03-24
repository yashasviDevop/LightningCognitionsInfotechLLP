import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ✅ CHANGE HERE
import App from "./App";
import "./index.css";

const loader = document.getElementById("page-loader");

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>   {/* ✅ CHANGE HERE */}
    <App />
  </HashRouter>
);

// 🔥 Remove loader AFTER React mounts
window.addEventListener("load", () => {
  loader?.remove();
});
