import React from "react";
import { Component } from "react";
import ElementDisplay from "./ElementDisplay";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.n = [...Array(10).keys()];
    this.state = {
      isLoading: false
    };
  }
  render() {
    const items = this.n.map(e => (
      <ElementDisplay key={e.toString()}></ElementDisplay>
    ));
    return <div>{items}</div>;
  }
}

export default CreateAccount;
