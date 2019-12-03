import React from "react";
import { Component } from "react";
import Nav from "../MainPageComponents/Nav";
import ElementDisplay from "../MainPageComponents/ElementDisplay";
import Users from "./Users";
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.nProjects = [...Array(Users.length).keys()]; //Get our keys for each react element..
  }
  render() {
    //Dummy element displays
    const passUser = Users;
    const projects = this.nProjects.map(p => (
      <ElementDisplay
        key={p.toString()}
        userName={passUser[p].name}
        projectDes={passUser[p].des}
        projectTitle={passUser[p].title}
        pClick={this.props.pClick}
      />
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
