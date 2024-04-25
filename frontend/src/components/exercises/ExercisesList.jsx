import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";


export function ExercisesList(props) {
    const EXERCISES_URL = 'http://0.0.0.0:8000/api/v1/exercises/list/'
    const [exercises, setExercises] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    
    useEffect(() => {
        console.log("useEffect")
        console.log(props)

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
        fetchExercises();
        return () => setExercises([]);
    }, []);

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
        console.log("navi")
        props.setActualExercise(exercise)
    }

    return (
        <div>
            <h2>Lista zadań</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                        <Link to={`/exercise-details/`} >
                            <h3 onClick={() => handleLinkClick(exercise)}>id: {exercise.id}, {exercise.title}</h3>
                            <p>{exercise.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handleNextPage}>Więcej</button>
        </div>
    );
}

