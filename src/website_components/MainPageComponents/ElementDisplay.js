import React from "react";
import { Component } from "react";
import pImage from "../img/user-project.jpg";
import { readStorage } from "../ContactServer/ContactServer";

class ElementDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      expand: false,
      image: this.props.image
    };
    this.likeBtn = this.likeBtn.bind(this);
    this.dislikeBtn = this.dislikeBtn.bind(this);
    this.expandBtn = this.expandBtn.bind(this);
  }
  likeBtn() {
    this.setState({ total: this.state.total + 1 });
  }
  dislikeBtn() {
    this.setState({ total: this.state.total - 1 });
  }
  expandBtn() {
    this.setState({ expand: !this.state.expand });
  }
  async componentDidMount() {
    const imageGet = await readStorage(this.props.image);
    this.setState({ image: imageGet });
  }
  render() {
    const showcasePreview = !this.state.expand
      ? this.props.projectDes.substring(0, 500)
      : this.props.projectDes;
    const showProfIcon =
      this.props.pClick === "none" ? (
        ""
      ) : (
        <a className="hover" onClick={this.props.pClick}>
          <i className="icon-size material-icons">account_circle</i>
        </a>
      );

    const fullPage = !this.state.expand ? "container" : "d-flex container";
    return (
      <div className={"user-projects card " + fullPage}>
        <img src={this.state.image} className="card-img-top"></img>
        <div className="card-body">
          <div className="card-title">
            <i>{this.props.userName}</i>
          </div>
          <a className="hover" onClick={this.expandBtn}>
            <h6 className="card-title">{this.props.projectTitle}</h6>
            <p className="card-text">{showcasePreview}</p>
          </a>
          <div className="btn-group-vertical float-right">
            <button className="like-btn" onClick={this.likeBtn}>
              <i className="material-icons">keyboard_arrow_up</i>
            </button>
            <span className="container">{this.state.total}</span>
            <button className="dislike-btn" onClick={this.dislikeBtn}>
              <i className="material-icons">keyboard_arrow_down</i>
            </button>
            {showProfIcon}
          </div>
        </div>
      </div>
    );
  }
}

export default ElementDisplay;
