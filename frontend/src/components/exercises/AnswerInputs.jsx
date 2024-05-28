import './answerInputs.css'
import React, { useState, useEffect } from 'react';
import Latex from 'react-latex-next';
import { Error } from  '../helpersComponents/Messages';

export function Type1(props) {
const [selectedAnswer, setSelectedAnswer] = useState(null);


	const handleAnswerClick = (answer) => {
    	props.handleAnswer([answer]);
    	setSelectedAnswer(answer);
  	};

	return (
		<>
			<ul>
				{props.answers.map((answer, index) => (
					<li 
						key={index}
						className={`answer-div ${selectedAnswer === answer.answer ? 'selected' : ''}`} 
						onClick={() => handleAnswerClick(answer.answer)}
					>
						{String.fromCharCode(65 + index)}. 
						<Latex>{answer.answer}</Latex>
					</li>
				))}
			</ul>
		</>
	)
}

export function Type2(props) {
	const { answers, handleAnswer } = props
  	const [firstAnswer, setFirstAnswer] = useState(null)
  	const [secondAnswer, setSecondAnswer] = useState(null)

	const firstSet = answers.filter(answer => !answer.second_set);
  	const secondSet = answers.filter(answer => answer.second_set);

  	useEffect(() => {
  		handleAnswer([firstAnswer, secondAnswer])
  	}, [firstAnswer, secondAnswer])

  	const handleAnswerClick = (setAnswer, answer) => {
  		setAnswer(answer)
  	}

	return (
		<>
	        <div>
		        <h3>Odpowiedzi:</h3>
		        <ul>
		          {firstSet.map((answer, index) => (
		            <li 
		            	key={index} 
		            	onClick={() => handleAnswerClick(setFirstAnswer, answer.answer)}
		            	className={`answer-div ${firstAnswer === answer.answer ? 'selected' : ''}`}
		            >	
		            	{String.fromCharCode(65 + index)}. 
		            	<Latex > {answer.answer}</Latex>
		            </li>                                                    
		          ))}
		        </ul>
	      	</div>
     		<div>
		        <h3>Uzasadnienia:</h3>
		        <ul>
		          {secondSet.map((answer, index) => (
		            <li 
		            	key={index} 
		            	onClick={() => handleAnswerClick(setSecondAnswer, answer.answer)}
		            	className={`answer-div ${secondAnswer === answer.answer ? 'selected' : ''}`}
		            >
		            {index + 1}. 
		            <Latex > {answer.answer}</Latex></li>
		          ))}
		        </ul>
      		</div>
    	</>
	)
}

export function Type3(props) {
	const { answers, handleAnswer, setError } = props
	const [selectedAnswers, setSelectedAnswers] = useState(null)

  	useEffect(() => {
  		if (selectedAnswers) {
  			handleAnswer(selectedAnswers)
  		}
  	}, [selectedAnswers])

  	const handleAnswerClick = (answer) => {
  		if (!selectedAnswers){
  			setSelectedAnswers([answer])
  		} else if (selectedAnswers.includes(answer)) {
  			setSelectedAnswers(() => (selectedAnswers.filter(selectedAnswer => selectedAnswer !== answer)))
  			setError(null)
  		} else if (selectedAnswers.length >= 2) {
  			setError("Możesz zaznaczyć tylko dwie odpowiedzi!")
  		} else {
  			setError(null)
  			setSelectedAnswers([... selectedAnswers, answer]);
  		}
  	}

	return (
		<>
			<ul>
				{answers.map((answer, index) => (
					<li
						key={index}
						className={`answer-div ${selectedAnswers && selectedAnswers.includes(answer.answer) ? 'selected' : ''}`} 
						onClick={() => handleAnswerClick(answer.answer)}
					>	
						{String.fromCharCode(65 + index)}.
						<Latex>{answer.answer}</Latex>
					</li>
				))}
			</ul>
		</>
	)
}

export function Type4(props) {
	// jedna odpowiedź spośród A-C i jedna  D-F
	const { answers, handleAnswer, ask1, ask2 } = props
  	const [firstAnswer, setFirstAnswer] = useState(null)
  	const [secondAnswer, setSecondAnswer] = useState(null)

	const firstSet = answers.filter(answer => !answer.second_set);
  	const secondSet = answers.filter(answer => answer.second_set);

  	useEffect(() => {
  		handleAnswer([firstAnswer, secondAnswer])
  	}, [firstAnswer, secondAnswer])

  	const handleAnswerClick = (setAnswer, answer) => {
  		setAnswer(answer)
  	}

	return (
		<>
	        <div>
		        <h3><Latex>{ask1}</Latex></h3>
		        <ul>
		          {firstSet.map((answer, index) => (
		            <li 
		            	key={index} 
		            	onClick={() => handleAnswerClick(setFirstAnswer, answer.answer)}
		            	className={`answer-div ${firstAnswer === answer.answer ? 'selected' : ''}`}
		            >	
		            	{String.fromCharCode(65 + index)}. 
		            	<Latex > {answer.answer}</Latex>
		            </li>                                                    
		          ))}
		        </ul>
	      	</div>
     		<div>
		        <h3><Latex>{ask2}</Latex></h3>
		        <ul>
		          {secondSet.map((answer, index) => (
		            <li 
		            	key={index} 
		            	onClick={() => handleAnswerClick(setSecondAnswer, answer.answer)}
		            	className={`answer-div ${secondAnswer === answer.answer ? 'selected' : ''}`}
		            >
		            {String.fromCharCode(65 + firstSet.length + index)}. 
		            <Latex > {answer.answer}</Latex></li>
		          ))}
		        </ul>
      		</div>
    	</>
	)
}

export function Type5(props) {
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