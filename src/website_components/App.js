import React from "react";
import { Component } from "react";
import "./css/style.css";
import MainPage from "./StructuredPages/MainPage";
import CreateProfile from "./StructuredPages/CreateProfile";
import LoginProfile from "./StructuredPages/LoginProfile";
import LoadingScreen from "./StructuredPages/LoadingScreen";
import ElementDisplay from "./MainPageComponents/ElementDisplay";
import Users from "./StructuredPages/Users";
import { writePostData } from "./ContactServer/ContactServer";

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.cClick = this.cClick.bind(this);
    this.lClick = this.lClick.bind(this);
    this.pClick = this.pClick.bind(this);
    this.bClick = this.bClick.bind(this);
    this.state = {
      load: false,
      pVal: 0,
      prevPage: <MainPage />,
      displayScreen: (
        <MainPage
          cClick={this.cClick}
          lClick={this.lClick}
          pClick={this.pClick}
        />
      )
    };
  }
  cClick()
  {
    this.callLoad();
    this.setState({ displayScreen: <CreateProfile /> });
  }
  lClick()
  {
    this.callLoad();
    this.setState({ displayScreen: <LoginProfile /> });
  }
  pClick(i)
  {
    this.callLoad();
    this.setState({ pVal: i });
    this.plClick();
  }
  plClick()
  {
    this.callLoad();
    const passUser = Users;
    this.setState({
      displayScreen: (
        <ElementDisplay
          key={this.state.pVal.toString()}
          userName={passUser[this.state.pVal].name}
          projectDes={passUser[this.state.pVal].des}
          projectTitle={passUser[this.state.pVal].title}
        />
      )
    });
  }
  bClick()
  {
    this.callLoad();
    this.setState({ displayScreen: this.state.prevPage });
  }
  callLoad()
  {
    this.setState({ prevPage: this.state.displayScreen });
    this.setState({ load: false });
    this.componentDidMount();
  }
  componentDidMount()
  {
    setTimeout(() =>
    {
      this.setState({ load: true });
    }, 1000);
  }
  switchPages()
  {
    if (!this.state.load)
    {
      return <LoadingScreen />;
    }
    return this.state.displayScreen;
  }
  render()
  {
    console.log(this.state.prevPage);
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
