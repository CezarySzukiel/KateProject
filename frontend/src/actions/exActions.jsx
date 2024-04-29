export const SET_ACTUAL_EXERCISE = 'SET_ACTUAL_EXERCISE'
export const SET_ACTUAL_SECTION = 'SET_ACTUAL_SECTION'
export const SET_ACTUAL_SUBSECTION = 'SET_ACTUAL_SUBSECTION'



export const setActualExercise = (exercise) => {
	return {
		type: SET_ACTUAL_EXERCISE,
		exercise: exercise,
	}
}

export const setActualSection = (section) => {
	return {
		type: SET_ACTUAL_SECTION,
		section: section,
	}
}

export const setActualSubsection = (subsection) => {
	return {
		type: SET_ACTUAL_SUBSECTION,
		subsection: subsection,
	}
}
