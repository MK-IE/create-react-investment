import './css/style.css';
import React from 'react';
import { Component } from 'react';
import MainPage from './StructuredPages/MainPage';
import CreateProfile from './StructuredPages/CreateProfile';
import UploadProject from './StructuredPages/UploadProject';
import LoginProfile from './StructuredPages/LoginProfile';
import LoadingScreen from './StructuredPages/LoadingScreen';
import UserPage from './StructuredPages/UserPage';
import {
    readAllPost,
    writePostData,
    writeUserData,
} from './ContactServer/ContactServer';
/* 
  -- REFERENCES -- 
  Google Material Icons : url(https://material.io/resources/icons/)
  Bootsrap : url(https://getbootstrap.com/)



- App.js is the core of the whole application where it distributes resources in between different screens, all listeners which affect cause switch of pages are set here and passed to appropiate components
-- state --

  projects : Stores all the projects pulled from the server
  load : Used to let App.js know if to render the load screen or not
  userName : 'Self-Explanatory' Called / Used within Nav.js component
  loggedin : Keeps track if user has logged in to either display the 'guest' Nav.js component or with the name of the user.
  prevPage : Stores at which display screen we were previously at before the new one is placed into displayScreen.
  dislplayScreen : Is the object which determines what screen to be rendered on screen currently.

-- functions --

  finalLogIn === LogInClick : Logs in a user
  outClick === LogOutClick : Logs out the user 
  cClick === CreateProfileClick : Brings to the CreateProfile.js where a user can make an account
  aClick === UploadClick : Brings to the UploadProject.js where a user can upload a project 
  lClick === LoginProfileClick : Brings to LoginProfile.js which allows logging in
  pClick === ProfileClick : Showcases projects of one user, before a user is send to UserPage.js we filter out all projects to it with only the once that contain the UserName of a particular user.
  bClick === BackClick : Was originally a back button which utilized the prevPage attribute but now it just refreshes MainPage.js to see if any new projects added, still saves prevPage.
  callLoad : Is a holder for the loading screen controlled within componentDidMount() , also updates prevPage and load attribute from state to allow the LoadScreen to render.
  UNSAFE_componentWillMount : Is called before render and allows us to pull of data within to be distributed to MainPage.js.
  componentDidMount : Is called when a component is mounted allows to setTimeout without affecting the main thread and allow to render the LoadingScreen.
  switchPages : Decides which screen is currently to be rendered

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
            userName: 'Guest',
            loggedIn: false,
            prevPage: null,
            displayScreen: null,
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
        this.setState({ userName: 'Guest' });
        this.refresh();
    }
    cClick() {
        this.callLoad();
        this.setState({
            displayScreen: <CreateProfile finalLogIn={this.finalLogIn} />,
        });
    }
    aClick() {
        this.callLoad();
        this.setState({
            displayScreen: <UploadProject uName={this.state.userName} />,
        });
    }
    lClick() {
        this.callLoad();
        this.setState({
            displayScreen: <LoginProfile finalLogIn={this.finalLogIn} />,
        });
    }
    pClick(userName) {
        this.callLoad();
        const projects = this.state.projects.filter(function (o) {
            return o.userName === userName;
        });
        this.setState({
            displayScreen: <UserPage uName={userName} projects={projects} />,
            prevPage: this.state.displayScreen,
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
                projects: getAll,
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
            return this.state.displayScreen; //This allows us to wait while the data is being pulled from the server
        } else {
            return <LoadingScreen />;
        }
    }
    render() {
        const backButton =
            this.state.prevPage !== null ? (
                <div className='container fixed-bottom'>
                    <span className='hover' onClick={this.bClick}>
                        <i className='material-icons fixed-bottom back-btn'>
                            cached
                        </i>
                    </span>
                </div>
            ) : (
                ''
            );
        return (
            <div className='App'>
                {backButton}
                {this.switchPages()}
            </div>
        );
    }
}

export default App;
