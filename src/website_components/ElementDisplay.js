import React from "react";
import { Component } from "react";

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
      <div className="user-projects container text-center">
        <h2>{this.state.total}</h2>
        <div class="btn-group-vertical float-right">
          <button className="btn btn-success" onClick={this.likeBtn}>
            <i className="material-icons">keyboard_arrow_up</i>
          </button>
          <button className="btn btn-danger" onClick={this.dislikeBtn}>
            <i className="material-icons">keyboard_arrow_down</i>
          </button>
        </div>
      </div>
    );
  }
}

export default ElementDisplay;
