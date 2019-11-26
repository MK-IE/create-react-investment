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
      <nav className="nav-bar navbar navbar-expand-lg bg-light">
        <span className="navbar-brand">CS385</span>
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.toggleBtn}
        >
          <i className="material-icons">reorder</i>
        </button>
        <div className={"collapse navbar-collapse " + show}>
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="#">
              CREATE ACCOUNT
            </a>
            <a className="nav-item nav-link" href="#">
              LOGIN
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;