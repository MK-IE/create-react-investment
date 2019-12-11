import React from "react";
import { Component } from "react";
import Nav from "../MainPageComponents/Nav";
import ElementDisplay from "../MainPageComponents/ElementDisplay";
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.nProjects = [...Array(this.props.projectBase.length).keys()]; //Get our keys for each react element..
  }
  render() {
    //Dummy element displays
    const passUser = this.props.projectBase;
    const projects = this.nProjects.map(p => (
      <ElementDisplay
        key={p.toString()}
        userName={passUser[p].name}
        projectDes={passUser[p].des}
        projectTitle={passUser[p].title}
        pClick={this.props.pClick.bind(this.props.passThis,passUser[p].name)}
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
