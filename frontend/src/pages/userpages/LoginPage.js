import { useEffect, useState } from 'react';
import './css/LoginPage.css';
import axios from "axios";

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
		localStorage.clear();
	});

	return (
		<div className="login-page">
			<div className='login-container'>
                <div className='header-text'>
                    <h1>Welcome Back!</h1>
                    <div className='paragraph'>
                        <p>Enter your credentials to login.</p>
                    </div>
                   
                </div>
                
                <div className='login-form'>
                    <div className='login-input'>
                        <p>Email</p>
                        <div className='email-input'>
                            <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
                        </div>
                        <p>Password</p>
                        <div className='password-input'>
                            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                        </div>
                        
                        <div onClick={onLoginButtonClick} className='login-button'>
                            Login
                        </div>
                    </div>


                </div>
                
			</div>

		</div>
	);
}

export default LoginPage;