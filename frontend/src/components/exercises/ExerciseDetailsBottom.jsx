import './exerciseDetails.css'
import React, { useState } from 'react';
import Latex from 'react-latex-next';


export function ExerciseDetailsBottom(props) {
	const {correctAnswer} = props

	const [displayAnswer, setDisplayAnswer] = useState(false)
	const handleShowAnswer = () => {
      	setDisplayAnswer(!displayAnswer)
    }

	return (
		<div className={'exercise-bottom'}>
	        {/*{props.solution_exactly && <p><strong>solution_exactly:</strong> {props.solution_exactly}</p>}*/}
	        {/*{props.solution_similar && props.solution_similar.length > 0 && <p><strong>solution_similar:</strong> {props.solution_similar}</p>}*/}

			{!displayAnswer && <button onClick={handleShowAnswer} className={'show-answer-btn'}>Pokaż odpowiedź.</button>}
			{displayAnswer && <button onClick={handleShowAnswer} className={'show-answer-btn'}>Ukryj odpowiedź.</button>}
			{displayAnswer && (
        		<div>
					{correctAnswer.length > 1 && <p>Poprawne odpowiedzi to:</p>}
					{correctAnswer.length === 1 && <p>Poprawna odpowiedź to:</p>}
		          		{correctAnswer.map((answerObj, index) => (
		            		<p key={index}>
		              		<strong><Latex>{answerObj.answer}</Latex></strong>
		            </p>
		          ))}
        		</div>
      		)}

        </div>
	)
}
