import './hocAnswerInput.css'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

import {Error, Info} from "../helpersComponents/Messages"
import {Type1, Type2, Type3, Type4, Type6, Type9} from './AnswerInputs'
import {pushSolvedExercise} from "../../actions/exActions.jsx";


export const HOC_AnswerInput = (props) => {
    const {
        setCorrectAnswerMessage, // todo zmienić na setSuccessMessage
        setWrongAnswerMessage, // todo zmienić na setErrorMessage
        actualExercise,
        setActiveInput,
        userAnswer,
        setUserAnswer,
        pushSolvedExercise,
    } = props
    const [error, setError] = useState(null)
    const [areSelectionsValidated, setAreSelectionsValidated] = useState(null)
    const accessToken = useSelector(state => state.auth.accessToken)
    const exerciseType = actualExercise.type
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);


    const handleAnswer = (answer) => {
        setUserAnswer(answer);
    };

    const pushExerciseToSolved = () => {
        pushSolvedExercise(actualExercise)
    }

    const nullValidator = (answer) => {
        if (
            answer === null ||
            answer === "" ||
            answer.includes(null) ||
            answer.includes("")
        ) {
            return "Wybierz odpowiedź!"
        }
        return null
    }

    const compareAnswer = async (answer) => {
        try {
            const response = await axios.post('http://0.0.0.0:8000/api/v1/exercises/compare/', {
                answers: answer,
                id: actualExercise.id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            if (response.status === 200) {
                setWrongAnswerMessage(null)
                setCorrectAnswerMessage("poprawna odpowiedź!")
                pushSolvedExercise(actualExercise)
            } else if (response.status === 208) {
                setWrongAnswerMessage(null)
                setCorrectAnswerMessage(
                    "poprawna odpowiedź! Zadanie zostało już wcześniej przez Ciebie rozwiązane."
                )
            } else if (response.status === 209) {
                setCorrectAnswerMessage(null)
                setWrongAnswerMessage("Spróbuj jeszcze raz!")
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
        }
    };

    const handleSubmit = (event) => {
        const nullValidatorResult = nullValidator(userAnswer)
        if (nullValidatorResult) {
            setWrongAnswerMessage(nullValidatorResult)
        } else if (!areSelectionsValidated) {
            setWrongAnswerMessage(error)
        } else {
            event.preventDefault();
            setWrongAnswerMessage(null)
            compareAnswer(userAnswer)

        }
    };

    return (
        <div className={"hoc-answer-input"}>
            {exerciseType === 1 && <Type1
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                setAreSelectionsValidated={setAreSelectionsValidated}
                setError={setError}
            />}

            {exerciseType === 2 && <Type2
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                setAreSelectionsValidated={setAreSelectionsValidated}
                setError={setError}
            />}

            {exerciseType === 3 && <Type3
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                setError={setError}
                setAreSelectionsValidated={setAreSelectionsValidated}
            />}

            {exerciseType === 4 && <Type4
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                ask1={actualExercise.ask1}
                ask2={actualExercise.ask2}
                setAreSelectionsValidated={setAreSelectionsValidated}
                setError={setError}
            />}

            {exerciseType === 6 && <Type6
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                setError={setError}
                setAreSelectionsValidated={setAreSelectionsValidated}
            />}

            {exerciseType === 9 &&
                <div className={"hoc-type9"}>
                    <Type9
                        handleSubmit={handleSubmit}
                        handleChange={handleAnswer}
                        isLoggedIn={isLoggedIn}
                        answer={userAnswer}
                        setActiveInput={setActiveInput}
                        setAreSelectionsValidated={setAreSelectionsValidated}
                        setError={setError}
                    />
                </div>
            }

            {!isLoggedIn && <p>Musisz być zalogowany aby przesłać swoją odpowiedź.</p>}
            {isLoggedIn &&
                <div className={"hoc-answer-input-button-div"}>
                    <button onClick={handleSubmit}>Wyślij</button>
                </div>
            }
        </div>
    );
};
