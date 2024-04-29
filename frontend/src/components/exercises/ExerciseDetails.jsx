import React, { useState, useEffect } from 'react';
import axios from 'axios';


export function ExerciseDetails(props) {
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    console.log('props.actualExercise.id', exercise)
      fetchExerciseData();
         console.log('props.actualExercise.id', exercise)
    }, [props.actualExercise]);

    const fetchExerciseData = async () => {
      try {
        const response = await axios.get(`http://0.0.0.0:8000/api/v1/exercises/exercise/detail/${props.actualExercise.id}/`);
        setExercise(response.data);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    if (!exercise) {
        return <div>Loading...</div>;
    }
	 return (
    <div>
      <p>section: {props.actualSection.name}</p>
      

      <p>subsection: {props.actualSubsection.name}</p>
      
      <h1><strong> {exercise.title}</strong> </h1>
      
      {exercise.advanced_level && <h3>Poziom rozszerzony</h3>}
      
      <h3>{exercise.description}</h3>
      
      <p><strong>Punkty:</strong> {exercise.points}</p>
      
      <p><strong>Poziom trudności:</strong> {exercise.difficult}</p>
      
      {exercise.solution_exactly && <p><strong>solution_exactly:</strong> {exercise.solution_exactly}</p>}
      
      {exercise.solution_similar.length > 0 && <p><strong>solution_similar:</strong> {exercise.solution_similar}</p>}
      
      <p><strong>type:</strong> {exercise.type}</p>
      
      {/*<p><strong>id:</strong> {exercise.id}</p>*/}

      <p><strong>odpowiedź: </strong>{exercise.correct_answer}</p>

    </div>
  );
}