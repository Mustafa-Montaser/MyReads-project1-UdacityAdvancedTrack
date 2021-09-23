import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./component/App";

import "./style/normalize.css";
import "./style/style.css";

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));

