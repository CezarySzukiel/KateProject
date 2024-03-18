import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginSuccess, setLoginToken } from '../../actions/authActions';
import { Error } from "../error/Error.jsx"

export function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log("zalogowano");
                const data = await response.json();
                const token = data.key;
                props.setLoginToken(token);
                props.loginSuccess();
                navigate("/")    
            } else {
                setLoginError(true);
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    return (
        <div className={'LoginContainer'}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Login: 
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Hasło: 
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <button type="submit">Log in</button>
            </form>
            {loginError && <Error message={"Nieprawidłowy login lub hasło"}/>}
        </div>
    );
}

