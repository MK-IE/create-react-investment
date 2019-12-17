import React, { Component } from "react";
import Select from "../ProfileFields/Select";
import Input from "../ProfileFields/Input";
import Match from "../ProfileFields/Match";
import users from "./Users";
import {
  writeUserData,
  checkUserName,
  checkUserEmail
} from "../ContactServer/ContactServer";
import { passwordHash } from "../AuxilaryFunctions/Hash";
const userArray = users;

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProfile: {
        userName: "",
        name: "",
        email: "",
        gender: "",
        userType: "",
        password: ""
      },

      match: true,
      formValid: false,
      nameValid: false,
      emailValid: false,
      genderSelectionValid: false,
      userTypeValid: false,
      passwordValid: false,
      userNameValid: false,

      formErrors: {
        name: "",
        userName: "",
        email: "",
        password: "",
        gender: "",
        userType: ""
      },

      passwordConfirm: "",

      profileOptions: ["Investor", "Student"],
      genderOptions: ["Male", "Female", "Other"],

      first: true
    };
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(
      this
    );
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleNameChange(event) {
    let value = event.target.value;
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, name: value } }),
      () => console.log(this.state.newProfile)
    );
    this.validateName(value);
  }

  handleUserNameChange(event) {
    let value = event.target.value;
    this.setState(
      prevState => ({
        newProfile: { ...prevState.newProfile, userName: value }
      }),
      () => console.log(this.state.newProfile)
    );
    this.validateUserName(value);
  }

  handleEmailChange(event) {
    let value = event.target.value;
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, email: value } }),
      () => console.log(this.state.newProfile)
    );
    this.validateEmail(value);
  }

  handleGenderChange(event) {
    console.log(event.target.value);
    let value = event.target.value;
    let tempProfile = this.state.newProfile;
    tempProfile.gender = value;
    this.setState({ newProfile: tempProfile });
    console.log(this.state.newProfile.gender);
    this.validateGenderSelection(value);
  }

  handlePasswordChange(event) {
    let value = event.target.value;

    this.setState(
      prevState => ({
        newProfile: { ...prevState.newProfile, password: value }
      }),
      () => {
        if (this.state.newProfile.password !== this.state.passwordConfirm) {
          this.setState({ match: false }, this.validateForm);
        } else if (
          this.state.newProfile.password === this.state.passwordConfirm
        ) {
          this.setState({ match: true }, this.validateForm);
        }
        console.log(this.state.match);
        console.log(this.state.password);
        console.log(this.state.newProfile);
      }
    );
    this.validatePassword(value);
  }

  handleSecondPasswordChange(event) {
    let value = event.target.value;
    this.setState({ passwordConfirm: value }, () => {
      if (this.state.newProfile.password !== this.state.passwordConfirm) {
        this.setState({ match: false }, this.validateForm);
      } else if (
        this.state.newProfile.password === this.state.passwordConfirm
      ) {
        this.setState({ match: true }, this.validateForm);
      }
      console.log(this.state.match);
      console.log(this.state.passwordConfirm);
    });
  }

  handleUserTypeChange(event) {
    let type = event.target.value;
    this.setState(
      prevState => ({
        newProfile: { ...prevState.newProfile, userType: type }
      }),
      () => console.log(this.state.newProfile)
    );
    this.validateUserTypeSelection();
  }

  addUser(hash, salt) {
    writeUserData(
      this.state.newProfile.userName,
      this.state.newProfile.name,
      this.state.newProfile.email,
      this.state.newProfile.gender,
      hash,
      this.state.newProfile.userType,
      salt
    );
    this.setState(
      prevState => ({
        newProfile: {
          ...prevState.newProfile,
          name: "",
          email: "",
          password: "",
          userType: "",
          gender: ""
        }
      }),
      () => console.log(this.state.newProfile)
    );
    this.setState({ passwordConfirm: "" });
    console.log("Submitted!");
  }
  async handleFormSubmission(event) {
    event.preventDefault();
    let hashedPassword = passwordHash(this.state.newProfile.password);
    let hash = hashedPassword[0];
    let salt = hashedPassword[1];
    let userNameScan = await checkUserName(this.state.newProfile.userName);
    let emailScan = await checkUserEmail(this.state.newProfile.email);
    //Checking if the user is not in the database
    if (!userNameScan && !emailScan) {
      this.addUser(hash, salt);
    } else {
      console.log("Username or Email are already in use !");
    }
  }

  validateForm() {
    if (
      this.state.userNameValid === true &&
      this.state.nameValid === true &&
      this.state.emailValid === true &&
      this.state.passwordValid === true &&
      this.state.userTypeValid === true &&
      this.state.genderSelectionValid === true &&
      this.state.match === true
    ) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }

    if (this.state.formValid === false) {
      console.log(this.state.formErrors);
    }
  }

  validateName(name) {
    let localFormErrors = { ...this.state.formErrors };

    if (name.length < 5) {
      localFormErrors.name = "The name is too short.";
      this.setState({ nameValid: false });
    } else {
      localFormErrors.name = "";
      this.setState({ nameValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateUserName(userName) {
    let localFormErrors = { ...this.state.formErrors };

    if (userName.length < 5) {
      localFormErrors.name = "The name is too short.";
      this.setState({ userNameValid: false });
    } else {
      localFormErrors.name = "";
      this.setState({ userNameValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateEmail(email) {
    //API validation occurs here
    let localFormErrors = { ...this.state.formErrors };

    if (email.length < 4) {
      localFormErrors.email = "The email is too short.";
      this.setState({ emailValid: false });
    } else {
      localFormErrors.email = "";
      this.setState({ emailValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateGenderSelection(gender) {
    let localFormErrors = { ...this.state.formErrors };

    if (gender == "Male" || "Female" || "Other") {
      localFormErrors.gender = "";
      this.setState({ genderSelectionValid: true });
    } else if (gender == "Select Gender") {
      localFormErrors.gender = "No gender selected.";
      this.setState({ genderSelectionValid: false });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateUserTypeSelection() {
    let localFormErrors = { ...this.state.formErrors };
    let localSelection = this.state.newProfile.userType;

    if (localSelection === "Student" || "Investor") {
      localFormErrors.userType = "";
      this.setState({ userTypeValid: true });
    } else {
      localFormErrors.userType = "No user type selected.";
      this.setState({ userTypeValid: false });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validatePassword(password) {
    let localFormErrors = { ...this.state.formErrors };
    if (
      password.length < 7 ||
      password.length > 64 ||
      password.search(/[a-zA-Z]/) === -1 ||
      password.search(/\d/) === -1 ||
      password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1
    ) {
      localFormErrors.password =
        "Must be longer than seven characters, less than sixty four and contain letters and numbers.";
      this.setState({ passwordValid: false });
    } else {
      localFormErrors.password = "";
      this.setState({ passwordValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  render() {
    return (
      <div className="create-profile">
        <div className="d-flex full-height align-items-center justify-content-center">
          <div className="form-struct card">
            <div className="container">
              <h3 className="text-center">CREATE ACCOUNT</h3>
            </div>
            <form>
              <div className="form-row">
                <div className="col">
                  <Input
                    placeholder={"Enter Profile Name"}
                    handleChange={this.handleUserNameChange}
                    title={"Username"}
                    required
                  />
                </div>
                <div className="col">
                  <Input
                    placeholder={"Enter Name"}
                    handleChange={this.handleNameChange}
                    title={"Name"}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <Input
                    placeholder={"Enter E-mail"}
                    handleChange={this.handleEmailChange}
                    title={"E-mail"}
                  />
                </div>
                <div className="col">
                  <Select
                    options={this.state.genderOptions}
                    placeholder={"Select Gender"}
                    handleChange={this.handleGenderChange}
                    title={"Gender"}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <Select
                    options={this.state.profileOptions}
                    placeholder={"Select User Type"}
                    handleChange={this.handleUserTypeChange}
                    title={"User Type"}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm">
                  <Input
                    placeholder={"Enter password"}
                    handleChange={this.handlePasswordChange}
                    title={"Password"}
                  />
                </div>
                <div className="col-sm">
                  <Input
                    placeholder={"Enter password again"}
                    handleChange={this.handleSecondPasswordChange}
                    title={"Re-enter Password"}
                  />
                </div>
              </div>
              <div className="match-struct">
                <Match match={this.state.match} />
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <button
                      className="btn btn-primary form-control"
                      disabled={!this.state.formValid}
                      name={"Submit Info!"}
                      onClick={this.handleFormSubmission}
                    >
                      Submit!
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
