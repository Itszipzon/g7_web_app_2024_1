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
    },[username] )

    return (
        <div className="login-page">
            <div className='login-container'>
                {/* {username && <h1>Welcome {username}</h1>} */}
                {username ? "Welcome " + username : "Please enter your name"}
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
                <input type="password"  value={password} onChange={handlePasswordChange} placeholder="Password" />
                <div onClick={onLoginButtonClick} className='login-button'>
                    login
                </div>
            </div>

        </div>
    );
}

export default LoginPage;