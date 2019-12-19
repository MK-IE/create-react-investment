import React, { Component } from "react";
import Select from "../ProfileFields/Select";
import Input from "../ProfileFields/Input";
import Match from "../ProfileFields/Match";

import {
  writeUserData,
  checkUserName,
  checkUserEmail
} from "../ContactServer/ContactServer";

import { passwordHash } from "../AuxilaryFunctions/Hash";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Declares all of our state variables
      newProfile: {
        //Stores all information that will be passed to our database, reset upon submission
        userName: "",
        name: "",
        email: "",
        gender: "",
        userType: "",
        password: ""
      },

      match: true, //Variables for form validation
      formValid: false,
      nameValid: false,
      emailValid: false,
      genderSelectionValid: false,
      userTypeValid: false,
      passwordValid: false,
      userNameValid: false,

      formErrors: {
        //Contains strings of form errors, to allow ease of user input, and understand why they cannot submit improper info
        name: "",
        userName: "",
        email: "",
        password: "",
        validate: ""
      },

      passwordConfirm: "",

      profileOptions: ["Investor", "Student"], //Arrays for our drop down menu templates in Select.js
      genderOptions: ["Male", "Female", "Other"]
    };
    this.handleGenderChange = this.handleGenderChange.bind(this); //Binding our many, many button handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(
      this
    );
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleCreationFormSubmission = this.handleCreationFormSubmission.bind(
      this
    );
    this.validateName = this.validateName.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleNameChange(event) {
    //Triggers on changes to name input field
    let value = event.target.value; //Appends our information to the newProfile.name state variable
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, name: value } }),
      () => console.log(this.state.newProfile)
    );
    this.validateName(value); //Requests validation
  }

  handleUserNameChange(event) {
    // Same format as above button but for newProfile.userName
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
    //Same format as above button but for newProfile.email
    let value = event.target.value;
    this.setState(
      prevState => ({ newProfile: { ...prevState.newProfile, email: value } }),
      () => console.log(this.state.newProfile)
    );
    this.validateEmail(value);
  }

  handleGenderChange(event) {
    //Acts on change for gender select field
    let value = event.target.value;
    let tempProfile = this.state.newProfile; //Uses a slight different method of setting the state of our newProfile than above that use arrow functions
    tempProfile.gender = value; //Same end result, a copy of our newProfile object is created, modified, and then newProfile is set to this new object
    this.setState({ newProfile: tempProfile });
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
          //Ensure all of this happens when the state is set
          this.setState({ match: false }, this.validateForm); //Password and password confirmation fields are compared
        } else if (
          this.state.newProfile.password === this.state.passwordConfirm
        ) {
          this.setState({ match: true }, this.validateForm); // If they are equal set match to true
        }
      }
    );
    this.validatePassword(value);
  }

  handleSecondPasswordChange(event) {
    //Does exact same as password change above, but acting off of the password confirmation field
    let value = event.target.value;
    this.setState({ passwordConfirm: value }, () => {
      if (this.state.newProfile.password !== this.state.passwordConfirm) {
        this.setState({ match: false }, this.validateForm);
      } else if (
        this.state.newProfile.password === this.state.passwordConfirm
      ) {
        this.setState({ match: true }, this.validateForm);
      }
    }); //Only difference is not calling validation on the passsword
  }

  handleUserTypeChange(event) {
    //Handles user change in similar manner to the genderchange
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
    //Final function that will add our user to the database once all Creation validations are satisfied and submit is hit
    writeUserData(
      //Writes our newProfile object to the database along with the generated hash and unique salt
      this.state.newProfile.userName,
      this.state.newProfile.name,
      this.state.newProfile.email,
      this.state.newProfile.gender,
      hash,
      this.state.newProfile.userType,
      salt
    );
    this.setState(
      //Resets our state variables
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
    this.setState({ passwordConfirm: "" }); //Resets confirmation variable
    console.log("Submitted!");
  }
  async handleCreationFormSubmission(event) {
    //Our submit button handler
    event.preventDefault(); //Prevents app refresh upon submission
    let hashedPassword = passwordHash(this.state.newProfile.password); //Generates our hash from Hash.js
    let hash = hashedPassword[0];
    let salt = hashedPassword[1]; //Locally assigns hash and salt that are returned from passwordHash
    let userNameScan = await checkUserName(this.state.newProfile.userName); //Checks to see if the requested username already exists
    let emailScan = await checkUserEmail(this.state.newProfile.email); //Checks to see if the requested email address already exists
    //Checking if the user is not in the database
    if (!userNameScan && !emailScan) {
      //If neither exist, we are free to add the user and call our FinalLogIn from App.js
      this.addUser(hash, salt);
      this.props.finalLogIn(this.state.newProfile.userName);
    } else {
      //Otherwise, throw an error and let them correct it before continuing
      let localFormErrors = { ...this.state.formErrors };
      localFormErrors.validate = "* Username or email is already in use!";
      this.setState({ formErrors: localFormErrors });
    }
  }

  validateForm() {
    //Called upon each change for realtime updating. When all validations are true, only then can the user submit their form
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
    let localFormErrors = { ...this.state.formErrors }; //Create copy

    if (name.length < 5) {
      //Ensures names are at least a certain length
      localFormErrors.name =
        "* The name is too short. Please include first and last name."; //Sets a form error if validation is not met
      this.setState({ nameValid: false });
    } else {
      localFormErrors.name = ""; //If there are no issues validation is set to true
      this.setState({ nameValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm); //Set form errors at end of each call
  }

  validateUserName(userName) {
    //Similar as to name validation
    let localFormErrors = { ...this.state.formErrors };

    if (userName.length < 5) {
      localFormErrors.userName = "* The username is too short.";
      this.setState({ userNameValid: false });
    } else {
      localFormErrors.userName = "";
      this.setState({ userNameValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateEmail(email) {
    //API validation occurs here
    let localFormErrors = { ...this.state.formErrors };
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email) === false) {
      localFormErrors.email = "* Invalid email address.";
      this.setState({ emailValid: false });
    } else {
      localFormErrors.email = "";
      this.setState({ emailValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateGenderSelection(gender) {
    //There should be no way to screw this up but I don't trust people. Ensure a gender is selected, if it is, flip to true
    let localFormErrors = { ...this.state.formErrors };

    if (gender == "Male" || "Female" || "Other") {
      localFormErrors.gender = "";
      this.setState({ genderSelectionValid: true });
    } else if (gender == "Select Gender") {
      this.setState({ genderSelectionValid: false });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validateUserTypeSelection() {
    //Same as gender selection. Ensure either student or investor is selected then set formvalidation to true
    let localFormErrors = { ...this.state.formErrors };
    let localSelection = this.state.newProfile.userType;

    if (localSelection === "Student" || "Investor") {
      localFormErrors.userType = "";
      this.setState({ userTypeValid: true });
    } else {
      this.setState({ userTypeValid: false });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm);
  }

  validatePassword(password) {
    //Ensure a proper password that is mildly secure
    let localFormErrors = { ...this.state.formErrors }; //Call local copy
    if (
      //Use a regular expression to ensure a certain length and conditions for a secure password. Must have a capital and numbers
      password.length < 7 ||
      password.length > 64 ||
      password.search(/[a-zA-Z]/) === -1 ||
      password.search(/\d/) === -1 ||
      password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1
    ) {
      localFormErrors.password =
        "* Must be longer than seven characters, less than sixty four and contain letters and numbers."; //Throw an error if they don't meet conditions
      this.setState({ passwordValid: false });
    } else {
      // Allow validation if it meets conditions
      localFormErrors.password = "";
      this.setState({ passwordValid: true });
    }
    this.setState({ formErrors: localFormErrors }, this.validateForm); //Set form errors and call validation
  }

  render() {
    return (
      <div className="create-profile">
        <div className="d-flex full-height align-items-center justify-content-center">
          <div className="form-struct">
            <div
              className="container"
              //Bootstrap formatting
            >
              <h3
                className="text-center"
                //Title our container
              >
                CREATE ACCOUNT
              </h3>
            </div>
            <form>
              <div className="form-row">
                <div className="col">
                  <Input //Calls our input template for our username. All fields are required for submission with built in HTML validation
                    placeholder={"Enter Profile Name"}
                    handleChange={this.handleUserNameChange}
                    title={"Username"}
                    required
                  />
                </div>
                <div className="col">
                  <Input //Call input template for name
                    placeholder={"Enter Name"}
                    handleChange={this.handleNameChange}
                    title={"Name"}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <Input //Call our input template for email
                    placeholder={"Enter E-mail"}
                    handleChange={this.handleEmailChange}
                    title={"E-mail"}
                  />
                </div>
                <div className="col">
                  <Select //Call our drop down template for gender options
                    options={this.state.genderOptions}
                    placeholder={"Select Gender"}
                    handleChange={this.handleGenderChange}
                    title={"Gender"}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col">
                  <Select //Call our drop down template for user type
                    options={this.state.profileOptions}
                    placeholder={"Select User Type"}
                    handleChange={this.handleUserTypeChange}
                    title={"User Type"}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm">
                  <Input //Call our input template for both passsword and then password confirmation
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
              <div
                className="match-struct"
                //Display if our passwords
              >
                <Match match={this.state.match} />
              </div>
              <button
                className="btn btn-primary"
                disabled={!this.state.formValid} //Disabled if this.state.formValid is not true
                name={"Submit Info!"}
                onClick={this.handleCreationFormSubmission} //When able, and clicked, call our form submission
              >
                Submit!
              </button>
              <br />
              <span
                className="danger"
                //Display our errors, or nothing if no errors are present
              >
                {this.state.formErrors.name}
              </span>{" "}
              <br />
              <span className="danger">{this.state.formErrors.userName}</span>
              <br />
              <span className="danger">{this.state.formErrors.email}</span>
              <br />
              <span className="danger">{this.state.formErrors.password}</span>
              <span className="danger">{this.state.formErrors.validate}</span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
