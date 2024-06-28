import './answerInputs.css'
import React, { useState, useEffect, useRef } from 'react';
import Latex from 'react-latex-next';
import { useSelector } from 'react-redux';
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
		        {ask1 && <p><Latex>{ask1}</Latex></p>}
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
		        {ask2 && <p><Latex>{ask2}</Latex></p>}
		        <ul>
		          {secondSet.map((answer, index) => (
		            <li 
		            	key={index} 
		            	onClick={() => handleAnswerClick(setSecondAnswer, answer.answer)}
		            	className={`answer-div ${secondAnswer === answer.answer ? 'selected' : ''}`}
		            >
			            {String.fromCharCode(65 + firstSet.length + index)}. 
			            {answer.answer && <Latex > {answer.answer}</Latex>}
		            </li>
		          ))}
		        </ul>
      		</div>
    	</>
	)
}

export const reformatAnswer = (value) => {
	let data = value.replace(/\$/g, '');
 	return `$${data}$`;
}

export function Type9(props) {
	const inputRef = useRef(null);
	const answer = useSelector(state => state.ex.userAnswer)

 	const handleFocus = () => {
 		props.setActiveInput(inputRef.current)
 	}
 	
 	const handleChange = () => {
 		let value = event.target.value;
 		value = reformatAnswer(value)
 		props.handleChange([value])
 	}

 	// w handleChange dodać obsługę, aby caret był zawsze pomiędzy $ a nie za $ którego nie możę usunąć
	return (
		<div className={"answer-input"}>
			<p>Wpisz poprawną odpowiedź</p>
	        <form onSubmit={props.handleSubmit}>
	          	<label>
	            	Odpowiedź:
	          		<div>
		            	<textarea
		      		      	ref={inputRef}
		           			onFocus={handleFocus}
		           			type="text" 
		           			// value={props.answer} 
		           			onChange={handleChange} 
		           		>
		           		{/*<Latex>${props.answer}$</Latex>*/}
		           		</textarea>
	           		</div>
	           		<div>
	           		<h1><Latex>{answer}</Latex></h1>
	           		</div>
	          	</label>

	          	{props.isLoggedIn && <>
	          	</>}
	        	{!props.isLoggedIn && <p>Aby sprawdzić swoją odpowiedź musisz być zalogowany.</p>}
	        </form>
    	</div>
	)
}