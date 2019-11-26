import React from "react";
import { Component } from "react";
import MainPage from "./MainPage";
import "./css/style.css";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <MainPage />
      </div>
    );
  }
}

export default App;
