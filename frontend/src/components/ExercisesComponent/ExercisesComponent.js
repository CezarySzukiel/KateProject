import React, { useEffect, useState } from 'react';
import { EXERCISES_URL } from '../.././config';

function ExercisesComponent() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(EXERCISES_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExercises(data.results);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();

        // Wyczyść efekt, aby uniknąć wycieków pamięci
        return () => setExercises([]);
    }, []);

    return (
        <div>
            <h2>Lista ćwiczeń</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                        <h3>{exercise.title}</h3>
                        <p>{exercise.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExercisesComponent;
