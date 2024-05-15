import React from 'react';
import { Link } from 'react-router-dom';

export function ExercisesList(props) {
    const {exercises, handleLinkClick, nextPageUrl, handleNextPage} = props
    return (
        <div>
            <h2>Lista zadań</h2>
            <ul>
                {exercises.map(exercise => (
                    <li onClick={() => handleLinkClick(exercise)} key={exercise.id}>
                        <Link to={`details/`} >
                            <h3>id: {exercise.id}, {exercise.title}</h3>
                            <p>{exercise.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleNextPage}>Więcej</button>}
        </div>
    );
}
