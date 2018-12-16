import React from "react";
import ReactDOM from "react-dom";
import "./style/App.css";
import App from "./App";

import { Provider } from "mobx-react";
import CarStore from "./stores/CarStore";
import CarFormStore from "./stores/CarFormStore";

const Root = (
  <Provider CarFormStore={CarFormStore} CarStore={CarStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));

