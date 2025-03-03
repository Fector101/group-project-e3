// import { createRoot } from "react-dom/client";
// import { App } from "./App";

// const container = document.getElementById("app");
// const root = createRoot(container)
// root.render(<App />);
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import {App} from "./App";

const root = document.getElementById("app");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
