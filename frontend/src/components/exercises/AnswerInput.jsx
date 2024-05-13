import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Error, Info } from "../helpersComponents/Messages"

export const AnswerInput = (props) => {
  const [answer, setAnswer] = useState('');
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState(null)
  const [wrongAnswer, setWrongAnswer] = useState(null)

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
          id: props.id
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.accessToken}`,
          }
        });
        console.log('response: ', response)

        if (response.status == 200) {
          setWrongAnswer(null)
          setCorrectAnswerMessage("poprawna odpowiedź!")
        } else if (response.status == 208) {
          setWrongAnswer(null)
          setCorrectAnswerMessage(
            "poprawna odpowiedź! \n Zadanie zostalo już wcześniej przez Ciebie rozwiązane."
          )
        } else if (response.status == 209) {
          setCorrectAnswerMessage(null)
          setWrongAnswer("Spróbuj jeszcze raz!")
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
      {props.isLoggedIn && <>
        <form onSubmit={handleSubmit}>
          <label>
            Odpowiedź:
            <input type="text" value={answer} onChange={handleChange} />
          </label>
          <button type="submit">Wyślij</button>
        </form>
        {correctAnswerMessage && <Info message={correctAnswerMessage}/>}
        {wrongAnswer && <Error message={wrongAnswer}/>}
      </>}
    </>
  );
};

// todo show the points in the user page 