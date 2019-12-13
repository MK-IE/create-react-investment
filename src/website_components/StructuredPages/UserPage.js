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
        pClick={"none"}
      />
    ));
    const userTitle = (this.props.uName + " Projects").toUpperCase();
    return (
      <div className="user-page">
        <div className = "container text-center user-projects">
          <h3>{userTitle}</h3>
        </div>
        {projects}     
      </div>
    );
  }
}

export default UserPage;  