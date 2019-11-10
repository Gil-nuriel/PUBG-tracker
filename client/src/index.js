import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navbar";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <NavBar />
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
