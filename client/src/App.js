import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import home from "./components/home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={home} />
      </div>
    );
  }
}

export default App;
