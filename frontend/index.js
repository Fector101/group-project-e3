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
