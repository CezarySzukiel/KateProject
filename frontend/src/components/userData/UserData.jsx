import { useEffect, useState } from 'react';


export function UserData(props) {
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        getuserData()
    }, [])

    const getuserData = async () => {
        try {
            console.log("token: ",props.loginToken)
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
                console.log('something is no yes')
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    }
    
    

	return (
    	<div className={'userDataContainer'}>
        	<h1>UserSettings</h1>
            {userData && 
                <>
                <h3>username: {userData.username}</h3>
                <h3>email: {userData.email}</h3>
                {userData.first_name && <h3>imię: {userData.first_name}</h3>}
                {userData.last_name && <h3>nazwisko: {userData.last_name}</h3>}
                </>
            }
        </div>
    );
}