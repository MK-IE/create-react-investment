import React from "react";
import { Component } from "react";
import pImage from "../img/user-project.jpg";

class UserPage extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      total: 0,
      expand: false
    };*/
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
  render() {
    //const showcasePreview = !this.state.expand
      //? this.props.projectDes.substring(0, 500)
      //: this.props.projectDes;
    //const fullPage = !this.state.expand ? "container" : "d-flex container";
    return (
      <div className={"user-projects card "}>
       plClick(this.props.plClick);
      </div>
    );
  }
}

export default UserPage;
