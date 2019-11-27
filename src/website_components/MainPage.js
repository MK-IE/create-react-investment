import React from "react";
import { Component } from "react";
import Nav from "./Nav";
import ElementDisplay from "./ElementDisplay";
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.nProjects = [...Array(10).keys()]; //Get our keys for each react element..
  }
  render() {
    //Dummy element displays
    const projects = this.nProjects.map(p => (
      <ElementDisplay key={p.toString()} />
    ));
    return (
      <div>
        <Nav cClick={this.props.cClick} lClick={this.props.lClick}></Nav>
        {projects}
      </div>
    );
  }
}

export default MainPage;
