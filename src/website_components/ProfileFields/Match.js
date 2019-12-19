import React, { Component } from "react";

class Match extends Component {
  render() {
    const localMatch = this.props.match; // Ensures that our password and second password input are matching, to display a warning to the screen.
    let displayMatch = ""; //Honestly this file might not be needed but it was a very early portion and doesn't need a rewrite anyways

    if (localMatch === true) {
      displayMatch = "Passwords match!";
    } else {
      displayMatch = "Please enter matching passwords!";
    }

    return <div className="Match">{displayMatch}</div>;
  }
}

export default Match;
