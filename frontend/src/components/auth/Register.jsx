import React, { useState } from 'react';

import { Error, Info } from './../helpersComponents/Messages'

export function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [info, setInfo] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://0.0.0.0:8000/api/v1/auth/registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setInfo(data.detail[0]);
                
            } else {
                const data = await response.json();
                if (response.status === 400) {
                    setError(Object.values(data)[0]);
                } else {
                    setError('Unexpected error occurred.');
                }
            }
        } catch (error) {
            console.error('error:', error);
            setError('Wystąpił błąd podczas rejestracji.');
        }
    };

    return (
        <div className={'registerFormContainer'}>
            {!info && 
            <>
                <h1>Zarejestruj</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    <br />
                    <label htmlFor="password1">Password:</label>
                    <input type="password" id="password1" name="password1" value={formData.password1} onChange={handleChange} required />
                    <br />
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" id="password2" name="password2" value={formData.password2} onChange={handleChange} required />
                    <br />
                    <button type="submit">Register</button>
                </form>
                {error && <Error message={error}/>}
            </>}
            {info && <Info message={`wysłano email weryfikacyjny na adres ${formData.email}`} />}
        </div>
    );
}
