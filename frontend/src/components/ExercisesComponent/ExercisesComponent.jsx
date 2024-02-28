import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';


export function ExercisesComponent() {
    const EXERCISES_URL = 'http://0.0.0.0:8000/api/v1/exercises/'
    const [exercises, setExercises] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(EXERCISES_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setExercises(prevExercises => [...prevExercises, ...data.results]);

                setNextPageUrl(data.next);

            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();

        // Wyczyść efekt, aby uniknąć wycieków pamięci
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
                setExercises(data.results);
                setNextPageUrl(data.next); // Ustaw adres do kolejnej strony
            } catch (error) {
                console.error('Error fetching next page of exercises:', error);
            }
        }
    };

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
            <Button variant="contained" size="small" onClick={handleNextPage}>Więcej</Button>
        </div>
    );
}
