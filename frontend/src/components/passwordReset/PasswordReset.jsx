import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Error, Info } from "../helpersComponents/Messages"  


export function PasswordReset(props) {
	const { uid, token } = useParams();
	const [newPassword1, setNewPassword1] = useState('');
  	const [newPassword2, setNewPassword2] = useState('');
  	const [error, setError] = useState(null);
  	const [success, setSuccess] = useState(null);

  	const handleSubmit = async (e) => {
    	e.preventDefault();

	    if (newPassword1 !== newPassword2) {
	      setError('Hasła nie są takie same');
	      return;
	    }

		try {
	      	const response = await axios.post('http://0.0.0.0:8000/api/v1/auth/password/reset/confirm/', {
	        	token: token,
	        	uid: uid,
	        	new_password1: newPassword1,
	        	new_password2: newPassword2
	      	});
	      	setSuccess("Hasło zmienione pomyślnie");
	      	setError(null);
	    } catch (error) {
	    		console.error(error)
	      	setError('Wystąpił błąd podczas zmiany hasła');
	    }
	 };    

	return (
    <div>
      <h1>Resetowanie hasła</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nowe hasło:</label>
          <input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
        </div>
        <div>
          <label>Powtórz nowe hasło:</label>
          <input type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
        </div>
        <button type="submit">Potwierdź</button>
      </form>
      {error && <Error message={error} />}
      {success && <Info message={success} />}
    </div>
  );
}
