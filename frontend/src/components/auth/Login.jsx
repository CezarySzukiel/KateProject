import './login.css'
import { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';  
import { useDispatch } from 'react-redux';
import { setSolvedExercises } from '../../actions/exActions'
import { Error, Info } from "../helpersComponents/Messages"
import {setNavbarDisplay} from "../../actions/layoutActions.jsx";

export function Login(props) {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [passwordResetInfo, setPasswordResetInfo] = useState(null);
    const [loginInfo, setLoginInfo] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNavbarDisplay(false))
        if (props.isLoggedIn) {
            getUserData()
        }
        if (props.isLoggedIn) {
            const uData = async () => {await getUserData()}
        }
    }, [props.isLoggedIn])

    useEffect(() => {
        if (props.userData) {
            getRefreshToken();
        }
    }, [props.userData])


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
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.status === 200) {
                const data = response.data;
                const token = data.access;
                props.setAccessToken(token);
                props.loginSuccess();
                setLoginInfo('Zalogowano')
                setTimeout(() => {
                    navigate('/home')
                }, 1500)
            }
        } catch (error) {
            if (error.response.status === 500) {
                setLoginError("Nie ma takiego użytkownika")
                setPasswordResetInfo(null)
            } else {
                setLoginError("Nieprawidłowy login lub hasło");

                console.error('error:', error.response.status);
            }
        }
    };

    const getUserData = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:8000/api/v1/auth/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.accessToken}`,
            },
            });
            if (response.status === 200) {
                setUsername(response.data.username);
                props.setUserData(response.data)
                dispatch(setSolvedExercises(response.data.exercises))
            } 
        } catch (error) {
            console.error(error)
        }
    };

    const getRefreshToken = async () => {
        try {
            const response = await axios.post('http://0.0.0.0:8000/api/v1/token/', {
            username: props.userData.username,
            password,
            }, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.status === 200) {
                const data = response.data;
                const accessToken = data.access;
                const refreshToken = data.refresh;
                props.setAccessToken(accessToken);
                props.setRefreshToken(refreshToken);
                setPassword('')                
            } else {
                setPassword('')                
                console.error("getting refresh token error");
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

            if (response.status === 200) {
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
        <div className='login-container'>
            {!loginInfo && <>
                <h1>Logowanie</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                    <label htmlFor="password">
                        Hasło
                    </label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                    <button type="submit">Zaloguj</button>
                </form>
                {loginError && <Error message={loginError}/>}
                {passwordResetInfo && <Info message={passwordResetInfo}/>}
                <p className={'link'} onClick={handlePasswordReset}> Nie pamiętasz hasła?</p>
                <p>lub</p>
                <Link to={`/register`}><button className='register-button'>utwórz nowe konto</button></Link>
            </>}
            {loginInfo && <h1>{loginInfo}</h1>}
        </div>
    );
}

// todo optimalization: there is anoter getUserData function (along with UserData component). set it once?