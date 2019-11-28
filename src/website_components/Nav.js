import React from "react";
import { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleBtn = this.toggleBtn.bind(this);
  }

  toggleBtn() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    const show = this.state.menu ? "show" : "";
    return (
      <nav className="nav-bar navbar navbar-expand-lg">
        <span className="navbar-brand">CREATE-REACT-INVESTMENT</span>
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.toggleBtn}
        >
          <i className="material-icons">reorder</i>
        </button>
        <div className={"collapse navbar-collapse " + show}>
          <div className="navbar-nav">
            <button
              className="btn btn-link nav-item"
              onClick={this.props.cClick}
            >
              CREATE ACCOUNT
            </button>
            <button
              className="btn btn-link nav-item"
              onClick={this.props.lClick}
            >
              LOGIN
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
