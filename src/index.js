import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import { GlobalStore, GlobalStorePersistor } from "./store/store";

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <GlobalStore.Container>
    <GlobalStorePersistor>
      <App />
    </GlobalStorePersistor>
  </GlobalStore.Container>,
  MOUNT_NODE
);

unregister();
