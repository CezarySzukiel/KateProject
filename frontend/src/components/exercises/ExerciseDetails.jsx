export function ExerciseDetails(props) {
	const exercise = props.actualExercise
  console.log(props)
	 return (
    <div>
      <p>section: {props.actualSection.name}</p>
      

      <p>subsection: {props.actualSubsection.name}</p>
      
      <h1><strong> {exercise.title}</strong> </h1>
      
      {exercise.advanced_level && <h3>Poziom rozszerzony</h3>}
      
      <h3><strong>description:</strong> {exercise.description}</h3>
      
      <p><strong>Punkty:</strong> {exercise.points}</p>
      
      <p><strong>Poziom trudności:</strong> {exercise.difficult}</p>
      
      {exercise.solution_exactly && <p><strong>solution_exactly:</strong> {exercise.solution_exactly}</p>}
      
      {exercise.solution_similar.length > 0 && <p><strong>solution_similar:</strong> {exercise.solution_similar}</p>}
      
      <p><strong>type:</strong> {exercise.type}</p>
      
      <p><strong>id:</strong> {exercise.id}</p>

      <p><strong>odpowiedź: </strong> dodać odpowiedź</p>

    </div>
  );
}