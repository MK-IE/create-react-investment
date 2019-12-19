import React from "react";

const Input = props => {
  // We want a label for our input, we want to receive a string value, and we want an ability to handle change. No need to handle options
  return (
    <div
      className="form-group"
      //Incorporates our label into our input
    >
      <label> {props.title} </label>
      <input //Provides template for our input function, with optional fields to fill out for each depending on how we want to use it
        title={props.title}
        className="form-control"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        type={props.type}
      />
    </div>
  );
};

export default Input;
