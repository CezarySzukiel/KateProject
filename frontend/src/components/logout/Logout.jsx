import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutSuccess, deleteLoginToken } from '../../actions/authActions';


export function Logout(props) {
	const [loggedOut, setLoggedOut] = useState(false)
	const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const loginToken = useSelector(state => state.loginToken)

	useEffect(() => {
		handleLogout()
	}, [])

	const handleLogout = async () => {
        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/auth/logout/', {
                method: 'POST',
                headers: {
                	'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                }),
            });
            
            if (response.ok) {
                dispatch(logoutSuccess());
                setLoggedOut(true);
                dispatch(deleteLoginToken());       
            } else {
    	        console.error("logout error");
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

	return (
		<>
			{!props.isLoggedIn && <h1>Wylogowano</h1>}
		</>
	)
}