import React from "react";
import { Component } from "react";
import LoadingScreen from "./LoadingScreen";
import pImage from "./img/user-project.jpg";

class ProfileInterface extends Component {
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
  switchPages() {
    if (!this.state.load) {
      return <LoadingScreen />;
    }
    return this.state.displayScreen;
  }
  
  render() {
	return <div className="App">{this.switchPages()}</div>;
    return (
      <div className="user-projects container card">
        <img
          src={pImage}
          className="img-user-projects card-img-top"
          alt="project image"
        ></img>
        <div className="cardBody">
          <h6 className="card-title">John Smiths Project</h6>
          <h3 className="card-text">
          Who knows what to do about Climate Change?
          
          I do 
          </h3>
          <p className="bg-info">
          My plan is to build giant recycling robots with x-ray vision and 
          chainsaw hands.
          </p>
          <p className="bg-primary">          
          I need 100,000 dollars, an ice-cream van and some electronic engineers.
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

export default ProfileInterface;
