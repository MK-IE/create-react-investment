import React from "react";
import { Component } from "react";
import MainPage from "./MainPage";
import "./css/style.css";
import CreateProfile from "./CreateProfile";
import LoginProfile from "./LoginProfile";
import LoadingScreen from "./LoadingScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.cClick = this.cClick.bind(this);
    this.lClick = this.lClick.bind(this);
    this.state = {
      load: false,
      apiData: [],
      match: "false",
      userPassword: "",
      displayScreen: <MainPage cClick={this.cClick} lClick={this.lClick} />
    };
  }
  cClick() {
    this.setState({ displayScreen: <CreateProfile /> });
    this.setState({ load: false });
    this.componentDidMount();
  }
  lClick() {
    this.setState({ displayScreen: <LoginProfile /> });
    this.setState({ load: false });
    this.componentDidMount();
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, 1000);
  }
  switchPages() {
    if (!this.state.load) {
      return <LoadingScreen />;
    }
    return this.state.displayScreen;
  }
  render() {
    return <div className="App">{this.switchPages()}</div>;
  }
}

export default App;
