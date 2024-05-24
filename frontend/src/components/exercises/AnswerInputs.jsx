import './answerInputs.css'
import React, { useState } from 'react';

export function Type1(props) {
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const handleAnswerClick = (answer) => {
    	props.handleAnswer(answer);
    	setSelectedAnswer(answer);
  	};

	return (
		<>
			<p>Zaznacz jedną poprawną odpowiedź.</p>
			{props.answers.map((answer, index) => (
				<div 
					key={index}
					className={`answer-div ${selectedAnswer === answer.answer ? 'selected' : ''}`} 
					onClick={() => handleAnswerClick(answer.answer)}
				>
					{answer.answer}
				</div>
			))}
		</>
	)
}

export function Type2(props) {
	return (
		<>
			<p>Zaznacz jedną odpowiedź spośród A-C oraz jedno uzasadnienie tej odpowiedzi spośród 1.-3.</p>
		</>
	)
}

export function Type34(props) {
	return (
		<>
			<p>Zaznacz dwie poprawne odpowiedzi.</p>
		</>
	)
}

export function Type5(props) {
	return (
		<>
			<p>Zaznacz jedną odpowiedź spośród A-C oraz jedną odpowiedź spośród D-F.</p>
		</>
	)
}

export function Type6(props) {
	return (
		<>
			<p>Zaznacz jedną odpowiedź spośród A-D oraz jedną odpowiedź spośród E-H.</p>
		</>
	)
}

export function Type9(props) {
	return (
		<>
			<p>Wpisz poprawną odpowiedź</p>
	        <form onSubmit={props.handleSubmit}>
	          	<label>
	            	Odpowiedź:
	            	<input type="text" value={props.answer} onChange={props.handleChange} />
	          	</label>
	          	{props.isLoggedIn && <>
	            	<button type="submit">Wyślij</button>
	          	</>}
	        	{!props.isLoggedIn && <p>Aby sprawdzić swoją odpowiedź musisz być zalogowany.</p>}
	        </form>
    	</>
	)
}