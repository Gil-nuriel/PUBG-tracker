import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Search} />
      </div>
    );
  }
}

export default App;
