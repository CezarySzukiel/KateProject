import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { refreshToken } from '../../helpers'

export function UserData(props) {
    const [userData, setUserData] = useState(null);
    const [serverErr, setServerErr] = useState(null);
    
    useEffect(() => {
        getUserData()
    }, [props.accessToken])

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
                try {
                    const newTokens = await refreshToken(props.refreshToken)
                    props.setAccessToken(newTokens.access);
                    props.setRefreshToken(newTokens.refresh);
                } catch (error) {
                    console.error('error:', error.response.status, error.response.statusText);
                }
            } else {
                console.error('error:', error.response.status, error.response.statusText);
            }
        }
    };
    
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
                </>
            }
            {serverErr && <h3>{serverErr}</h3>}
        </div>
    );
}