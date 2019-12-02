import React, {Component} from 'react';
import Select from './ProfileFields/Select';
import Input from './ProfileFields/Input';
import Match from './ProfileFields/Match';
import Submit from './ProfileFields/Submit';
import {userList} from './userList';
import Hash from './Hash';

function SaveDataToLocalStorage(data)
{
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('session'));
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    //alert(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('session', JSON.stringify(a));
}

class CreateProfile extends Component 
{

	constructor(props)
	{
		super(props);
		
		this.state = 
		{
			newProfile: 
			{
				name: '',
				email: '',
				gender: '',
				userType: '',
				password: ''		
			},
			
			match: true,
			formValid: false,
			nameValid: false,
			emailValid: false,
			genderSelectionValid: false,
			userTypeValid: false,
			passwordValid: false,
			
			formErrors: 
			{
				name: '',
				email: '',
				password: '',
				gender: '',
				userType: ''
			},
			
			passwordConfirm: '',
			
			profileOptions: ['Investor', 'Student'],
			genderOptions: ['Male','Female','Other'],

			first: true
		};
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
		this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
		this.handleFormSubmission = this.handleFormSubmission.bind(this);
		this.validateName = this.validateName.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	
	handleNameChange(event)
	{
		let value = event.target.value;
		this.setState( prevState =>
			({newProfile: {...prevState.newProfile, name: value}}),
			() => console.log(this.state.newProfile))
		this.validateName(value);
	}
		
	handleEmailChange(event)
	{
		let value = event.target.value;
		this.setState( prevState =>
		({newProfile: {...prevState.newProfile, email: value}}),
			() => 
			console.log(this.state.newProfile))
		this.validateEmail(value);
	}
	
	handleGenderChange(event)
	{
		console.log(event.target.value);
		let value = event.target.value;
		let tempProfile = this.state.newProfile;
		tempProfile.gender = value;
		this.setState({newProfile: tempProfile});
		console.log(this.state.newProfile.gender);
		this.validateGenderSelection(value);
	}
	
	handlePasswordChange(event)
	{
		let value = event.target.value;

		this.setState( prevState => 
		({newProfile: {...prevState.newProfile, password: value}}),
		() => 
		{ 
			if(this.state.newProfile.password !== this.state.passwordConfirm)
			{
				this.setState({match: false}, this.validateForm)
			}
			else if(this.state.newProfile.password === this.state.passwordConfirm)
			{
				this.setState({match: true}, this.validateForm)
			}
			console.log(this.state.match);
			console.log(this.state.password);
			console.log(this.state.newProfile)
		});
		this.validatePassword(value);
	}
	
	handleSecondPasswordChange(event)
	{
		let value = event.target.value;
		this.setState({passwordConfirm: value}, () =>
		{
				if(this.state.newProfile.password !== this.state.passwordConfirm)
			{
				this.setState({match: false}, this.validateForm)
			}
			else if(this.state.newProfile.password === this.state.passwordConfirm)
			{
				this.setState({match: true}, this.validateForm)
			}
			console.log(this.state.match);
			console.log(this.state.passwordConfirm);
		});

	}
	
	handleUserTypeChange(event)
	{
		let type = event.target.value;
		this.setState( prevState =>
		({newProfile: {...prevState.newProfile, userType: type}}), () =>
			console.log(this.state.newProfile));
		this.validateUserTypeSelection();
	}

	handleFormSubmission()
	{
		if(this.state.first === true)
		{
			var a = [];
			a.push(JSON.parse(localStorage.getItem('session')));
			localStorage.setItem('session', JSON.stringify(a));
			this.setState({first: false});
		}
		SaveDataToLocalStorage(this.state.newProfile);
		//localStorage.setItem(1, JSON.stringify(this.state.newProfile));
		this.setState( prevState =>
			({newProfile: {...prevState.newProfile, name: '', email: '', password: '' , userType: '', gender: ''}}),
			() => console.log(this.state.newProfile))
		this.setState({passwordConfirm: ''});
		console.log('Submitted!');
		localStorage.clear();
		//var storedNames = JSON.parse(localStorage.getItem(1));
		//console.log(JSON.parse(localStorage.getItem(1)));
	}
	
	validateForm()
	{
		if(this.state.nameValid === true && this.state.emailValid === true && this.state.passwordValid === true && this.state.userTypeValid === true && this.state.genderSelectionValid === true && this.state.match === true)
		{
		this.setState({formValid: true});
		}
		else
		{
			this.setState({formValid: false});
		}
		
		if(this.state.formValid === false)
		{
			console.log(this.state.formErrors);
		}
	}
	
	validateName(name)
	{
		let localFormErrors = {...this.state.formErrors};
		
		if(name.length < 5)
		{
			localFormErrors.name = "The name is too short."
			this.setState({nameValid: false});
		}
		else
		{
			localFormErrors.name = "";
			this.setState({nameValid: true});
		}
		this.setState({formErrors: localFormErrors}, this.validateForm);
	}
	
	validateEmail(email)
	{
		//API validation occurs here
		let localFormErrors = {...this.state.formErrors};
		
		if(email.length < 4)
		{
			localFormErrors.email = "The email is too short."
			this.setState({emailValid: false});
		}
		else
		{
			localFormErrors.email = "";
			this.setState({emailValid: true});
		}
		this.setState({formErrors: localFormErrors}, this.validateForm);
	}
	
	validateGenderSelection(gender)
	{
		let localFormErrors = {...this.state.formErrors};
		
		if(gender == "Male" || "Female" || "Other")
		{
			localFormErrors.gender = "";
			this.setState({genderSelectionValid: true});
		}
		else if (gender == "Select Gender")
		{
			localFormErrors.gender = "No gender selected.";
			this.setState({genderSelectionValid: false});
		}
		this.setState({formErrors: localFormErrors}, this.validateForm);
	}
	
		validateUserTypeSelection()
	{
		let localFormErrors = {...this.state.formErrors};
		let localSelection = this.state.newProfile.userType;
		
		if(localSelection === "Student" || "Investor")
		{
			localFormErrors.userType = "";
			this.setState({userTypeValid: true});
		}
		else
		{
			localFormErrors.userType = "No user type selected.";
			this.setState({userTypeValid: false});
		}
		this.setState({formErrors: localFormErrors}, this.validateForm);
	}
	
	validatePassword(password)
	{
		let localFormErrors = {...this.state.formErrors};
		if(password.length < 7 || password.length > 64 || password.search(/[a-zA-Z]/) === -1 || password.search(/\d/) === -1 || password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1 )
		{
			localFormErrors.password = "Must be longer than seven characters, less than sixty four and contain letters and numbers.";
			this.setState({passwordValid: false});
		}
		else
		{
			localFormErrors.password = "";
			this.setState({passwordValid: true});
		}
		this.setState({formErrors: localFormErrors}, this.validateForm);
	}

	componentDidUpdate() 
	{
      console.log('update', this.state);
    }
	
	render() 
	{
		return (
		<div className = 'Creation Form'>
			<h3>Create Profile Here</h3>
		<form>
			<Input  placeholder = {'Enter Name'}
					handleChange = {this.handleNameChange}
					title = {'Name'}
					required
			/>
			<Input placeholder = {'Enter E-mail'}
				   handleChange = {this.handleEmailChange}
				   title = {'E-mail'}
			/>
			<Select options = {this.state.genderOptions}
					placeholder = {'Select Gender'}
					handleChange = {this.handleGenderChange}
					title = {'Gender'}
			/>
			<Select options = {this.state.profileOptions}
					placeholder = {'Select User Type'}
					handleChange = {this.handleUserTypeChange}
					title = {'User Type'}
			/>
			<Input placeholder = {'Enter password'}
				   handleChange = {this.handlePasswordChange}
				   title = {'Password'}
			/>
			<Input placeholder = {'Enter password again'}
				   handleChange = {this.handleSecondPasswordChange}
				   title = {'Re-enter Password'}
			/>
			<Match match={this.state.match} />
			<button disabled = {!this.state.formValid}
					name = {'Submit Info!'}
					onClick = {this.handleFormSubmission}
			>Submit!</button>
		</form>
		</div>
		
		);
	}	
}

export default CreateProfile;
