import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

import { Info, Error } from '../helpersComponents/Messages';
// import { ConAnswerInput } from '../../containers/Auth';
import { HOC_AnswerInput } from './HOC_AnswerInput';
import { ExerciseDetailsTop } from './ExerciseDetailsTop';
import { ExerciseDetailsBottom } from './ExerciseDetailsBottom';
import MathProblemDisplay from './latextry'

export function HOC_ExerciseDetails(props) {
  const [exercise, setExercise] = useState(null);
  const [solvedExercisesIds, setSolvedExercisesIds] = useState(null)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState(null)
  const [wrongAnswerMessage, setWrongAnswerMessage] = useState(null)
  const isInitialMount = useRef(false)

  useEffect(() => {
    if ((props.actualExercise && !exercise) || 
      (props.actualExercise && exercise.id !== props.actualExercise.id)
    ) { 
      if (isInitialMount.current) {
            fetchExerciseData()
        }
        else {
            isInitialMount.current = true;
        }
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
        console.log('response; ', response)
        setExercise(response.data);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    const pushExerciseToSolved = ()  => {
      props.pushSolvedExercise(exercise)
    }

    if (!exercise) {
        return <div>Loading...</div>;
    }
	return (
  <div>
    {exercise && (
      <>
        <ExerciseDetailsTop 
          title={exercise.title}
          advanced_level={exercise.advanced_level}
          actualSection={props.actualSection}
          actualSubsection={props.actualSubsection}
        />
                
        <Latex>{exercise.description}</Latex>
        <HOC_AnswerInput 
          id={exercise.id} 
          pushExerciseToSolved={pushExerciseToSolved}
          setCorrectAnswerMessage={setCorrectAnswerMessage}
          setWrongAnswerMessage={setWrongAnswerMessage}
        />
        <ExerciseDetailsBottom 
          points={exercise.points}
          difficult={exercise.difficult}
          solution_exactly={exercise.solution_exactly}
          correct_answer={exercise.correct_answer}
        />
        
      </>
    )}
    
    {isLoggedIn && 
      <>
        {!correctAnswerMessage && solvedExercisesIds ? (solvedExercisesIds.includes(exercise.id) ? <Info message={'To zadanie zostało już przez Ciebie rozwiązane.'}/> : null) : null}
      </>
    }
    {!isLoggedIn && <p>Aby sprawdzić swoją odpowiedź musisz być zalogowany.</p>}
    
    {correctAnswerMessage && <Info message={correctAnswerMessage}/>}
    {wrongAnswerMessage && <Error message={wrongAnswerMessage}/>}
    

    {/*<MathProblemDisplay />*/}
  </div>
);
}