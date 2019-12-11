import React from "react";
import ElementDisplay from "../MainPageComponents/ElementDisplay";
import { Component } from "react";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.nProjects = [...Array(this.props.projectBase.length).keys()];
  }
  render() {
    const passUser = this.props.projectBase;
    const projects = this.nProjects.map(p => (
      <ElementDisplay
        key={p.toString()}
        userName={passUser[p].name}
        projectDes={passUser[p].des}
        projectTitle={passUser[p].title}
        pClick={null}
      />
    ));
    return (
      <div className="user-page">
        <h1>{this.props.uName} Projects</h1>
        {projects}     
      </div>
    );
  }
}

export default UserPage;
