import { useEffect, useState } from 'react';


export function UserData(props) {
    const [userData, setUserData] = useState(null);
    const [serverErr, setServerErr] = useState(null);
    
    useEffect(() => {
        getuserData()
    }, [])

    const getuserData = async () => {
        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/auth/user/', {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.loginToken}`,
                },            
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data) 
            } else {
                setServerErr(`${response.status} ${response.statusText}`)
                console.log('server error', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
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
                </>
            }
            {serverErr && <h3>{serverErr}</h3>}
        </div>
    );
}