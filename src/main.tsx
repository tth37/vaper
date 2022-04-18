import React from "react";
import ReactDOM from "react-dom";

import "@fontsource/montserrat";
import "highlight.js/styles/atom-one-dark.css";

import moment from "moment";
import "moment/dist/locale/zh-cn";

import "./index.css";

import App from "./App";

moment.locale("zh-cn");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
