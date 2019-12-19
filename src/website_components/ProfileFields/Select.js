import React from "react";

const Select = props => {
  return (
    <div
      className="form-group"
      //A template for our drop down menus at form creation
    >
      <label> {props.title} </label>
      <select //Template for select
        className="form-control"
        value={props.value}
        onChange={props.handleChange}
      >
        required
        <option
          selected
          disabled
          //Template for our options, with a default option that is non selectable
        >
          {props.placeholder}
        </option>
        {props.options.map(field => {
          //Allows us to use an array of choices to be displayed rather than create each option within the render portion
          return (
            <option key={field} value={field} label={field}>
              {field}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
