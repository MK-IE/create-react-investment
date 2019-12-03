import React from "react";

const Input = props => {
  // We want a label for our input, we want to receive a string value, and we want an ability to handle change. No need to handle options
  return (
    <div className="form-group">
      <label> {props.title} </label>
      <input
        title={props.title}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        extra={props.extra}
      />
    </div>
  );
};

export default Input;
