import { useEffect, useState, } from 'react';
import axios from 'axios';

import { UserData } from './UserData'
import { ExercisesList } from '../exercises/ExercisesList'
import {setSolvedExercises} from "../../actions/exActions.jsx";

export function HOC_UserData(props) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formVisibility, setFormVisibility] = useState(false);
    const [formData, setFormData] = useState({});
    const [exercisesVisibility, setExercisesVisibility] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [areSolvedExercises, setAreSolvedExercises] = useState(false)    

    useEffect(() => {
        getUserData()
    }, [props.accessToken, formVisibility])

    useEffect(() => {
        if (!props.solvedExercises) {
            setAreSolvedExercises(false)
        } else {
            setAreSolvedExercises(true)
        }
    }, [props.solvedExercises])

    const getUserData = async () => {
        try {
            const response = await axios.get('http://0.0.0.0:8000/api/v1/auth/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.accessToken}`,
            },
            });
            if (response.status === 200) {
                setUserData(response.data);
                if (!response.data.exercises) {
                    dispatch(setSolvedExercises([]))
                } else {
                    dispatch(setSolvedExercises(response.data.exercises))
                }
                return response.data
            } 
        } catch (error) {
            if (error.response.status === 401) {
                const tokens = await props.getTokens(props.refreshToken)
                props.setAccessToken(tokens.access);
                props.setRefreshToken(tokens.refresh);
            } else {
                console.error('error:', error.response.status, error.response.statusText);
            }
        }
    };

    const validator = (data) => {
        for (const key in data) {
            if (data[key] === '' || data[key].trim() === '') {
                delete data[key];
            }
        }
        if (data.hasOwnProperty('username') && data.username === userData.username) {
            delete data['username'];
        }
        return data
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = validator(formData);
        if (data && Object.keys(data).length > 0) {
            try {
                const response = await axios.patch('http://0.0.0.0:8000/api/v1/auth/user/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setFormVisibility(false);
                    setError(false);
                    setSuccess('Dane użytkownika zostały zaktualizowane.');
                }
            } catch (error) {
                console.error(error);
                if (error.response.status === 400) {
                    setSuccess(null);
                    setError('użytkownik z taką nazwą już istnieje.');
                } else if (error.response.status === 401) {
                    const tokens = await props.getTokens(props.refreshToken);
                    props.setAccessToken(tokens.access);
                    props.setRefreshToken(tokens.refresh);
                } else {
                    setSuccess(false);
                    setError('Wystąpił błąd podczas aktualizacji danych użytkownika.');
                }
            }
        } else {
            setSuccess(false);
            setError('Nie wprowadzono zmian');
        };
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeDataClick = () => {
        setFormVisibility(!formVisibility);
        setError(false);
        setSuccess(false);
    };

    const handleLinkClick = (exercise) => {
        setActualExercise(exercise);
    };

    const handleExercisesDisplay = () => {
        setExercisesVisibility(!exercisesVisibility);
    };

    return (
        <>
            <UserData 
                userData={userData}
                formData={formData}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleChangeDataClick={handleChangeDataClick}
                handleExercisesDisplay={handleExercisesDisplay}
                formVisibility={formVisibility}
                exercisesVisibility={exercisesVisibility}
                success={success}
                error={error}
                areSolvedExercises={areSolvedExercises}
            />
            {exercisesVisibility && props.solvedExercises && 
            <ExercisesList 
                exercises={props.solvedExercises}
                nextPageUrl={nextPageUrl}
                handleNextPage={handleNextPage}
                handleLinkClick={handleLinkClick}
            />}
        </>
    )
}