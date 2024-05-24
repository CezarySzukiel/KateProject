import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Info } from "../helpersComponents/Messages"
import { Type1, Type2, Type34, Type5, Type6, Type9 } from './AnswerInputs'

export const HOC_AnswerInput = (props) => {
  const { setCorrectAnswerMessage, setWrongAnswerMessage, actualExercise } = props
  const [answer, setAnswer] = useState(null);
  const accessToken = useSelector(state => state.auth.accessToken)
  const exerciseType = actualExercise.type
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  


  // useEffect(() => {
  //   console.log('loginToken;', accessToken)
  // }, [])

  const handleAnswer = (answer) => {
    setAnswer(answer);
  };

  const pushExerciseToSolved = ()  => {
      pushSolvedExercise(actualExercise)
    }

  const compareAnswer = async () => {
      try {
        const response = await axios.post('http://0.0.0.0:8000/api/v1/exercises/compare/', {
          answer: answer,
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

      {exerciseType === 2 && <Type2 />}

      {(exerciseType === 3 || exerciseType === 4) && <Type34 />}

      {exerciseType === 5 && <Type5 />}

      {exerciseType === 6 && <Type6 />}

      {exerciseType === 9 && <Type9 
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        isLoggedIn={isLoggedIn}
        answer={answer}
      />}
      {!isLoggedIn && <p>Musisz być zalogowany aby przesłać swoją odpowiedź.</p>}
      {isLoggedIn && <button onClick={handleSubmit}>Wyślij</button>}
    </>

  );
};

// todo jeśłi zaznaczę odpowiedź niech pojawi się ramka wokół. poza tym jakieś wfekty klikania w c ss