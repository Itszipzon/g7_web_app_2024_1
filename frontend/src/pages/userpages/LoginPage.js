import { useEffect, useState } from 'react';
import './css/LoginPage.css';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const formData = {
		username: '',
		password: ''

	}

	const onLoginButtonClick = () => {
		formData.username = username;
		formData.password = password;
		console.log(formData);
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);

	}

	useEffect(() => {
		console.log(username);
	}, [username])

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
                            <input type="text" value={username} onChange={handleUsernameChange} placeholder="Email" />
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