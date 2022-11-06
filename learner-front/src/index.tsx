import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routers/mainRouter";

ReactDOM.render(
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>,
  document.getElementById("root")
);
