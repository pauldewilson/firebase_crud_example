// system imports
import React from "react";
import "normalize.css";
import { render } from "react-dom";
// project imports
import { App } from "./App";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
