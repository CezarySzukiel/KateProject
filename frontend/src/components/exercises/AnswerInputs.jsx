import './answerInputs.css'
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {reformatAnswer} from './helpers';
import {Chart} from './Chart'
import {Latex} from './Latex'
import { reformatTextByDollars } from "./helpers";

const createObjects = (answers) => {
    const objs = []
    for (const answer of answers) {
        objs.push({answerPoint: answer.answer[answer.answer.length - 1], answer: answer})
    }
    objs.sort((a, b) => a.answerPoint.localeCompare(b.answerPoint));
    return objs
}


export function Type1(props) {
    const {answers, handleAnswer, setAreSelectionsValidated, setError} = props
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerObjects, setAnswerObjects] = useState([]);


    useEffect(() => {
        setAnswerObjects(createObjects(answers))
    }, []);

    const handleAnswerClick = (answer) => {
        setAreSelectionsValidated(true)
        handleAnswer([answer]);
        setSelectedAnswer(answer);
    };

    return (
        <div className={'answer-input'}>
            <ul className={'answers-list'}>
                {answerObjects.map((ans, index) => (
                    <li
                        key={ans.answer.id}
                        onClick={() => handleAnswerClick(ans.answer.answer)}
                    >
                        {ans.answer.functions.length > 0 && (
                            <div
                                key={ans.answer.functions.id}
                                className={`answer-div ${selectedAnswer === ans.answer.answer ? 'selected' : ''}`}
                            >
                                {ans.answerPoint}.
                                <Chart data={ans.answer.functions[0]}/>
                            </div>
                        )}
                        {ans.answer.images.length > 0 && (
                            <div
                                key={ans.answer.images.id}
                                className={`answer-div ${selectedAnswer === ans.answer.answer ? 'selected' : ''}`}
                            >
                                {ans.answerPoint}.
                                <div className={'image-div'}>
                                    <Latex text={ans.answer.images[0].description}/>
                                    <img
                                        src={ans.answer.images[0].image}
                                        alt={ans.answer.answer}
                                    ></img>
                                </div>
                            </div>
                        )}
                        {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                            <div
                                className={`answer-div ${selectedAnswer === ans.answer.answer ? 'selected' : ''}`}
                            >
                                {String.fromCharCode(65 + index)}.
                                <Latex text={ans.answer.answer}/>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Type2(props) {
    const {
        handleAnswer,
        setAreSelectionsValidated,
        actualExercise,
    } = props
    const [firstAnswer, setFirstAnswer] = useState("")
    const [secondAnswer, setSecondAnswer] = useState("")
    const firstSet = actualExercise.answers.filter(answer => !answer.second_set);
    const secondSet = actualExercise.answers.filter(answer => answer.second_set);
    const [firstSetAnswerObjects, setFirstSetAnswerObjects] = useState(createObjects(firstSet))
    const [secondSetAnswerObjects, setSecondSetAnswerObjects] = useState(createObjects(secondSet))

    useEffect(() => {
        setFirstSetAnswerObjects(createObjects(firstSet))
        setSecondSetAnswerObjects(createObjects(secondSet))
    }, []);
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
                <ul className={'answers-list'}>
                    {firstSetAnswerObjects.length > 0 && firstSetAnswerObjects.map((ans, index) => (
                        <li
                            key={ans.answer.id}
                            onClick={() => handleAnswerClick(setFirstAnswer, ans.answer.answer)}
                            className={`answer-div ${firstAnswer === ans.answer.answer ? 'selected' : ''}`}
                        >
                            {ans.answer.functions.length > 0 && (
                                <div
                                    key={ans.answer.functions.id}
                                    className={`answer-div ${firstAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <Chart data={ans.answer.functions[0]}/>
                                </div>
                            )}
                            {ans.answer.images.length > 0 && (
                                <div
                                    key={ans.answer.images.id}
                                    className={`answer-div ${firstAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <div className={'image-div'}>
                                        <Latex text={ans.answer.images[0].description}/>
                                        <img
                                            src={ans.answer.images[0].image}
                                            alt={ans.answer.answer}
                                        ></img>
                                    </div>
                                </div>
                            )}
                            {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                                <>
                                    <div className={'answer-index'}>
                                        {String.fromCharCode(65 + index)}.
                                    </div>
                                    <div className={'answer-text'}>
                                        <Latex text={ans.answer.answer}/>
                                    </div>
                                </>
                            )}

                        </li>

                    ))}
                </ul>
            </div>
            <div>
                {
                    actualExercise.additional_texts.length > 0 &&
                    actualExercise.additional_texts[0].place === "between_sets" &&
                    <h3>{actualExercise.additional_texts[0].text}</h3>
                }
                <ul className={'answers-list'}>
                    {secondSetAnswerObjects.length > 0 && secondSetAnswerObjects.map((ans, index) => (
                        <li
                            onClick={() => handleAnswerClick(setSecondAnswer, ans.answer.answer)}
                            className={`answer-div ${secondAnswer === ans.answer.answer ? 'selected' : ''}`}
                        >
                            {ans.answer.functions.length > 0 && (
                                <div
                                    key={ans.answer.functions.id}
                                    className={`answer-div ${secondAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <Chart data={ans.answer.functions[0]}/>
                                </div>
                            )}
                            {ans.answer.images.length > 0 && (
                                <div
                                    key={ans.answer.images.id}
                                    className={`answer-div ${secondAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <div className={'image-div'}>
                                        <Latex text={ans.answer.images[0].description}/>
                                        <img
                                            src={ans.answer.images[0].image}
                                            alt={ans.answer.answer}
                                        ></img>
                                    </div>
                                </div>
                            )}
                            {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                                <>
                                    <div className={'answer-index'}>
                                        {index + 1}.
                                    </div>
                                    <div className={'answer-text'}>
                                        <Latex text={ans.answer.answer}/>
                                    </div>
                                </>
                            )}
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
    const [answerObjects, setAnswerObjects] = useState([])

    useEffect(() => {
        setAnswerObjects(createObjects(answers))
    }, []);

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
                {answerObjects.map((ans, index) => (
                    <li
                        key={ans.answer.id}
                        className={`answer-div ${selectedAnswers && selectedAnswers.includes(ans.answer.answer) ? 'selected' : ''}`}
                        onClick={() => handleAnswerClick(ans.answer.answer)}
                    >
                        {ans.answer.functions.length > 0 && (
                            <div
                                key={ans.answer.functions.id}
                                className={`answer-div ${selectedAnswers && selectedAnswers.includes(ans.answer.answer) ? 'selected' : ''}`}
                            >
                                {ans.answerPoint}.
                                <Chart data={ans.answer.functions[0]}/>
                            </div>
                        )}
                        {ans.answer.images.length > 0 && (
                            <div
                                key={ans.answer.images.id}
                                className={`answer-div ${selectedAnswers && selectedAnswers.includes(ans.answer.answer) ? 'selected' : ''}`}
                            >
                                {ans.answerPoint}.
                                <div className={'image-div'}>
                                    <Latex text={ans.answer.images[0].description}/>
                                    <img
                                        src={ans.answer.images[0].image}
                                        alt={ans.answer.answer}
                                    ></img>
                                </div>
                            </div>
                        )}
                        {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                            <>
                                <div className={'answer-index'}>
                                    {String.fromCharCode(65 + index)}.
                                </div>
                                <div className={'answer-text'}>
                                    <Latex text={ans.answer.answer}/>
                                </div>
                            </>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Type4(props) {

    const {actualExercise, handleAnswer, ask1, ask2, setAreSelectionsValidated} = props
    const [firstAnswer, setFirstAnswer] = useState("")
    const [secondAnswer, setSecondAnswer] = useState("")
    const [firstSetAnswerObjects, setFirstSetAnswerObjects] = useState([])
    const [secondSetAnswerObjects, setSecondSetAnswerObjects] = useState([]);
    const firstSet = actualExercise.answers.filter(answer => !answer.second_set);
    const secondSet = actualExercise.answers.filter(answer => answer.second_set);

    useEffect(() => {
        setFirstSetAnswerObjects(createObjects(firstSet))
        setSecondSetAnswerObjects(createObjects(secondSet))
    }, []);

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
                    {firstSetAnswerObjects.map((ans, index) => (
                        <li
                            key={ans.answer.id}
                            onClick={() => handleAnswerClick(setFirstAnswer, ans.answer.answer)}
                            className={`answer-div ${firstAnswer === ans.answer.answer ? 'selected' : ''}`}
                        >
                            {ans.answer.functions.length > 0 && (
                                <div
                                    key={ans.answer.functions.id}
                                    className={`answer-div ${firstAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <Chart data={ans.answer.functions[0]}/>
                                </div>
                            )}
                            {ans.answer.images.length > 0 && (
                                <div
                                    key={ans.answer.images.id}
                                    className={`answer-div ${firstAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <div className={'image-div'}>
                                        <Latex text={ans.answer.images[0].description}/>
                                        <img
                                            src={ans.answer.images[0].image}
                                            alt={ans.answer.answer}
                                        ></img>
                                    </div>
                                </div>
                            )}
                            {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                                <>
                                    {String.fromCharCode(65 + index)}.
                                    <Latex text={ans.answer.answer}/>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {
                actualExercise.additional_texts.length > 0 &&
                actualExercise.additional_texts[0].place === "between_sets" &&
                <p>{actualExercise.additional_texts[0].text}</p>
            }
            <div>
                {ask2 && <p><Latex>{ask2}</Latex></p>}
                <ul className={'answers-list'}>
                    {secondSetAnswerObjects.map((ans, index) => (
                        <li
                            key={ans.answer.id}
                            onClick={() => handleAnswerClick(setSecondAnswer, ans.answer.answer)}
                            className={`answer-div ${secondAnswer === ans.answer.answer ? 'selected' : ''}`}
                        >
                            {ans.answer.functions.length > 0 && (
                                <div
                                    key={ans.answer.functions.id}
                                    className={`answer-div ${secondAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <Chart data={ans.answer.functions[0]}/>
                                </div>
                            )}
                            {ans.answer.images.length > 0 && (
                                <div
                                    key={ans.answer.images.id}
                                    className={`answer-div ${secondAnswer === ans.answer.answer ? 'selected' : ''}`}
                                >
                                    {ans.answerPoint}.
                                    <div className={'image-div'}>
                                        <Latex text={ans.answer.images[0].description}/>
                                        <img
                                            src={ans.answer.images[0].image}
                                            alt={ans.answer.answer}
                                        ></img>
                                    </div>
                                </div>
                            )}
                            {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                                <>
                                    <div className={'answer-index'}>
                                        {String.fromCharCode(65 + firstSet.length + index)}.
                                    </div>
                                    <div className={'answer-text'}>
                                        {ans.answer.answer && <Latex text={ans.answer.answer}/>}
                                    </div>
                                </>
                            )}
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
    const [answerObjects, setAnswerObjects] = useState([])

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
        } else {
            setError('Nie zaznaczono wszystkich odpowiedzi')
            return false
        }
    }

    useEffect(() => {
        setAnswerObjects(createObjects(answers))
    }, []);

    useEffect(() => {
        handleAnswer(selectedAnswers)
        setAreSelectionsValidated(validator())
    }, [selectedAnswers, rejectedAnswers])

    return (
        <div className={'answer-input'}>
            <ul className={'answers-list'}>
                {answerObjects.map((ans, index) => (
                    <li
                        key={ans.answer.id}
                        className={`answer-div`}
                    >
                        {ans.answer.functions.length > 0 && (
                            <div
                                key={ans.answer.functions.id}
                                className={`answer-div`}
                            >
                                {ans.answerPoint}.
                                <Chart data={ans.answer.functions[0]}/>
                            </div>
                        )}
                        {ans.answer.images.length > 0 && (
                            <div
                                key={ans.answer.images.id}
                                className={`answer-div`}
                            >
                                {ans.answerPoint}.
                                <div className={'image-div'}>
                                    <Latex text={ans.answer.images[0].description}/>
                                    <img
                                        src={ans.answer.images[0].image}
                                        alt={ans.answer.answer}
                                    ></img>
                                </div>
                            </div>
                        )}
                        {ans.answer.functions.length === 0 && ans.answer.images.length === 0 && (
                            <>
                                <div className={'answer-index'}>
                                    {String.fromCharCode(65 + index)}.
                                </div>
                                <div className={'answer-text'}>
                                    <Latex text={ans.answer.answer}/>
                                </div>
                            </>
                        )}
                        <div className={'answer-buttons'}>
                            <button
                                className={`answer-button-true ${selectedAnswers.includes(ans.answer.answer) ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(ans.answer.answer)}
                            >P
                            </button>
                            <button
                                className={`answer-button-false ${rejectedAnswers.includes(ans.answer.answer) ? 'selected' : ''}`}
                                onClick={() => handleAnswerReject(ans.answer.answer)}
                            >F
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Type7(props) {
    const {answers, handleAnswer, additional_texts, setAreSelectionsValidated} = props
    const [answerObjects, setAnswerObjects] = useState([]);

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleChoice = (event, txt) => {
        const newAnswer = event.target.value;
        setSelectedAnswers(prevSelectedAnswers =>
            prevSelectedAnswers.map(answer =>
                answer[txt.text] ? {[txt.text]: newAnswer} : answer
            )
        );
    }

    useEffect(() => {
        setAnswerObjects(createObjects(answers))
        setSelectedAnswers(additional_texts.map(txt => ({[txt.text]: "A"})));
        setAreSelectionsValidated(true)
    }, []);

    useEffect(() => {
        const cleanedAnswers = selectedAnswers.map(ans => {
            const key = Object.keys(ans)[0];
            return `${key}: ${ans[key]}`;
        });
        handleAnswer(cleanedAnswers);
    }, [selectedAnswers]);
    return (
        <div className={'answer-input'}>
            <table className={'answer-table'}>
                {additional_texts && additional_texts.map((txt, index) => (
                    <tr key={txt.id}>
                        <td>
                            {txt.text}
                        </td>
                        <td>
                            <select onChange={(event) => handleChoice(event, txt)}>
                                {answerObjects.map((ans, idx) => (
                                    <option key={idx} value={ans.answerPoint}>
                                        {ans.answerPoint}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
            </table>
            <div className={'answers-type7'}>
                {answerObjects.map((ans, index) => (
                    ans.answer && (
                        ans.answer.functions.length === 0 && ans.answer.answer ? (
                            <div key={index} className={'answer-div'}>
                                <ul>
                                    <li>
                                        {ans.answerPoint}.
                                        <Latex text={ans.answer.answer}/>
                                    </li>
                                </ul>
                            </div>
                        ) : ans.answer.functions.length > 0 && (
                            <div key={index} className={'answer-div'}>
                                {ans.answerPoint}.
                                <Chart data={ans.answer.functions[0]}/>
                            </div>
                        )
                    )
                ))}
            </div>
        </div>
    );
}

export function Type9(props) {
    const textareaRef = useRef(null);
    const answer = useSelector(state => state.ex.userAnswer)
    const activeInputRef = useSelector(state => state.ex.activeInputRef)

    const handleFocus = () => {
        props.setActiveInput(textareaRef.current)
    }

    const handleChange = () => {
        let value = event.target.value;
        value = reformatTextByDollars(value)
        props.handleChange([value])
    }

    useEffect(() => {
        if (!activeInputRef) {
            handleFocus()
        }
    }, [])

    return (
        <div className={"answer-input"}>
            <form onSubmit={props.handleSubmit}>
                <label htmlFor={'type9-textarea'}>
                    Wpisz poprawną odpowiedź
                </label>
                <textarea
                    id={'type9-textarea'}
                    ref={textareaRef}
                    onFocus={handleFocus}
                    value={answer}
                    onChange={handleChange}
                >
				</textarea>
                {
                    answer && <div className={'user-answer-field'}>
                        {answer[0]?.length > 0 && <p><Latex text={answer[0]}/></p>}
                    </div>
                }

                {props.isLoggedIn && <>
                </>}
                {!props.isLoggedIn && <p>Aby sprawdzić swoją odpowiedź musisz być zalogowany.</p>}
            </form>
        </div>
    )
}
