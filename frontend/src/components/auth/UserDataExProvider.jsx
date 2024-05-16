import React, { useState } from 'react';

import { ConUserData } from '../../containers/Auth'

export function ExProvider(props) {
	const {solvedExercises, setSolvedExercises} = props
	const setSolvedExercisesGlobal = (exercises) => {
		setSolvedExercises(exercises)
	}
	return (
		<ConUserData 
			setSolvedExercises={setSolvedExercisesGlobal} 
			solvedExercises={solvedExercises}
		/>
	)
}
