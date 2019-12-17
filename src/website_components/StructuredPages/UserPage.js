import React from "react";
import ElementDisplay from "../MainPageComponents/ElementDisplay";
import { Component } from "react";
import { readAllPost } from "../ContactServer/ContactServer";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      uName: this.props.uName
    };
  }
  async componentWillMount() {
    const getProjects = await readAllPost();
    const userName = this.state.uName;
    const userProjects = getProjects.filter(function(o) {
      return o.userName === userName;
    });
    this.setState({ projects: userProjects, stop: true });
  }
  render() {
    let projects = "";
    if (this.state.projects !== null) {
      const passUser = this.state.projects;
      const nProjects = [...Array(this.state.projects.length).keys()];
      projects = nProjects.map(p => (
        <ElementDisplay
          key={p.toString()}
          projectTitle={passUser[p].title}
          userName={passUser[p].userName}
          projectDes={passUser[p].body}
          image={passUser[p].imageName}
          pClick={"none"}
        />
      ));
    }
    const userTitle = (this.props.uName + " Projects").toUpperCase();
    return (
      <div className="user-page">
        <div className="container text-center user-projects">
          <h3>{userTitle}</h3>
        </div>
        {projects}
      </div>
    );
  }
}

export default UserPage;
