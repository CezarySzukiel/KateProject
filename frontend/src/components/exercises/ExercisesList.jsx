import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


export function ExercisesList(props) {
    const { selectedSubsectionIds, allExercises, setAllExercises, setActualExercise } = props;
    const SEARCH_URL = 'http://0.0.0.0:8000/api/v1/exercises/search-by-subsections/'
    const isInitialMount = useRef(false)
    const [nextPageUrl, setNextPageUrl] = useState(null);

    useEffect(() => {
        if (isInitialMount.current) {
            setExercises();
        }
        else {
            isInitialMount.current = true;
        }
    }, [selectedSubsectionIds]);

    const getExercises = async () => {
        const searchUrl = `${SEARCH_URL}?subsection_ids=${selectedSubsectionIds.join(',')}`
        try {
            const response = await axios.get(searchUrl, {
                subsection_ids: selectedSubsectionIds,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return {'data': response.data.results, 'next': response.data.next}
          } catch (error) {
            console.error(error);
            throw error;
          }
        }

    const setExercises = async () => { 
        const data = await getExercises()
        setAllExercises(data.data)
        setNextPageUrl(data.next)
    }

    const handleNextPage = async () => {
        if (nextPageUrl) {
            const nextPageUrl_ = `${nextPageUrl}&subsection_ids=${selectedSubsectionIds.join(',')}`
            try {
                const response = await axios.get(nextPageUrl_, {
                subsection_ids: selectedSubsectionIds,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                const data = response.data;
                setAllExercises([...allExercises, ...data.results]);
                setNextPageUrl(data.next);
            } catch (error) {
                console.error('Error fetching next page of exercises:', error);
            }
        }
    };

    const handleLinkClick = (exercise) => {
        setActualExercise(exercise)
    }

    return (
        <div>
            <h2>Lista zadań</h2>
            <ul>
                {allExercises && allExercises.map(exercise => (
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
