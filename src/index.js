import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { GlobalStore } from "./store/store";

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <GlobalStore.Container>
    <App />
  </GlobalStore.Container>,
  MOUNT_NODE
);

registerServiceWorker();
