import './answerInputs.css'
import React, {useState, useEffect, useRef} from 'react';
import Latex from 'react-latex-next';
import {useSelector} from 'react-redux';
import {reformatAnswer} from './helpers';

export function Type1(props) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);


    const handleAnswerClick = (answer) => {
        props.setAreSelectionsValidated(true)
        props.handleAnswer([answer]);
        setSelectedAnswer(answer);
    };

    return (
        <div className={'answer-input'}>
            <ul className={'answers-list'}>
                {props.answers.map((answer, index) => (
                    <li
                        key={index}
                        className={`answer-div ${selectedAnswer === answer.answer ? 'selected' : ''}`}
                        onClick={() => handleAnswerClick(answer.answer)}
                    >
                        <div className={'answer-index'}>
                            {String.fromCharCode(65 + index)}.
                        </div>
                        <div className={'answer-text'}>
                            <Latex> {answer.answer}</Latex>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Type2(props) {
    const {answers, handleAnswer, setAreSelectionsValidated} = props
    const [firstAnswer, setFirstAnswer] = useState("")
    const [secondAnswer, setSecondAnswer] = useState("")

    const firstSet = answers.filter(answer => !answer.second_set);
    const secondSet = answers.filter(answer => answer.second_set);

    useEffect(() => {
        handleAnswer([firstAnswer, secondAnswer])
    }, [firstAnswer, secondAnswer])

    const handleAnswerClick = (setAnswer, answer) => {
        setAreSelectionsValidated(true)
        setAnswer(answer)
    }

    return (
        <div className={'answer-input'}>
            <div>
                <h3>Odpowiedzi:</h3>
                <ul className={'answers-list'}>
                    {firstSet.map((answer, index) => (
                        <li
                            key={index}
                            onClick={() => handleAnswerClick(setFirstAnswer, answer.answer)}
                            className={`answer-div ${firstAnswer === answer.answer ? 'selected' : ''}`}
                        >
                            <div className={'answer-index'}>
                                {String.fromCharCode(65 + index)}.
                            </div>
                            <div className={'answer-text'}>
                                <Latex> {answer.answer}</Latex>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Uzasadnienia:</h3>
                <ul className={'answers-list'}>
                    {secondSet.map((answer, index) => (
                        <li
                            key={index}
                            onClick={() => handleAnswerClick(setSecondAnswer, answer.answer)}
                            className={`answer-div ${secondAnswer === answer.answer ? 'selected' : ''}`}
                        >
                            <div className={'answer-index'}>
                                {index + 1}.
                            </div>
                            <div className={'answer-text'}>
                                <Latex> {answer.answer}</Latex>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export function Type3(props) {
    const {answers, handleAnswer, setError, setAreSelectionsValidated} = props
    const [selectedAnswers, setSelectedAnswers] = useState(null)

    useEffect(() => {
        if (selectedAnswers) {
            handleAnswer(selectedAnswers)
        }
    }, [selectedAnswers])

    const handleAnswerClick = (answer) => {
        if (!selectedAnswers) {
            setSelectedAnswers([answer])
        } else if (selectedAnswers.includes(answer)) {
            setSelectedAnswers(() => (selectedAnswers.filter(selectedAnswer => selectedAnswer !== answer)))
            setError(null)
        } else if (selectedAnswers.length >= 2) {
            setError("Możesz zaznaczyć tylko dwie odpowiedzi!")
        } else {
            setError(null)
            setAreSelectionsValidated(true)
            setSelectedAnswers([...selectedAnswers, answer]);
        }
    }

    return (
        <div className={'answer-input'}>
            <ul className={'answers-list'}>
                {answers.map((answer, index) => (
                    <li
                        key={index}
                        className={`answer-div ${selectedAnswers && selectedAnswers.includes(answer.answer) ? 'selected' : ''}`}
                        onClick={() => handleAnswerClick(answer.answer)}
                    >
                        <div className={'answer-index'}>
                            {String.fromCharCode(65 + index)}.
                        </div>
                        <div className={'answer-text'}>
                            <Latex>{answer.answer}</Latex>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Type4(props) {

    const {answers, handleAnswer, ask1, ask2, setAreSelectionsValidated} = props
    const [firstAnswer, setFirstAnswer] = useState("")
    const [secondAnswer, setSecondAnswer] = useState("")

    const firstSet = answers.filter(answer => !answer.second_set);
    const secondSet = answers.filter(answer => answer.second_set);

    useEffect(() => {
        handleAnswer([firstAnswer, secondAnswer])
    }, [firstAnswer, secondAnswer])

    const handleAnswerClick = (setAnswer, answer) => {
        setAreSelectionsValidated(true)
        setAnswer(answer)
    }

    return (
        <div className={'answer-input'}>
            <div>
                {ask1 && <p><Latex>{ask1}</Latex></p>}
                <ul className={'answers-list'}>
                    {firstSet.map((answer, index) => (
                        <li
                            key={index}
                            onClick={() => handleAnswerClick(setFirstAnswer, answer.answer)}
                            className={`answer-div ${firstAnswer === answer.answer ? 'selected' : ''}`}
                        >
                            {String.fromCharCode(65 + index)}.
                            <Latex> {answer.answer}</Latex>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {ask2 && <p><Latex>{ask2}</Latex></p>}
                <ul className={'answers-list'}>
                    {secondSet.map((answer, index) => (
                        <li
                            key={index}
                            onClick={() => handleAnswerClick(setSecondAnswer, answer.answer)}
                            className={`answer-div ${secondAnswer === answer.answer ? 'selected' : ''}`}
                        >
                            <div className={'answer-index'}>
                                {String.fromCharCode(65 + firstSet.length + index)}.
                            </div>
                            <div className={'answer-text'}>
                                {answer.answer && <Latex> {answer.answer}</Latex>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export function Type6(props) {
    const {answers, handleAnswer, setAreSelectionsValidated, setError} = props
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [rejectedAnswers, setRejectedAnswers] = useState([])

    const handleAnswerSelect = (answer) => {
        if (rejectedAnswers.includes(answer)) {
            setRejectedAnswers(rejectedAnswers.filter(rejectedAnswer => rejectedAnswer !== answer))
            setSelectedAnswers([...selectedAnswers, answer])
        }
        if (selectedAnswers.includes(answer)) {
            setSelectedAnswers(selectedAnswers.filter(selectedAnswer => selectedAnswer !== answer))
        } else {
            setSelectedAnswers([...selectedAnswers, answer])
        }
    }

    const handleAnswerReject = (answer) => {
        if (selectedAnswers.includes(answer)) {
            setSelectedAnswers(selectedAnswers.filter(selectedAnswer => selectedAnswer !== answer))
        }
        if (rejectedAnswers.includes(answer)) {
            setRejectedAnswers(rejectedAnswers.filter(rejectedAnswer => rejectedAnswer !== answer))
        } else {
            setRejectedAnswers([...rejectedAnswers, answer])
        }
    }

    const validator = () => {
        const selections = selectedAnswers.concat(rejectedAnswers)
        if (selections.length === answers.length) {
            return true
        }
        else {
            setError('Nie zaznaczono wszystkich odpowiedzi')
            return false
        }
    }


    useEffect(() => {
        handleAnswer(selectedAnswers)
        setAreSelectionsValidated(validator())
    }, [selectedAnswers, rejectedAnswers])

    return (
        <div className={'answer-input'}>
            <ul className={'answers-list'}>
                {answers.map((answer, index) => (
                    <li
                        key={index}
                        className={`answer-div`}
                    >
                        <div className={'answer-index'}>
                            {String.fromCharCode(65 + index)}.
                        </div>
                        <div className={'answer-text'}>
                            <Latex> {answer.answer}</Latex>
                        </div>
                        <div className={'answer-buttons'}>
                            <button
                                className={`answer-button-true ${selectedAnswers.includes(answer.answer) ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(answer.answer)}
                            >P
                            </button>
                            <button
                                className={`answer-button-false ${rejectedAnswers.includes(answer.answer) ? 'selected' : ''}`}
                                onClick={() => handleAnswerReject(answer.answer)}
                            >F
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
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

    return (
        <div className={"answer-input"}>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor={'type9-textarea'}>
                    Wpisz poprawną odpowiedź
                </label>
                <textarea
                    id={'type9-textarea'}
                    ref={inputRef}
                    onFocus={handleFocus}
                    value={props.answer}
                    onChange={handleChange}
                >
				</textarea>
                {
                    answer && <div className={'user-answer-field'}>
                        {answer[0].length > 0 && <p><Latex>${answer}$</Latex></p>}
                        {answer[0].length === 0 && <p><Latex>{answer}</Latex></p>}
                    </div>
                }

                {props.isLoggedIn && <>
                </>}
                {!props.isLoggedIn && <p>Aby sprawdzić swoją odpowiedź musisz być zalogowany.</p>}
            </form>
        </div>
    )
}
