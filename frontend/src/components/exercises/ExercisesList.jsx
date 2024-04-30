import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";


export function ExercisesList(props) {
    const subsec = props.actualSubsection.id
    const EXERCISES_URL = `http://0.0.0.0:8000/api/v1/exercises/s-exercises/${subsec}/`
    const [exercises, setExercises] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    
    useEffect(() => {
        fetchExercises();
        return () => setExercises([]);
    }, []);

    const fetchExercises = async () => {
            try {
                const response = await fetch(EXERCISES_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (exercises.length === 0) {
                    setExercises(data.results);
                } else {
                    setExercises(prevExercises => [...prevExercises, ...data.results]);
                }
                
                setNextPageUrl(data.next);

            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

    const handleNextPage = async () => {
        if (nextPageUrl) {
            try {
                const response = await fetch(nextPageUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExercises(prevExercises => [...prevExercises, ...data.results]);
                setNextPageUrl(data.next);
            } catch (error) {
                console.error('Error fetching next page of exercises:', error);
            }
        }
    };

    const handleLinkClick = (exercise) => {
        props.setActualExercise(exercise)
    }

    return (
        <div>
            <h2>Lista zadań</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                        <Link to={`details/`} >
                            <h3 onClick={() => handleLinkClick(exercise)}>id: {exercise.id}, {exercise.title}</h3>
                            <p>{exercise.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleNextPage}>Więcej</button>}
        </div>
    );
}

