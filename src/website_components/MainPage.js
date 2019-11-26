import React from "react";
import { Component } from "react";
import Nav from "./Nav";
import ElementDisplay from "./ElementDisplay";
class MainPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //Dummy element displays
    return (
      <div>
        <Nav />
        {Array(10).fill(<ElementDisplay />)}
      </div>
    );
  }
}

export default MainPage;
