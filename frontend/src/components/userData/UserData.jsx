import { useEffect } from 'react';

export function UserData(props) {

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async (event) => {
        try {
            console.log("token: ",props.loginToken)
            const response = await fetch('http://0.0.0.0:8000/api/v1/auth/user/', {
                method: 'GET',
                headers: {
                    'Authorization': props.loginToken
                },
                  // todo set authorization propertly              
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log("dane: ",data);   
            } else {
                console.log('something is no yes')
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

	return (
    	<div className={'userDataContainer'}>
        	<h1>UserSettings</h1>
        </div>
    );
}