export const SET_ACTUAL_EXERCISE = 'SET_ACTUAL_EXERCISE'

export const setActualExercise = (exercise) => {
	return {
		type: SET_ACTUAL_EXERCISE,
		exercise: exercise,
	}
}
