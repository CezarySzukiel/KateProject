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
        // console.log('props.allExercises', allExercises)
    }, [selectedSubsectionIds]);

    const getExercises = async () => {
        // console.log("getExercises")
        // console.log('selectedSubsectionIds: ', selectedSubsectionIds) 
        const searchUrl = `${SEARCH_URL}?subsection_ids=${selectedSubsectionIds.join(',')}`
        try {
            const response = await axios.get(searchUrl, {
                subsection_ids: selectedSubsectionIds,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            // console.log('response: ', response)
            return {'data': response.data.results, 'next': response.data.next}
          } catch (error) {
            console.error(error);
            throw error;
          }
        }

    const setExercises = async () => { 
        // console.log("setExercises")
        const data = await getExercises()
        setAllExercises(data.data)
        setNextPageUrl(data.next)
    }

    const handleNextPage = async () => {
        // console.log("handleNextPage")
        // console.log('nextPageUrl: ', nextPageUrl)
        if (nextPageUrl) {
            const nextPageUrl_ = `${nextPageUrl}&subsection_ids=${selectedSubsectionIds.join(',')}`
            console.log("I jest nextpage")
            try {
                const response = await axios.get(nextPageUrl_, {
                subsection_ids: selectedSubsectionIds,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                // console.log("response: ", response.data.results)
                const data = response.data;
                // console.log(data)
                setAllExercises([...allExercises, ...data.results]);
                setNextPageUrl(data.next);
                // console.log('allExercises: ', allExercises)
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

// todo case gdy user zaznaczy sekcję ma wyszukać wszystkie wyświetlone subsekcje
// todo poprawić obsługę pojedynczego zadania
// todo sprawdzić czy działa paginacja na sections i subsections
//  todo usunąć wszystkie consolelogi

// todo sprawdzić dlaczego są 2 zapytania done
// todo paginacja i obsługa dodawania nextpage {"subsection_ids":null} done
// todo na backendzie obsłuzyć przypadek, gdy wyśle się w zapytaniu pustą listę lub coś innego done
// todo posprzątać: wywalić widok listyzadań z backendu (s-exercises), wywalić actual subsection stan done
// todo podwójne zapytania przy sections done
// todo podwójne zapytanie przy subsectons done
// todo case gdy użytkownik jest już na stronie z zadaniami i chce wyszukać jeszcze raz done