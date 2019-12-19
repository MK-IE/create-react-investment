import React from "react";
import { Component } from "react";
import Input from "../ProfileFields/Input";
import { readUserData } from "../ContactServer/ContactServer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      userName: "",
      formValid: true,
      passwordMatch: false,
      userNameMatch: false,
      userData: {
        userName: "",
        email: "",
        gender: "",
        name: "",
        userType: ""
      },
      error: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleNameChange(event) {
    let value = event.target.value;
    this.setState({ userName: value });
  }

  handlePasswordChange(event) {
    let value = event.target.value;
    this.setState({ password: value }, () => {
      console.log(this.state.password);
    });
  }

  handleFormSubmission(event) {
    event.preventDefault();
    this.getUser();
  }

  async getUser() {
    try {
      let userProfile = await readUserData(
        this.state.userName,
        this.state.password
      );
      console.log(userProfile);
      if (userProfile === false) {
        this.setState({
          error: <p className="danger">Incorrect username or password</p>
        });
      } else {
        console.log(this.state.userName);
        this.setState(
          {
            userData: {
              ...this.state.userData,
              userName: this.state.userName,
              name: userProfile.name,
              email: userProfile.email,
              gender: userProfile.gender,
              userType: userProfile.userType
            }
          },
          () => console.log(this.state.userData)
        );
        //If this worked, we want to send them somewhere
        this.props.finalLogIn(this.state.userData.userName);
        this.setState({ userName: "", password: "" });
      }
    } catch (err) {
      console.log("Here is the error: " + err);
    }
  }

  render() {
    return (
      <div className="login-profile">
        <div className="container"></div>
        <div className="d-flex full-height align-items-center justify-content-center">
          <div className="form-struct">
            <h3 className="text-center">LOGIN ACCOUNT</h3>
            <form>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <Input
                      placeholder={"Enter Name"}
                      handleChange={this.handleNameChange}
                      title={"Username"}
                      value={this.state.userName}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <Input
                      placeholder={"Enter password"}
                      handleChange={this.handlePasswordChange}
                      title={"Password"}
                      type={"password"}
                      value={this.state.password}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <button
                      className="btn btn-primary form-control"
                      disabled={!this.state.formValid}
                      onClick={this.handleFormSubmission}
                    >
                      Log In!
                    </button>
                  </div>
                </div>
              </div>
              {this.state.error}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
