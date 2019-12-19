import React from "react";

const Submit = props => {
  return (
    <div className="form-submit">
      <button // Provides a template for our buttons, in both creation and log in page
        disabled={props.formValid}
        type={props.buttonType}
        name={props.buttonName}
        onClick={props.buttonHandler}
      />
    </div>
  );
};

export default Submit;
