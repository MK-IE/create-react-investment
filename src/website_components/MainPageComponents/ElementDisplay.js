import React from "react";
import { Component } from "react";
import { readStorage } from "../ContactServer/ContactServer";
/*
  OMITTED FEATURE :
   
  //total: 0

  // likeBtn() {
  //   this.setState({ total: this.state.total + 1 });
  // }
  // dislikeBtn() {
  //   this.setState({ total: this.state.total - 1 });
  // }

  <button className="like-btn" onClick={this.likeBtn}>
    <i className="material-icons">keyboard_arrow_up</i>
  </button>
    <span className="container">{this.state.total}</span>
  <button className="dislike-btn" onClick={this.dislikeBtn}>
    <i className="material-icons">keyboard_arrow_down</i>
  </button>

*/

class ElementDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      image: this.props.image
    };
    this.expandBtn = this.expandBtn.bind(this);
  }
  expandBtn() {
    this.setState({ expand: !this.state.expand });
  }
  async UNSAFE_componentWillMount() {
    const imageGet = await readStorage(this.state.image);
    this.setState({ image: imageGet });
  }
  render() {
    const showcasePreview = !this.state.expand
      ? this.props.projectDes.substring(0, 400)
      : this.props.projectDes;
    const showProfIcon =
      this.props.pClick === "none" ? (
        ""
      ) : (
        <span className="hover" onClick={this.props.pClick}>
          <i className="icon-size material-icons">account_circle</i>
        </span>
      );

    const fullPage = !this.state.expand ? "" : "d-flex";
    return (
      <div className={"user-projects card container " + fullPage}>
        <img
          src={this.state.image}
          className="user-projects-img card-img-top"
          alt="Project"
        ></img>
        <div className="card-body">
          <div className="card-title">
            <strong>Author: </strong>
            <i>{this.props.userName}</i>
          </div>
          <span className="hover" onClick={this.expandBtn}>
            <h6 className="card-title">{this.props.projectTitle}</h6>
            <p className="card-text">{showcasePreview}</p>
          </span>
          <div className="btn-group-vertical float-right">{showProfIcon}</div>
        </div>
      </div>
    );
  }
}

export default ElementDisplay;
