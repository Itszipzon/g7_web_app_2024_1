import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './css/RegisterPage.css';
import axios from 'axios';

function RegisterPage() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [countryCode, setCountryCode] = useState('');

	const [emails, setEmails] = useState([]);

	const [terms, setTerms] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');

	const [emailUnique, setEmailUnique] = useState(false);

	const jsonValue = require('../../information.json');

	const formData = {
		name: '',
		email: '',
		password: '',
		address: '',
		phoneNumber: '',
		terms: ''
	}

	const handleNameChange = (e) => {
		setName(e.target.value);
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setEmailUnique(emails.includes(e.target.value) ? false : true)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleRepeatPasswordChange = (e) => {
		setRepeatPassword(e.target.value);
	}

	const handleAddressChange = (e) => {
		setAddress(e.target.value);
	}

	const handlePostalCodeChange = (e) => {
		setPostalCode(e.target.value);
	}

	const handleCityChange = (e) => {
		setCity(e.target.value);
	}

	const handleCountryChange = (e) => {
		setCountry(e.target.value);
	}

	const handlePhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
	}

	const handleCountryCodeChange = (e) => {
		setCountryCode(e.target.value);
	}

	const handleTermChange = (e) => {
		setTerms(e.target.checked);
	}

	const handleRegisterButtonClick = async () => {

		if (name === '') {
			setErrorMessage('Please fill in the name field');
			return;
		}

		if (name.split(' ').length < 2) {
			setErrorMessage('Please fill in the full name');
			return;
		}

		if (email === '') {
			setErrorMessage('Please fill in the email field');
			return;
		}

		if (password === '') {
			setErrorMessage('Please fill in the password field');
			return;
		}

		if (repeatPassword === '') {
			setErrorMessage('Please fill in the repeat password field');
			return;
		}

		if (!isValidEmail(email)) {
			setErrorMessage('Invalid email');
			return;
		}

		if (password !== repeatPassword) {
			setErrorMessage('Passwords do not match');
			return;
		}

		if (address === '' || address.split(' ').length > 2) {
			setErrorMessage('Please fill in the address field, and make sure it is a valid address');
			return;
		}

		if (postalCode === '' || isNaN(postalCode) || postalCode.length !== 4) {
			setErrorMessage('Please fill in a valid postal code');
			return;
		}

		if (city === '') {
			setErrorMessage('Please fill in the city field');
			return;
		}

		if (country === '') {
			setErrorMessage('Please select your country');
			return;
		}

		if (countryCode === '') {
			setErrorMessage('Please select your country code');
			return;
		}

		if (phoneNumber === '' || isNaN(phoneNumber)) {
			setErrorMessage('Please fill in a valid phone number');
			return;
		}

		if (!terms) {
			setErrorMessage('Please accept the terms and conditions');
			return;
		}

		setErrorMessage('');
		formData.name = name;
		formData.email = email;
		formData.password = password;
		formData.address = address + ", " + postalCode + " " + city + ", " + country;
		formData.phoneNumber = countryCode + " " + phoneNumber;
		formData.terms = terms;


		if (emailUnique) {
			axios.post(jsonValue.serverAddress + 'post/register/user', formData)
				.then(r => {
					if (r.status === 200) {
						window.location.href = '/login';
					} else {
						setErrorMessage("Error, could not connect to server");
					}
				});
		} else {
			setErrorMessage("Email already exist");
		}

	}

	useEffect(() => {
		axios.get(jsonValue.serverAddress + "api/users/emails")
		.then((r) => {
			setEmails(r.data);
		});
	}, [jsonValue]);

	return (
		<div className='RegisterPage'>
			<div className='RegisterContainer'>
				<h1>Register</h1>
				<div className='RegisterForm'>
					<input type='text' className='defaultRegisterInput' placeholder='Full Name' onChange={handleNameChange} />
					<input type='text' className='defaultRegisterInput' placeholder='Email' onChange={handleEmailChange} />
					<div className='RegisterPassword'>
						<input type='password' onChange={handlePasswordChange} className='passwordInput defaultRegisterInput' placeholder='Password' />
						<input type='password' onChange={handleRepeatPasswordChange} className='passwordRepeat defaultRegisterInput' placeholder='Repeat Password' />
					</div>
					<div className='addressContainer'>
						<input type='text' className='defaultRegisterInput' onChange={handleAddressChange} placeholder='Address' />
						<div className='addressExtra'>
							<input type='text' className='defaultRegisterInput' onChange={handlePostalCodeChange} placeholder='Postal Code' />
							<input type='text' className='defaultRegisterInput' onChange={handleCityChange} placeholder='City' />
						</div>
						<select onChange={handleCountryChange}>
							<option value="">Select country...</option>
							<option value="Norway">Norway</option>
							<option value="Sweden">Sweden</option>
							<option value="Denmark">Denmark</option>
							<option value="Finland">Finland</option>
						</select>
					</div>
					<div className='phoneNumberContainer'>
						<select className='phoneNumberSelect' value={countryCode} onChange={handleCountryCodeChange}>
							<option value="">Option</option>
							<option value="+47">+47</option>
							<option value="+46">+46</option>
							<option value="+45">+45</option>
							<option value="+358">+358</option>
						</select>
						<input type='text' className='phoneNumberInput' onChange={handlePhoneNumberChange} placeholder='Phone number' />
					</div>
					<div className='termsContainer'>
						<label className="termsContainerRegister">
							<input onChange={handleTermChange} value={terms} type="checkbox" />
							<div className="termsCheckmark"></div>
						</label>
						<p>I agree to the <Link to={"/register?terms=" + terms} className='termslink'>terms and conditions</Link></p>
					</div>
					<div className='RegisterButtonContainer'>
						<div className='RegisterButton' onClick={handleRegisterButtonClick}>
							Register
						</div>
					</div>
				</div>
				{errorMessage && <p className='errorMessage'>{errorMessage}</p>}
			</div>
		</div>
	);

}

function isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegex.test(email);
}

export default RegisterPage;