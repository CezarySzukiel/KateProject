import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Info } from "../helpersComponents/Messages"
import { Type1, Type2, Type3, Type4, Type9 } from './AnswerInputs'

export const HOC_AnswerInput = (props) => {
  const { setCorrectAnswerMessage, setWrongAnswerMessage, actualExercise } = props
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null)
  const accessToken = useSelector(state => state.auth.accessToken)
  const exerciseType = actualExercise.type
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  

  const handleAnswer = (answer) => {
    setAnswer(answer);
  };

  const pushExerciseToSolved = ()  => {
      pushSolvedExercise(actualExercise)
    }

  const nullValidator = (answers) => {
    if (answer === null || answer.includes(null)) {
      return "Wybierz odpowiedź!"
    }
    return null
  }

  const compareAnswer = async () => {
    const validatorResult = nullValidator(answer)
    if (validatorResult) {
      setError(validatorResult)
    } else {
      setError(null)
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

        if (response.status == 200) {
          setWrongAnswerMessage(null)
          setCorrectAnswerMessage("poprawna odpowiedź!")
        } else if (response.status == 208) {
          setWrongAnswerMessage(null)
          setCorrectAnswerMessage(
            "poprawna odpowiedź! Zadanie zostalo już wcześniej przez Ciebie rozwiązane."
          )
        } else if (response.status == 209) {
          setCorrectAnswerMessage(null)
          setWrongAnswerMessage("Spróbuj jeszcze raz!")
        } 
          
      } catch(error) {
        console.error('Error fetching exercise data:', error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    compareAnswer()
  };

  return (
    <>
      {exerciseType === 1 && <Type1 
        answers={actualExercise.answers}
        handleAnswer={handleAnswer}
      />}

      {exerciseType === 2 && <Type2 
        answers={actualExercise.answers}
        handleAnswer={handleAnswer}
      />}

      {exerciseType === 3 && <Type3 
        answers={actualExercise.answers}
        handleAnswer={handleAnswer}
        setError={setError}
      />}

      {exerciseType === 4 && <Type4 
        answers={actualExercise.answers}
        handleAnswer={handleAnswer}
        ask1={actualExercise.ask1}
        ask2={actualExercise.ask2}

      />}

      {exerciseType === 9 && <Type9 
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        isLoggedIn={isLoggedIn}
        answer={answer}
      />}
      {!isLoggedIn && <p>Musisz być zalogowany aby przesłać swoją odpowiedź.</p>}
      {isLoggedIn && <button onClick={handleSubmit}>Wyślij</button>}
      {error && <Error message={error}/>}
    </>

  );
};
