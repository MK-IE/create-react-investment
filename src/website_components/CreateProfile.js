import React, { Component } from "react";
import Select from "./profile_fields/Select";
import Input from "./profile_fields/Input";
import Match from "./profile_fields/Match";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProfile: {
        name: "",
        email: "",
        gender: "",
        userType: "",
        password: ""
      },

      match: true,
      passwordConfirm: "",

      profileOptions: ["Investor", "Student"],
      genderOptions: ["Male", "Female", "Other"],
      value: ""
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(
      this
    );
    this.handleProfileTypeChange = this.handleProfileTypeChange.bind(this);
  }

  handleNameChange(event) {
    let value = event.target.value;
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, name: value } }),
      () => console.log(this.state.newProfile)
    );
  }

  handleEmailChange(event) {
    let value = event.target.value;
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, email: value } }),
      () => console.log(this.state.newProfile)
    );
  }

  handleGenderChange(event) {
    let value = event.target.value;
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, gender: value } }),
      () => console.log(this.state.newProfile)
    );
  }

  handlePasswordChange(event) {
    let value = event.target.value;

    this.setState(
      prevState => ({
        newProfile: { ...prevState.newProfile, password: value }
      }),
      () => {
        if (this.state.newProfile.password !== this.state.passwordConfirm) {
          this.setState({ match: false });
        } else if (
          this.state.newProfile.password === this.state.passwordConfirm
        ) {
          this.setState({ match: true });
        }
        console.log(this.state.match);
        console.log(this.state.password);
        console.log(this.state.newProfile);
      }
    );
  }

  handleSecondPasswordChange(event) {
    let value = event.target.value;
    this.setState({ passwordConfirm: value }, () => {
      if (this.state.newProfile.password !== this.state.passwordConfirm) {
        this.setState({ match: false });
      } else if (
        this.state.newProfile.password === this.state.passwordConfirm
      ) {
        this.setState({ match: true });
      }
      console.log(this.state.match);
      console.log(this.state.passwordConfirm);
    });
  }

  handleProfileTypeChange(event) {
    let type = event.target.value;
    this.setState(
      prevState => ({
        newProfile: { ...prevState.newProfile, userType: type }
      }),
      () => console.log(this.state.newProfile)
    );
  }

  handleTypeChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="Creation-Form">
        <h3>Create Profile Here</h3>
        <Input
          placeholder={"Enter Name"}
          handleChange={this.handleNameChange}
          title={"Name"}
        />
        <Input
          placeholder={"Enter E-mail"}
          handleChange={this.handleEmailChange}
          title={"E-mail"}
        />
        <Select
          options={this.state.genderOptions}
          placeholder={"Select Gender"}
          handleChange={this.handleGenderChange}
          title={"Gender"}
        />
        <Select
          options={this.state.profileOptions}
          placeholder={"Select User Type"}
          handleChange={this.handleProfileTypeChange}
          title={"User Type"}
        />
        <Input
          placeholder={"Enter password"}
          handleChange={this.handlePasswordChange}
          title={"Password"}
        />
        <Input
          placeholder={"Enter password again"}
          handleChange={this.handleSecondPasswordChange}
          title={"Re-enter Password"}
        />
        <Match match={this.state.match} />
      </div>
    );
  }
}

export default CreateProfile;
