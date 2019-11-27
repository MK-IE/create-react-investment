import React from "react";
import { Component } from "react";
import MainPage from "./MainPage";
import "./css/style.css";
import CreateAccount from "./CreateAccount";
import LoginAccount from "./LoginAccount";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createA: false,
      loginA: false
    };
    this.cClick = this.cClick.bind(this);
    this.lClick = this.lClick.bind(this);
  }
  cClick() {
    this.setState({ createA: true });
  }
  lClick() {
    this.setState({ loginA: true });
  }
  switchPages() {
    switch (true) {
      case this.state.createA:
        return <CreateAccount />;
      case this.state.loginA:
        return <LoginAccount />;
      default:
        return <MainPage cClick={this.cClick} lClick={this.lClick} />;
    }
  }
  render() {
    return <div className="App">{this.switchPages()}</div>;
  }
}

export default App;
