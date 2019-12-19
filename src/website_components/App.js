import "./css/style.css";
import React from "react";
import { Component } from "react";
import MainPage from "./StructuredPages/MainPage";
import CreateProfile from "./StructuredPages/CreateProfile";
import UploadProject from "./StructuredPages/UploadProject";
import LoginProfile from "./StructuredPages/LoginProfile";
import LoadingScreen from "./StructuredPages/LoadingScreen";
import UserPage from "./StructuredPages/UserPage";
import { readAllPost } from "./ContactServer/ContactServer";
/* 
  REFERENCES: url(https://material.io/resources/icons/)

- App.js is the core of the whole application where it distributes resources in between different screens
- state holds many different important parameters
  load : Is a holader for the loading screen controlled within componentDidMount()
  dislplayScreen : is the object which determines what is currently being rendered on screen
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.cClick = this.cClick.bind(this);
    this.lClick = this.lClick.bind(this);
    this.bClick = this.bClick.bind(this);
    this.aClick = this.aClick.bind(this);
    this.finalLogIn = this.finalLogIn.bind(this); //Passed in to log in
    this.outClick = this.outClick.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      projects: null,
      load: false,
      userName: "Guest",
      loggedIn: false,
      prevPage: null,
      displayScreen: null
    };
  }
  refresh() {
    this.UNSAFE_componentWillMount();
  }
  finalLogIn(userName) {
    this.setState({ userName: userName });
    this.setState({ loggedIn: true });
    this.setState({ displayScreen: this.state.prevPage });
  }
  outClick() {
    this.callLoad();
    this.setState({ loggedIn: false });
    this.setState({ userName: "Guest" });
    this.refresh();
  }
  cClick() {
    this.callLoad();
    this.setState({
      displayScreen: <CreateProfile finalLogIn={this.finalLogIn} />
    });
  }
  aClick() {
    this.callLoad();
    this.setState({
      displayScreen: <UploadProject uName={this.state.userName} />
    });
  }
  lClick() {
    this.callLoad();
    this.setState({
      displayScreen: <LoginProfile finalLogIn={this.finalLogIn} />
    });
  }
  pClick(userName) {
    this.callLoad();
    const projects = this.state.projects.filter(function(o) {
      return o.userName === userName;
    });
    this.setState({
      displayScreen: <UserPage uName={userName} projects={projects} />,
      prevPage: this.state.displayScreen
    });
  }
  bClick() {
    this.callLoad();
    this.refresh();
  }
  callLoad() {
    this.setState({ load: false, prevPage: this.state.displayScreen });
    this.componentDidMount();
  }

  async UNSAFE_componentWillMount() {
    const getAll = await readAllPost();
    if (getAll !== false) {
      this.setState({
        displayScreen: (
          <MainPage
            cClick={this.cClick}
            lClick={this.lClick}
            pClick={this.pClick}
            aClick={this.aClick}
            projectBase={getAll}
            userName={this.state.userName}
            passThis={this}
            outClick={this.outClick}
          />
        ),
        projects: getAll
      });
    }
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
    if (this.state.displayScreen !== null) {
      return this.state.displayScreen;
    } else {
      return <LoadingScreen />;
    }
  }
  render() {
    const backButton =
      this.state.prevPage !== null ? (
        <div className="container fixed-bottom">
          <span className="hover" onClick={this.bClick}>
            <i className="material-icons fixed-bottom back-btn">cached</i>
          </span>
        </div>
      ) : (
        ""
      );
    return (
      <div className="App">
        {backButton}
        {this.switchPages()}
      </div>
    );
  }
}

export default App;
