import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { ExercisesList } from './ExercisesList'

export function HOC_ExercisesList(props) {
    const { selectedSubsectionIds, allExercises, setAllExercises, setActualExercise, solvedExercises } = props;
    const SEARCH_URL = 'http://0.0.0.0:8000/api/v1/exercises/search-by-subsections/'
    const isInitialMount = useRef(false)
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [solvedExercisesIds, setSolvedExercisesIds] = useState(null)

    useEffect(() => {
        if (isInitialMount.current) {
            setExercises();
        }
        else {
            isInitialMount.current = true;
        }
    }, [selectedSubsectionIds,]);

    useEffect(() => {
        setSolvedExercisesIds(solvedExercises.map(exercise => exercise.id))
    }, [solvedExercises])

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
        <>
            {allExercises && 
                <ExercisesList 
                    exercises={allExercises}
                    nextPageUrl={nextPageUrl}
                    handleNextPage={handleNextPage}
                    handleLinkClick={handleLinkClick}
                    solvedExercisesIds={solvedExercisesIds}
                />
            }
        </>   
    )
}