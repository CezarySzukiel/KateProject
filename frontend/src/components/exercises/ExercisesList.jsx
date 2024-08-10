import './exercisesList.css'
import checkbox from '../../assets/check.png';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

import React from 'react';
import { Link } from 'react-router-dom';

export function ExercisesList(props) {
    const {exercises, handleLinkClick, nextPageUrl, handleNextPage, solvedExercisesIds, isLoggedIn, actualSection, actualSubsection } = props
    return (
        <div>
            {actualSection && actualSubsection && <h2>{actualSection.name} - {actualSubsection[0].name}</h2>}
            {exercises.length === 0 && <h3>Brak zadań</h3>}
            <ul>
                {exercises.map(exercise => (
                    <div onClick={() => handleLinkClick(exercise)} className={'li'} key={exercise.id}>
                        <li>
                            <Link to={`/exercises/details/`} >
                                <h3>{exercise.title}</h3>
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
