import React from "react";
import { Component } from "react";
import "./css/style.css";
import MainPage from "./StructuredPages/MainPage";
import CreateProfile from "./StructuredPages/CreateProfile";
import UploadProject from "./StructuredPages/UploadProject";
import LoginProfile from "./StructuredPages/LoginProfile";
import LoadingScreen from "./StructuredPages/LoadingScreen";
import UserPage from "./StructuredPages/UserPage";
import Users from "./StructuredPages/Users";
import { readAllPost } from "./ContactServer/ContactServer";

class App extends Component {
  constructor(props) {
    super(props);
    this.cClick = this.cClick.bind(this);
    this.lClick = this.lClick.bind(this);
    this.bClick = this.bClick.bind(this);
    this.aClick = this.aClick.bind(this);
    this.state = {
      stop: false,
      load: false,
      prevPage: <MainPage />,
      displayScreen: (
        <MainPage
          cClick={this.cClick}
          lClick={this.lClick}
          pClick={this.pClick}
          aClick={this.aClick}
          projectBase={[
            {
              title: "Hello",
              body: "Hello",
              imageName:
                "https://images.pexels.com/photos/3184163/pexels-photo-3184163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940://www.pexels.com/photo/woman-using-computer-3184163/",
              userName: "Hello"
            }
          ]}
          passThis={this}
        />
      )
    };
  }
  cClick() {
    this.callLoad();
    this.setState({ displayScreen: <CreateProfile /> });
  }
  aClick() {
    this.callLoad();
    this.setState({ displayScreen: <UploadProject /> });
  }
  lClick() {
    this.callLoad();
    this.setState({ displayScreen: <LoginProfile /> });
  }
  pClick(userName) {
    this.callLoad();
    console.log("THE USERNAME", userName);
    this.setState({
      displayScreen: <UserPage uName={userName} />
    });
  }
  bClick() {
    this.callLoad();
    if (this.state.displayScreen.type.name === "UploadProject") {
      this.setState({ stop: false });
    }
    this.setState({ displayScreen: this.state.prevPage });
  }
  callLoad() {
    this.setState({ prevPage: this.state.displayScreen });
    this.setState({ load: false });
    this.componentDidMount();
  }

  async readProjects() {
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
            passThis={this}
          />
        ),
        stop: true
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, 1000);
  }
  switchPages() {
    if (!this.state.stop) this.readProjects();
    if (!this.state.load) {
      return <LoadingScreen />;
    }
    return this.state.displayScreen;
  }
  render() {
    const backButton =
      this.state.displayScreen.type.name !== "MainPage" ? (
        <div className="container fixed-bottom">
          <a className="hover" onClick={this.bClick}>
            <i className="material-icons fixed-bottom back-btn">
              subdirectory_arrow_left
            </i>
          </a>
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
