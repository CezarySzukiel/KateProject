import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';  

import { Error, Info } from "../helpersComponents/Messages"

export function Login(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [passwordResetInfo, setPasswordResetInfo] = useState(null);
    const navigate = useNavigate();

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
            const response = await axios.post('http://0.0.0.0:8000/api/v1/auth/login/', {
            username,
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.status == 200) {
                const data = response.data;
                const token = data.access;
                props.setAccessToken(token);
                props.loginSuccess();
                getRefreshToken();
                setPassword('')                
                navigate("/");
            }
        } catch (error) {
            if (error.response.status == 500) {
                setLoginError("Nie ma takiego użytkownika")
                setPasswordResetInfo(null)
            } else {
                setLoginError("Nieprawidłowy login lub hasło");

                console.error('error:', error.response.status);
            }
        }
    };

    const getRefreshToken = async () => {
        try {
            const response = await axios.post('http://0.0.0.0:8000/api/v1/token/', {
            username,
            password,
            }, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.status == 200) {
                const data = response.data;
                const accessToken = data.access;
                const refreshToken = data.refresh;
                props.setAccessToken(accessToken);
                props.setRefreshToken(refreshToken);
            } else {
                console.error("refresh token getting error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordReset = async () => {
        try {
            const response = await axios.post('http://0.0.0.0:8000/api/v1/auth/password/reset/', {
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('wysłałem maila')

            if (response.status == 200) {
                setPasswordResetInfo(`Wysłano email weryfikacyjny na adres ${email}`)
                setLoginError(null)
            }
        } catch (error) {
            setLoginError('Wprowadzony adres e-mail nie pasuje do żadnego konta. Spróbuj ponownie lub utwórz konto.')
            setPasswordResetInfo(null)
            console.error(error);
        }

    }

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
                <button type="submit">Zaloguj</button>
            </form>
            {loginError && <Error message={loginError}/>}
            {passwordResetInfo && <Info message={passwordResetInfo}/>}
            <p className={'link'} onClick={handlePasswordReset}> Nie pamiętasz hasła?</p>
            <p>lub</p>
            <Link to={`/register`}><button>utwórz nowe konto</button></Link>

        </div>
    );
}

// todo poprawić efekty klikania w 'nie pamietasz hasła?'