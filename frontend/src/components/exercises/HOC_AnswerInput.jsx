import './hocAnswerInput.css'
import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {Type1, Type2, Type3, Type4, Type6, Type7, Type9} from './AnswerInputs'


export const HOC_AnswerInput = (props) => {
    const {
        setSuccessMessage,
        setErrorMessage,
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
                setErrorMessage(null)
                setSuccessMessage("poprawna odpowiedź!")
                pushSolvedExercise(actualExercise)
            } else if (response.status === 208) {
                setErrorMessage(null)
                setSuccessMessage(
                    "poprawna odpowiedź! Zadanie zostało już wcześniej przez Ciebie rozwiązane."
                )
            } else if (response.status === 209) {
                setSuccessMessage(null)
                setErrorMessage("Spróbuj jeszcze raz!")
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
        }
    };

    const handleSubmit = (event) => {
        const nullValidatorResult = nullValidator(userAnswer)
        if (nullValidatorResult) {
            setErrorMessage(nullValidatorResult)
        } else if (!areSelectionsValidated) {
            setErrorMessage(error)
        } else {
            event.preventDefault();
            setErrorMessage(null)
            compareAnswer(userAnswer)

        }
    };

    return (
        <div className={"hoc-answer-input"}>
            {exerciseType === 1 && <Type1
                key={actualExercise.id}
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                setAreSelectionsValidated={setAreSelectionsValidated}
                setError={setError}
            />}

            {exerciseType === 2 && <Type2
                key={actualExercise.id}
                actualExercise={actualExercise}
                handleAnswer={handleAnswer}
                setAreSelectionsValidated={setAreSelectionsValidated}
                setError={setError}
            />}

            {exerciseType === 3 && <Type3
                key={actualExercise.id}
                answers={actualExercise.answers}
                handleAnswer={handleAnswer}
                setError={setError}
                setAreSelectionsValidated={setAreSelectionsValidated}
            />}

            {exerciseType === 4 && <Type4
                key={actualExercise.id}
                actualExercise={actualExercise}
                handleAnswer={handleAnswer}
                ask1={actualExercise.ask1}
                ask2={actualExercise.ask2}
                setAreSelectionsValidated={setAreSelectionsValidated}
                setError={setError}
            />}

            {exerciseType === 6 && <Type6
                key={actualExercise.id}
                answers={actualExercise.answers}
                actualExercise={actualExercise}
                handleAnswer={handleAnswer}
                setError={setError}
                setAreSelectionsValidated={setAreSelectionsValidated}
            />}

            {exerciseType === 7 && <Type7
                key={actualExercise.id}
                answers={actualExercise.answers}
                additional_texts={actualExercise.additional_texts}
                handleAnswer={handleAnswer}
                setError={setError}
                setAreSelectionsValidated={setAreSelectionsValidated}
            />}

            {exerciseType === 9 &&
                <div className={"hoc-type9"}>
                    <Type9
                        key={actualExercise.id}
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
