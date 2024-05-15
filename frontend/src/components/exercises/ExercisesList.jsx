import './exercisesList.css'
import checkbox from '../../assets/check.png';

import React from 'react';
import { Link } from 'react-router-dom';

export function ExercisesList(props) {
    const {exercises, handleLinkClick, nextPageUrl, handleNextPage, solvedExercisesIds, } = props
    return (
        <div>
            <h2>Lista zadań</h2>
            <ul>
                {exercises.map(exercise => (
                    <div className={'li'}>
                        <li onClick={() => handleLinkClick(exercise)} key={exercise.id}>
                            <Link to={`/exercises/details/`} >
                                <h3>id: {exercise.id}, {exercise.title}</h3>
                                <p>{exercise.description}</p>
                            </Link>
                        </li>
                        <div className={'img'}>
                            {solvedExercisesIds ? (solvedExercisesIds.includes(exercise.id) ? <img src={checkbox} /> : null) : null}
                        </div>
                    </div>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleNextPage}>Więcej</button>}
        </div>
    );
}
