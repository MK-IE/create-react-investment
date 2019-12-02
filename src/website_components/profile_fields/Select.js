import React from 'react';

const Select = (props) =>
{
	return(
		<div className='form-group'>
			<label> {props.title} </label>
			<select
				value={props.value}
				onChange={props.handleChange}>
				required
				<option selected disabled>{props.placeholder}</option>
				{props.options.map(field => 
				{ return(
					<option
						key={field}
						value={field}
						label={field}>{field}
					</option>
					);
					})}
			</select>
		</div>)
}

export default Select;
