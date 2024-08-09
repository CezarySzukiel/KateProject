import './hocExerciseDetails.css'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

import { ConAnswerInput } from '../../containers/Ex'
import { Info, Error } from '../helpersComponents/Messages';
import { ExerciseDetailsTop } from './ExerciseDetailsTop';
import { ExerciseDetailsBottom } from './ExerciseDetailsBottom';
import { Chart } from './Chart'
import { LatexTable } from './LatexTable'
import MathProblemDisplay from './latextry'

export function HOC_ExerciseDetails(props) {
  const {
    actualExercise, setActualExercise, 
    actualSection, setActualSection, 
    actualSubsection, setActualSubsection, 
    solvedExercises, pushSolvedExercise,
    allSubsections, 
    allSections,
    setActiveInput, activeInputRef, 
    setUserAnswer, } = props

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
  <div className={"exercise-details-container"}>
    {actualExercise && correctAnswer && (
      <>
        <ExerciseDetailsTop 
          title={actualExercise.title}
          advanced_level={actualExercise.advanced_level}
          actualSection={actualSection.name}
          actualSubsection={actualSubsection}
          exam={actualExercise.exam}
          points={actualExercise.points}
          difficult={actualExercise.difficult}
        />
        <div className={'description'}>
          <Latex>{actualExercise.description}</Latex>
        </div>
        {actualExercise.functions.length > 0 && 
          actualExercise.functions.map((func) => (
            <Chart 
              key={func.id}
              data={func}
            />
          ))
        }

        <ConAnswerInput 
          setCorrectAnswerMessage={setCorrectAnswerMessage}
          setWrongAnswerMessage={setWrongAnswerMessage}
        />

        <ExerciseDetailsBottom 
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
    {actualExercise.type == 9 && <LatexTable 
      setActiveInput={setActiveInput}
      activeInputRef={activeInputRef}
      setUserAnswer={setUserAnswer}
    />}

    {/*<MathProblemDisplay />*/}
  </div>
);
}
