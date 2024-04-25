import './userData.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Error, Info } from "../helpersComponents/Messages"

export function UserData(props) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formVisibility, setFormVisibility] = useState(false);
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
        getUserData()
    }, [props.accessToken, formVisibility])

    const getUserData = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:8000/api/v1/auth/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.accessToken}`,
            },
            });
            if (response.status === 200) {
                const data = response.data;
                setUserData(data);
            } 
        } catch (error) {
            if (error.response.status == 401) {
                const tokens = await props.getTokens(props.refreshToken)
                props.setAccessToken(tokens.access);
                props.setRefreshToken(tokens.refresh);
            } else {
                console.error('error:', error.response.status, error.response.statusText);
            }
        }
    };

    const validator = (data) => {
        for (const key in data) {
            if (data[key] === '' || data[key].trim() === '') {
                delete data[key];
            }
        }
        if (data.hasOwnProperty('username') && data.username === userData.username) {
            delete data['username'];
        }
        return data
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = validator(formData)
        if (data && Object.keys(data).length > 0) {
            try {
                const response = await axios.patch('http://0.0.0.0:8000/api/v1/auth/user/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setFormVisibility(false)
                    setError(false)
                    setSuccess('Dane użytkownika zostały zaktualizowane.')
                } 
                else if (error.response.status == 401) {
                    console.log("błąd 401")
                    const tokens = await props.getTokens(props.refreshToken)
                    props.setAccessToken(tokens.access);
                    props.setRefreshToken(tokens.refresh);
                }
            } catch (error) {
                console.error(error);
                setSuccess(false)
                setError('Wystąpił błąd podczas aktualizacji danych użytkownika.');
            }
        } else {
            setSuccess(false)
            setError('Nie wprowadzono zmian')
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeDataClick = () => {
        setFormVisibility(!formVisibility);
        setError(false);
        setSuccess(false);
    }

	return (
    	<div className={'userDataContainer'}>
            {userData && 
                <>
                <h1>{userData.username}</h1>
                <h3>username: {userData.username}</h3>
                <h3>email: {userData.email}</h3>
                {userData.first_name && <h3>imię: {userData.first_name}</h3>}
                {userData.last_name && <h3>nazwisko: {userData.last_name}</h3>}
                <Link to={`/password-change/`}><button>Zmień hasło</button></Link>
                <button onClick={handleChangeDataClick}>Zmień dane</button>
                </>
            }
            {formVisibility && (
                <div className={'dataForm'}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Nazwa użytkownika:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="first_name">Imię:</label>
                            <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="last_name">Nazwisko:</label>
                            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
                        </div>
                        <button type="submit">Zapisz zmiany</button>
                    </form>
                </div>
            )}
            <div>
            {success && <Info message={success} />}
            {error && <Error message={error} />}
            </div>
        </div>
    );
}