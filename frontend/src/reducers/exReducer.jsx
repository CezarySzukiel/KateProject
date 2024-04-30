import { SET_ACTUAL_EXERCISE, 
SET_ACTUAL_SECTION, 
SET_ACTUAL_SUBSECTION, 
SET_ALL_SECTIONS,
SET_ALL_SUBSECTIONS,
SET_ALL_EXERCISES, } 
from '../actions/exActions';

const initialState = {
  actualExercise: null,
  actualSection: null,
  actualSubsection: null,
  allSections: null,
  allSubsections: null,
  allExercises: null,
}

const exReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_ACTUAL_SECTION:
    return {
        ...state,
        actualSection: action.section,
      };
      case SET_ACTUAL_SUBSECTION:
    return {
        ...state,
        actualSubsection: action.subsection,
      };
   	case SET_ACTUAL_EXERCISE:
	  return {
        ...state,
        actualExercise: action.exercise,
      };
    case SET_ALL_SECTIONS:
      return {
        ...state,
        allSections: action.sections,
      };
    case SET_ALL_SUBSECTIONS:
      return {
        ...state,
        allSubsections: actions.subsections
      };
    case SET_ALL_EXERCISES:
      return {
        ...state,
        allExercises: actions.exercises
      }
    default:
      return state;
  }
};

export default exReducer
