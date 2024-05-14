import React, { useState } from 'react';

import { ConUserData } from '../../containers/Auth'

export function ExProvider({ children, setSolvedExercises }) {

	const setSolvedExercisesGlobal = (exercises) => {
		setSolvedExercises(exercises)
	}
	return (
		<ConUserData setSolvedExercises={setSolvedExercisesGlobal} />
	)
}
