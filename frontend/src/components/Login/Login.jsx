import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginSuccess, setLoginToken } from '../../actions/authActions';
import { Error } from "../error/Error.jsx"

export function Login(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

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
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                console.log("zalogowano");
                const data = await response.json();
                const token = data.access;
                console.log(token)
                dispatch(setLoginToken(token));
                dispatch(loginSuccess());
                navigate("/")    
            } else {
                setLoginError(true);
                const data = await response.json();
                console.log('nieprawda')
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    return (
        <div className={'LoginContainer'}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">
                    Login: 
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label htmlFor="email">
                    Email: 
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label htmlFor="password">
                    Hasło: 
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <button type="submit">Log in</button>
            </form>
            {loginError && <Error message={"Nieprawidłowy login lub hasło"}/>}
        </div>
    );
}

