import React from "react";
import { Component } from "react";
import Nav from "../MainPageComponents/Nav";
import ElementDisplay from "../MainPageComponents/ElementDisplay";
//MainPage is what is rendered in the standard interface when the user scrolls through profiles

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.nProjects = [...Array(this.props.projectBase.length).keys()]; //Get our keys for each react element..
  }
  render() {
    const passUser = this.props.projectBase;
    const projects = this.nProjects.map(p => (
      <ElementDisplay
        key={p.toString()}
        userName={passUser[p].userName}
        projectDes={passUser[p].body}
        projectTitle={passUser[p].title}
        image={passUser[p].imageName}
        pClick={this.props.pClick.bind(
          this.props.passThis,
          passUser[p].userName
        )}
      />
    ));
    return (
      <div className="main-page">
        <Nav
          cClick={this.props.cClick}
          lClick={this.props.lClick}
          aClick={this.props.aClick}
          passThis={this.props.passThis}
          outClick={this.props.outClick}
        ></Nav>
        {projects}
      </div>
    );
  }
}

export default MainPage;
