import React, { useState } from 'react';


export function ExerciseDetailsBottom(props) {
	const [displayAnswer, setDisplayAnswer] = useState(false)

	const handleShowAnswer = () => {
      setDisplayAnswer(!displayAnswer)
    }

	return (
		<>
			<p><strong>Punkty:</strong> {props.points}</p>
	        
	        <p><strong>Poziom trudności:</strong> {props.difficult}</p>
	        
	        {props.solution_exactly && <p><strong>solution_exactly:</strong> {props.solution_exactly}</p>}
	        
	        {props.solution_similar && props.solution_similar.length > 0 && <p><strong>solution_similar:</strong> {props.solution_similar}</p>}
	        
	        {!displayAnswer && <button onClick={handleShowAnswer}>Pokaż prawidłową odpowiedź.</button>}

	        {displayAnswer && <button onClick={handleShowAnswer}>Ukryj prawidłową odpowiedź.</button>}

	        {displayAnswer && <p>Poprawna odpowiedź to: <strong>{props.correctAnswer}</strong></p>}
        </>
	)
}
