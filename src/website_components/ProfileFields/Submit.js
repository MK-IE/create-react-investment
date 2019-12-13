import React from 'react';

const Submit = (props) =>
{
	return (
		<div className="form-submit">
			<button
				disabled = {props.formValid}
				type = {props.buttonType}
				name = {props.buttonName}
				onClick = {props.buttonHandler}
			/>
		</div>
	);
}

export default Submit;
