import { useEffect, useState } from 'react';
import './css/LoginPage.css';
import axios from "axios";
import { Link } from 'react-router-dom';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const jsonValue = require("../../information.json");

	const formData = {
		email: '',
		password: ''

	}

	const onLoginButtonClick = () => {
		formData.email = email;
		formData.password = password;
		axios.post(jsonValue.serverAddress + "post/login/user", formData)
				.then((r) => {
					localStorage.setItem("UIDtoken", r.data);
					window.location.href = "/";
		});
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value);

	}

	useEffect(() => {
		if (localStorage.getItem("UIDtoken")) {
			axios.get(jsonValue.serverAddress + "api/get/user/name/" + localStorage.getItem("UIDtoken")).then((r) => {
				if (r.status === 200) {
					window.location.href = "/";
				} else {
					localStorage.removeItem("UIDtoken");
				}
			})
			.catch((e) => {
				localStorage.removeItem("UIDtoken");
			});
		}
	}, []);

	return (
		<div className="login-page" id= "login-page">
			<div className='login-container'>
                <h1>Welcome Back!</h1>
				<p>Enter your credentials to login</p>
                
                <div className='login-form'>

					<div className='fullInput'>
						<label>Email Address</label>
						<input type='text' onChange={handleEmailChange} value={email}/>
					</div>
					<div className='fullInput'>
						<label>Password</label>
						<input type='password' onChange={handlePasswordChange} value={password}/>
					</div>

					
					<div className='login-button'>
						<button onClick={onLoginButtonClick}>Login</button>

					</div>
					<div className='signup-text'>
						<p>Don't have an account? <Link to={"/register"} className='signup-link'>Sign Up</Link></p>

					</div>

                </div>
                
			</div>

		</div>
	);
}

export default LoginPage;