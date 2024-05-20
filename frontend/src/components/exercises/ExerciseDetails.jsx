import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

import { Info, Error } from '../helpersComponents/Messages'
import { ConAnswerInput } from '../../containers/Auth'
import MathProblemDisplay from './latextry'

export function ExerciseDetails(props) {
  const [exercise, setExercise] = useState(null);
  const [solvedExercisesIds, setSolvedExercisesIds] = useState(null)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState(null)
  const [wrongAnswerMessage, setWrongAnswerMessage] = useState(null)
  const [displayAnswer, setDisplayAnswer] = useState(false)

  useEffect(() => {
    if ((props.actualExercise && !exercise) || 
      (props.actualExercise && exercise.id !== props.actualExercise.id)
    ) {
      fetchExerciseData()
    }
  }, [props.actualExercise]);

  useEffect(() => {
        if (props.solvedExercises) {
            setSolvedExercisesIds(props.solvedExercises.map(exercise => exercise.id))
        }
    }, [props.solvedExercises])

  useEffect(() => {
    if (exercise) {
      props.setActualSubsection(props.allSubsections.filter((subsec) => subsec.id == exercise.subsection))
    }
  }, [exercise])

  useEffect(() => {
    if (props.actualSubsection) {
      props.setActualSection(props.allSections.filter((section) => section.id == props.actualSubsection[0].section)[0]) // zahardkodowane 1
    }
  }, [props.actualSubsection])

    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(`http://0.0.0.0:8000/api/v1/exercises/exercise/detail/${props.actualExercise.id}/`)
        setExercise(response.data);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    const pushExerciseToSolved = ()  => {
      props.pushSolvedExercise(exercise)
    }

    const handleShowAnswer = () => {
      setDisplayAnswer(!displayAnswer)
    }

    if (!exercise) {
        return <div>Loading...</div>;
    }
	return (
  <div>
    {props.actualSection && <p>section: {props.actualSection.name}</p>}
    {props.actualSubsection && <p>subsection: {props.actualSubsection[0].name}</p>}
    
    {exercise && (
      <>
        <h1><strong>{exercise.title}</strong></h1>
        
        {exercise.advanced_level && <h3>Poziom rozszerzony</h3>}
        
        <Latex>{exercise.description}</Latex>
        
        <p><strong>Punkty:</strong> {exercise.points}</p>
        
        <p><strong>Poziom trudności:</strong> {exercise.difficult}</p>
        
        {exercise.solution_exactly && <p><strong>solution_exactly:</strong> {exercise.solution_exactly}</p>}
        
        {exercise.solution_similar.length > 0 && <p><strong>solution_similar:</strong> {exercise.solution_similar}</p>}
        
        <p><strong>type:</strong> {exercise.type}</p>
        
        {!displayAnswer && <button onClick={handleShowAnswer}>Pokaż prawidłową odpowiedź.</button>}

        {displayAnswer && <button onClick={handleShowAnswer}>Ukryj prawidłową odpowiedź.</button>}


        
        {displayAnswer && <p><strong>odpowiedź: </strong>{exercise.correct_answer}</p>}
      </>
    )}
    <ConAnswerInput 
      id={exercise.id} 
      pushExerciseToSolved={pushExerciseToSolved}
      setCorrectAnswerMessage={setCorrectAnswerMessage}
      setWrongAnswerMessage={setWrongAnswerMessage}
    />
    {isLoggedIn && 
      <>
        {!correctAnswerMessage && solvedExercisesIds ? (solvedExercisesIds.includes(exercise.id) ? <Info message={'To zadanie zostało już przez Ciebie rozwiązane.'}/> : null) : null}
      </>
    }
    {!isLoggedIn && <p>Aby sprawdzić swoją odpowiedź musisz być zalogowany.</p>}
    
    {correctAnswerMessage && <Info message={correctAnswerMessage}/>}
    {wrongAnswerMessage && <Error message={wrongAnswerMessage}/>}
    

    <MathProblemDisplay />
  </div>
);
}