import './userData.css'
import { Link } from 'react-router-dom';

import { Error, Info } from "../helpersComponents/Messages"

export function UserData(props) {
    const {
        userData, 
        formVisibility, 
        exercisesVisibility,
        handleSubmit, 
        handleChangeDataClick, 
        handleExercisesDisplay,
        handleChange, 
        success, 
        error, 
        formData, 
        areSolvedExercises,
    } = props

	return (
    	<div className={'userDataContainer'}>
            {userData && 
                <>
                <h1>{userData.username}</h1>
                <h3>username: {userData.username}</h3>
                <h3>email: {userData.email}</h3>
                {userData.first_name && <h3>imię: {userData.first_name}</h3>}
                {userData.last_name && <h3>nazwisko: {userData.last_name}</h3>}
                {userData.level && <h3>Poziom rozszerzony</h3>}
                {userData.points && <h3>Zebrane punkty: {userData.points}</h3>}

                <Link to={`/password-change/`}><button>Zmień hasło</button></Link>
                <button onClick={handleChangeDataClick}>Zmień dane</button>
                {!exercisesVisibility && <button onClick={handleExercisesDisplay}>Pokaż rozwiązane zadania</button>}
                {exercisesVisibility && <button onClick={handleExercisesDisplay}>Ukryj rozwiązane zadania</button>}
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
            {exercisesVisibility && !areSolvedExercises && <h3>Nie rozwiązano jeszcze żadnych zadań</h3>}
            </div>
        </div>
    );
}
