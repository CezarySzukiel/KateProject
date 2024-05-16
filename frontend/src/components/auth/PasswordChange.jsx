import React, { useState } from 'react';
import axios from 'axios';

import { Error, Info } from "../helpersComponents/Messages" 


export function PasswordChange(props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword1.length < 8) {
    	setSuccess(null)
      	setError('Nowe hasło jest za krótkie');
      	return;
    } else if (newPassword1 !== newPassword2) {
    	setSuccess(null)
      	setError('Nowe hasła nie pasują do siebie');
      	return;
    } else {

	    try {
	      const response = await axios.post(
	        'http://0.0.0.0:8000/api/v1/auth/password/change/',
	        {
	          new_password1: newPassword1,
	          new_password2: newPassword2,
	          old_password: oldPassword
	        },
	        {
	          headers: {
	            Authorization: `Bearer ${props.accessToken}`
	          }
	        }
	      );
	      setError(null);
	      setSuccess('Hasło zostało pomyślnie zmienione!');
	    } catch (error) {
	    	if (error.response.status == 401) {
	        const tokens = await props.getTokens(props.refreshToken)
          props.setAccessToken(tokens.access);
          props.setRefreshToken(tokens.refresh);
	      } else {
	        console.error('error:', error.response.status, error.response.statusText);
	      }
	      console.error(error)
	      setSuccess(null)
	      setError('Wystąpił błąd podczas zmiany hasła');
    }}
  };

  return (
    <div>
      <h1>Zmiana hasła</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stare hasło:</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div>
          <label>Nowe hasło:</label>
          <input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
        </div>
        <div>
          <label>Powtórz nowe hasło:</label>
          <input type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
        </div>
        <button type="submit">Zmień hasło</button>
      </form>
      {error && <Error message={error} />}
      {success && <Info message={success} />}
    </div>
  );
}
