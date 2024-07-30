import './login.css'
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
    const [working, setWorking] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setWorking(true)
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
                setWorking(false);
                
            } else {
                const data = await response.json();
                if (response.status === 400) {
                    setWorking(false);
                    setError(Object.values(data)[0]);
                } else {
                    setWorking(false);
                    setError('Unexpected error occurred.');
                }
            }
        } catch (error) {
            console.error('error:', error);
            setWorking(false);
            setError('Wystąpił błąd podczas rejestracji.');
        }
    };

    return (
        <div className={'login-container'}>
            {!info && 
            <>
                <h1>Rejestracja</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password1">Hasło</label>
                    <input type="password" id="password1" name="password1" value={formData.password1} onChange={handleChange} required />
                    <label htmlFor="password2">Powtórz hasło</label>
                    <input type="password" id="password2" name="password2" value={formData.password2} onChange={handleChange} required />
                    <button type="submit">Zarejestruj</button>
                </form>
                {error && <Error message={error}/>}
            </>}
            {working && 'working...'}
            {info && <Info message={`wysłano email weryfikacyjny na adres ${formData.email}`} />}
        </div>
    );
}
