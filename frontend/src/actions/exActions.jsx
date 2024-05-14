export const SET_ACTUAL_EXERCISE = 'SET_ACTUAL_EXERCISE';
export const SET_ACTUAL_SECTION = 'SET_ACTUAL_SECTION';
export const SET_ACTUAL_SUBSECTION = 'SET_ACTUAL_SUBSECTION';
export const SET_ALL_SECTIONS = 'SET_ALL_SECTIONS';
export const SET_ALL_SUBSECTIONS = 'SET_ALL_SUBSECTIONS';
export const SET_ALL_EXERCISES = 'SET_ALL_EXERCISES';
export const SET_SELECTED_SUBSECTION_IDS = 'SET_SELECTED_SUBSECTION_IDS';
export const SET_SOLVED_EXERCISES = 'SET_SOLVED_EXERCISES';

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

export const setAllSections = (sections)  => {
	return {
		type: SET_ALL_SECTIONS,
		sections: sections 
	}
}

export const setAllSubsections = (subsections)  => {
	return {
		type: SET_ALL_SUBSECTIONS,
		subsections: subsections 
	}
}

export const setAllExercises = (exercises)  => {
	return {
		type: SET_ALL_EXERCISES,
		exercises: exercises 
	}
}

export const setSelectedSubsectionIds = (ids) => {
  return {
    type: SET_SELECTED_SUBSECTION_IDS,
    ids: ids,
  }
}

export const setSolvedExercises = (exercises) => {
	return {
		type: SET_SOLVED_EXERCISES,
		exercises: exercises,
	}
}