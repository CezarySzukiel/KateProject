import './exerciseDetails.css'
import React, {useState} from 'react';
import Latex from 'react-latex-next';


export function ExerciseDetailsBottom(props) {
    const {correctAnswer, actualExercise} = props

    const [displayAnswer, setDisplayAnswer] = useState(false)
    const handleShowAnswer = () => {
        setDisplayAnswer(!displayAnswer)
    }

    return (
        <div className={'exercise-bottom'}>
            {/*{props.solution_exactly && <p><strong>solution_exactly:</strong> {props.solution_exactly}</p>}*/}
            {/*{props.solution_similar && props.solution_similar.length > 0 && <p><strong>solution_similar:</strong> {props.solution_similar}</p>}*/}
            <div>
                {!displayAnswer &&
                    <button onClick={handleShowAnswer} className={'show-answer-btn'}>Pokaż odpowiedź.</button>}
                {displayAnswer && (
                    <div className={'exercise-bottom-answers'}>
                        <button onClick={handleShowAnswer} className={'show-answer-btn'}>Ukryj odpowiedź.</button>
                        {correctAnswer.length > 1 && <p>Poprawne odpowiedzi to:</p>}
                        {correctAnswer.length === 1 && <p>Poprawna odpowiedź to:</p>}
                        {actualExercise.type !== 6 && correctAnswer.map((answerObj, index) => (
                            <p key={index}>
                                <Latex>{answerObj.answer}</Latex>
                            </p>
                        ))}
                        {actualExercise.type === 6 && (
                            <>
                                {correctAnswer.map((answerObj, index) => (
                                    <div key={index} className={'answer-text'}>
                                        <Latex>{answerObj.answer}</Latex> <strong>P</strong>
                                    </div>
                                ))}
                                {actualExercise.answers.filter(answer => !answer.correct).map((answer, index) => (
                                    <div key={index} className={'answer-text'}>
                                        <Latex>{answer.answer}</Latex> <strong>F</strong>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>


        </div>
    )
}
