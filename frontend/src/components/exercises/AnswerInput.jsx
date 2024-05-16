import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Error, Info } from "../helpersComponents/Messages"

export const AnswerInput = (props) => {
  const { isLoggedIn, id, pushExerciseToSolved, setCorrectAnswerMessage, setWrongAnswerMessage } = props
  const [answer, setAnswer] = useState('');
  // const [correctAnswerMessage, setCorrectAnswerMessage] = useState(null)
  // const [wrongAnswerMessage, setWrongAnswerMessage] = useState(null)

  useEffect(() => {
    // console.log('props; ', props, 'answer: ', answer, )
  }, [answer])

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };


  const compareAnswer = async () => {
      try {
        const response = await axios.post('http://0.0.0.0:8000/api/v1/exercises/compare/', {
          answer: answer,
          id: id
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.accessToken}`,
          }
        });

        if (response.status == 200) {
          console.log('response: ', response)
          pushExerciseToSolved()
          setWrongAnswerMessage(null)
          setCorrectAnswerMessage("poprawna odpowiedź!")
        } else if (response.status == 208) {
          setWrongAnswerMessage(null)
          setCorrectAnswerMessage(
            "poprawna odpowiedź! \n Zadanie zostalo już wcześniej przez Ciebie rozwiązane."
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
    console.log(answer)
    compareAnswer()
  };

  return (
    <>
      {isLoggedIn && <>
        <form onSubmit={handleSubmit}>
          <label>
            Odpowiedź:
            <input type="text" value={answer} onChange={handleChange} />
          </label>
          <button type="submit">Wyślij</button>
        </form>
      </>}
    </>
  );
};

// todo show the points in the user page 