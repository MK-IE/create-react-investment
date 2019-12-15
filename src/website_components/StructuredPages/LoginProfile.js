import React from "react";
import { Component } from "react";
import Select from "../ProfileFields/Select";
import Input from "../ProfileFields/Input";
import Match from "../ProfileFields/Match";
import { readUserData } from "../ContactServer/ContactServer";
import { passwordHash } from "../AuxilaryFunctions/Hash";

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
      }
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
        console.log("Incorrect username or password");
      } else {
        let localUserData = { ...this.state.userData };
        localUserData.userName = this.state.userName;
        localUserData.name = userProfile.name;
        localUserData.email = userProfile.email;
        localUserData.gender = userProfile.gender;
        localUserData.userType = userProfile.userType;
        this.setState({ userData: localUserData });
        //If this worked, we want to send them somewhere
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
                <Input
                  placeholder={"Enter Name"}
                  handleChange={this.handleNameChange}
                  title={"Username"}
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  placeholder={"Enter password"}
                  handleChange={this.handlePasswordChange}
                  title={"Password"}
                />
              </div>
              <button
                className="btn btn-primary"
                disabled={!this.state.formValid}
                onClick={this.handleFormSubmission}
              >
                Log In!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
