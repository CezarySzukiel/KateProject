import './exercisesList.css'
import checkbox from '../../assets/check.png';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

import React from 'react';
import { Link } from 'react-router-dom';

export function ExercisesList(props) {
    const {exercises, handleLinkClick, nextPageUrl, handleNextPage, solvedExercisesIds, isLoggedIn, } = props
    return (
        <div>
            <h2>Lista zadań</h2>
            <ul>
                {exercises.map(exercise => (
                    <div className={'li'} key={exercise.id}>
                        <li onClick={() => handleLinkClick(exercise)}>
                            <Link to={`/exercises/details/`} >
                                <h3>id: {exercise.id}, {exercise.title}</h3>
                                <Latex>{exercise.description}</Latex>
                            </Link>
                        </li>
                        {isLoggedIn && <div className={'img'}>
                            {solvedExercisesIds ? (solvedExercisesIds.includes(exercise.id) ? <img src={checkbox} /> : null) : null}
                        </div>}
                    </div>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleNextPage}>Więcej</button>}
        </div>
    );
}
