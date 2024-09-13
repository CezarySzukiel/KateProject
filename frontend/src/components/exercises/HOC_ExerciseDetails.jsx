import './hocExerciseDetails.css'
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {ConAnswerInput} from '../../containers/Ex'
import {Info, Error} from '../helpersComponents/Messages';
import {ExerciseDetailsTop} from './ExerciseDetailsTop';
import {ExerciseDetailsBottom} from './ExerciseDetailsBottom';
import {Chart} from './Chart'
import {LatexTable} from './LatexTable'
import {ExerciseDetailsMiddle} from './ExerciseDetailsMiddle'

export function HOC_ExerciseDetails(props) {
    const {
        actualExercise, setActualExercise,
        actualSection, setActualSection,
        actualSubsection, setActualSubsection,
        solvedExercises, pushSolvedExercise,
        allSubsections,
        allSections,
        setActiveInput, activeInputRef,
        setUserAnswer,
    } = props

    const [solvedExercisesIds, setSolvedExercisesIds] = useState(null);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const isInitialMount = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            fetchExerciseData(actualExercise.id)
        } else {
            isInitialMount.current = true;
        }
    }, []);

    useEffect(() => {
        if (solvedExercises) {
            setSolvedExercisesIds(solvedExercises.map(exercise => exercise.id))
        }
    }, [solvedExercises])

    useEffect(() => {
        if (actualExercise.subsection) {
            setActualSubsection(allSubsections.filter((subsec) => subsec.id === actualExercise.subsection))
        }
    }, [actualExercise])

    useEffect(() => {
        if (actualSubsection) {
            setActualSection(allSections.filter((section) => section.id === actualSubsection[0].section)[0])
        }
    }, [actualSubsection])

    const fetchExerciseData = async (id) => {
        try {
            const response = await axios.get(`http://0.0.0.0:8000/api/v1/exercises/exercise/detail/${id}/`)
            setActualExercise(response.data);
            setCorrectAnswer(response.data.answers.filter(answer => answer.correct));
            setUserAnswer(null)
        } catch (error) {
            console.error('Error fetching exercise data:', error);
        }
    };

    const handleNextExercise = () => {
        setSuccessMessage(null)
        setErrorMessage(null)
        const nextId = actualExercise.id + 1;
        fetchExerciseData(nextId)
    }

    const handlePrevExercise = () => {
        setSuccessMessage(null)
        setErrorMessage(null)
        const prevId = actualExercise.id - 1;
        fetchExerciseData(prevId)
    }


    if (!actualExercise || !correctAnswer) {
        return <div>Loading...</div>;
    }
    return (
        <div className={"exercise-details-container"}>
            {actualExercise && correctAnswer && (
                <>
                    <ExerciseDetailsTop
                        title={actualExercise.title}
                        advanced_level={actualExercise.advanced_level}
                        actualSection={actualSection.name}
                        actualSubsection={actualSubsection}
                        exam={actualExercise.exam}
                        points={actualExercise.points}
                        difficult={actualExercise.difficult}
                        nextExercise={handleNextExercise}
                        prevExercise={handlePrevExercise}
                    />
                    {actualExercise.functions.length > 0 &&
                        actualExercise.functions.map((func) => (
                            !func.answer && (
                                <Chart
                                    key={func.id}
                                    data={func}
                                />)
                        ))
                    }
                    <ExerciseDetailsMiddle
                        actualExercise={actualExercise}>

                    </ExerciseDetailsMiddle>


                    <ConAnswerInput
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage={setErrorMessage}
                    />

                    <ExerciseDetailsBottom
                        solution_exactly={actualExercise.solution_exactly}
                        correctAnswer={correctAnswer}
                        actualExercise={actualExercise}
                    />
                </>
            )}

            {isLoggedIn &&
                <>
                    {!successMessage && solvedExercisesIds ? (solvedExercisesIds.includes(actualExercise.id) ?
                        <Info message={'To zadanie zostało już przez Ciebie rozwiązane.'}/> : null) : null}
                </>
            }
            {successMessage && <Info message={successMessage}/>}
            {errorMessage && <Error message={errorMessage}/>}
            {actualExercise.type === 9 && <LatexTable
                setActiveInput={setActiveInput}
                activeInputRef={activeInputRef}
                setUserAnswer={setUserAnswer}
            />}
        </div>
    );
}
