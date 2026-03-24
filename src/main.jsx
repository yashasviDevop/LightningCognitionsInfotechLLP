import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const loader = document.getElementById("page-loader");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// 🔥 Remove loader AFTER React mounts
window.addEventListener("load", () => {
  loader?.remove();
});
