import React from "react";
import ElementDisplay from "../MainPageComponents/ElementDisplay";
import { Component } from "react";

//UserPage loads all of a user's projects, as opposed to all of the projects on the database.

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects,
      uName: this.props.uName
    };
  }
  getProjects() {
    const userTitle = (" Projects By:  " + this.state.uName ).toUpperCase();
    const passUser = this.state.projects;
    const nProjects = [...Array(this.state.projects.length).keys()];
    const projects = nProjects.map(p => (
      <ElementDisplay
        key={p.toString()}
        projectTitle={passUser[p].title}
        userName={passUser[p].userName}
        projectDes={passUser[p].body}
        image={passUser[p].imageName}
        pClick={"none"}
      />
    ));
    return (
      <div>
        <div className="container text-center user-display">
          <h3>{userTitle}</h3>
        </div>
        {projects}
      </div>
    );
  }
  render() {
    const projects = this.getProjects();
    return <div className="user-page">{projects}</div>;
  }
}

export default UserPage;
