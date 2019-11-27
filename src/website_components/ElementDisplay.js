import React from "react";
import { Component } from "react";
import pImage from "./img/user-project.jpg";

class ElementDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
    this.likeBtn = this.likeBtn.bind(this);
    this.dislikeBtn = this.dislikeBtn.bind(this);
  }
  likeBtn() {
    this.setState({ total: this.state.total + 1 });
  }
  dislikeBtn() {
    this.setState({ total: this.state.total - 1 });
  }
  render() {
    return (
      <div className="user-projects container card">
        <img
          src={pImage}
          className="img-user-projects card-img-top"
          alt="project image"
        ></img>
        <div className="cardBody">
          <h6 className="card-title">This is the title</h6>
          <p className="card-text">
            THIS IS THE TEXT OF THE PROJECT THIS IS THE TEXT OF THE PROJECT THIS
            S THE TEXT OF THE PROJECT THIS IS THE TEXT OF THE PROJECT THIS IS
            THE TEXT OF THE PROJECT THIS IS THE TEXT OF THE PROJECT THIS IS THE
            TEXT OF THE PROJECT THIS IS THE TEXT OF THE PROJECT THIS IS THE TEXT
            OF THE PROJECT THIS IS THE TEXT OF THE PROJECT THIS IS THE TEXT OF
          </p>
          <div className="btn-group-vertical float-right">
            <button className=" like-btn" onClick={this.likeBtn}>
              <i className="material-icons">keyboard_arrow_up</i>
            </button>
            <span className="container text-center">{this.state.total}</span>
            <button className=" dislike-btn" onClick={this.dislikeBtn}>
              <i className="material-icons">keyboard_arrow_down</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ElementDisplay;
