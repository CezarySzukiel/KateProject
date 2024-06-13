import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

import { ConAnswerInput } from '../../containers/Ex'
import { Info, Error } from '../helpersComponents/Messages';
// import { HOC_AnswerInput } from './HOC_AnswerInput';
import { ExerciseDetailsTop } from './ExerciseDetailsTop';
import { ExerciseDetailsBottom } from './ExerciseDetailsBottom';
import MathProblemDisplay from './latextry'
import { Chart } from './Chart'

export function HOC_ExerciseDetails(props) {
  const {
    actualExercise, setActualExercise, 
    actualSection, setActualSection, 
    actualSubsection, setActualSubsection, 
    solvedExercises, pushSolvedExercise,
    allSubsections, 
    allSections } = props

  const [exercise, setExercise] = useState(null);
  const [solvedExercisesIds, setSolvedExercisesIds] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState(null);
  const [wrongAnswerMessage, setWrongAnswerMessage] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null) ;
  const isInitialMount = useRef(false);

  useEffect(() => {
      if (isInitialMount.current) {
        fetchExerciseData()
      } else {
        isInitialMount.current = true;
      }
  }, []);

  useEffect(() => {
        if (solvedExercises) {
            setSolvedExercisesIds(solvedExercises.map(exercise => exercise.id))
        }
    }, [solvedExercises])

  useEffect(() => {
    if (actualExercise.subsection) {
      setActualSubsection(allSubsections.filter((subsec) => subsec.id == actualExercise.subsection))
    }
  }, [actualExercise])

  useEffect(() => {
    if (actualSubsection) {
      setActualSection(allSections.filter((section) => section.id == actualSubsection[0].section)[0])
    }
  }, [actualSubsection])

    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(`http://0.0.0.0:8000/api/v1/exercises/exercise/detail/${actualExercise.id}/`)
        console.log('response; ', response)
        setActualExercise(response.data);
        setCorrectAnswer(response.data.answers.filter(answer => answer.correct));
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    

    if (!actualExercise || !correctAnswer) {
        return <div>Loading...</div>;
    }
	return (
  <div>
    {actualExercise && correctAnswer && (
      <>
        <ExerciseDetailsTop 
          title={actualExercise.title}
          advanced_level={actualExercise.advanced_level}
          actualSection={actualSection.name}
          actualSubsection={actualSubsection}
          exam={actualExercise.exam}
        />
                
        <Latex>{actualExercise.description}</Latex>

        <ConAnswerInput 
          setCorrectAnswerMessage={setCorrectAnswerMessage}
          setWrongAnswerMessage={setWrongAnswerMessage}
        />

        <ExerciseDetailsBottom 
          points={actualExercise.points}
          difficult={actualExercise.difficult}
          solution_exactly={actualExercise.solution_exactly}
          correctAnswer={correctAnswer}
        />
        
      </>
    )}
    
    {isLoggedIn && 
      <>
        {!correctAnswerMessage && solvedExercisesIds ? (solvedExercisesIds.includes(actualExercise.id) ? <Info message={'To zadanie zostało już przez Ciebie rozwiązane.'}/> : null) : null}
      </>
    }    
    {correctAnswerMessage && <Info message={correctAnswerMessage}/>}
    {wrongAnswerMessage && <Error message={wrongAnswerMessage}/>}
    

    {/*<MathProblemDisplay />*/}
    <Chart 
      a={9900}
      b={0}
      c={0}
      xStart={-10}
      xEnd={10}
      xStep={1}
      xOffset={0}
      yOffset={0}
    />
  </div>
);
}
