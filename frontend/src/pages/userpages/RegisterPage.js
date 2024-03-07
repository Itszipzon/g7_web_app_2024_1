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

	useEffect(() => {
		window.scrollTo({top: 0, behavior: "smooth"});
	}, [errorMessage])

	return (
		<div className='RegisterPage' id='RegisterPage'>
			<div className='registerContainer'>
				<h1>Register.</h1>
				<p color='red' id='errorMessage'>{errorMessage && 
				errorMessage}</p>
				<div className='registerForm' onSubmit={handleRegisterButtonClick}>
					<div className='fullInput'>
						<label>Full Name</label>
						<input type='text' onChange={handleNameChange} value={name}/>
					</div>
					<div className='fullInput'>
						<label>Email Address</label>
						<input type='text' onChange={handleEmailChange} value={email}/>
					</div>
					<div className='halfInput'>
						<div>
							<label>Password</label>
							<input type='password' onChange={handlePasswordChange} value={password}/>
						</div>
						<div>
							<label>Repeat Password</label>
							<input type='password' onChange={handleRepeatPasswordChange} value={repeatPassword}/>
						</div>
					</div>
					<div className='fullInput'>
						<label>Country</label>
						<select onChange={handleCountryChange} value={country}>
							<option value="Switzerland">Switzerland</option>
							<option value="Denmark">Denmark</option>
							<option value="Sweden">Sweden</option>
							<option value="Norway">Norway</option>
							<option value="Finland">Finland</option>
						</select>
					</div>
					<div className='fullInput'>
						<label>Address</label>
						<input type='text' onChange={handleAddressChange} value={address}/>
					</div>
					<div className='halfInput'>
						<div>
							<label>Postal Code</label>
							<input type='text' onChange={handlePostalCodeChange} value={postalCode}/>
						</div>
						<div>
							<label>City</label>
							<input type='text' onChange={handleCityChange} value={city}/>
						</div>
					</div>
					<div className='fullInput' >
						<label>Phone Number</label>
						<div className='phoneDiv'>
							<select onChange={handleCountryCodeChange} value={countryCode}>
								<option value={"+41"}>+41</option>
								<option value={"+45"}>+45</option>
								<option value={"+46"}>+46</option>
								<option value={"+47"}>+47</option>
								<option value={"+358"}>+358</option>
							</select>
							<input type='text' onChange={handlePhoneNumberChange} value={phoneNumber} />
						</div>
					</div>
					<div className='termsContainer'>
						<label className="termsContainerRegister">
							<input onChange={handleTermChange} value={terms} type="checkbox" />
							<div className="termsCheckmark"></div>
						</label>
						<p>I agree to the <Link to={"/register?terms=" + terms} className='termslink'>terms and conditions</Link></p>
					</div>
					<div className='buttonDiv'>
						<button onClick={handleRegisterButtonClick}>Sign Up</button>
					</div>
				</div>
			</div>
		</div>
	);

}

function isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegex.test(email);
}

export default RegisterPage;