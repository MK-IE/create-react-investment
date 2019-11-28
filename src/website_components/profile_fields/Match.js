import React, {Component } from 'react';

class Match extends Component
{
	render()
	{
		const localMatch = this.props.match;
		let displayMatch = '';
		
		if(localMatch === true)
		{
			displayMatch = 'Passwords match!';
		}
		else
		{
			displayMatch = 'Please enter matching passwords!';
		}
		
		return(
		<div className = 'Match'>
			{displayMatch}
		</div>
	
		);
	}
}

export default Match;
