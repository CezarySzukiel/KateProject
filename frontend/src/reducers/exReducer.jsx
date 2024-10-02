import { SET_ACTUAL_EXERCISE, 
SET_ACTUAL_SECTION, 
SET_ACTUAL_SUBSECTION, 
SET_ALL_SECTIONS,
SET_ALL_SUBSECTIONS,
SET_ALL_EXERCISES, 
SET_SELECTED_SUBSECTION_IDS, 
SET_SOLVED_EXERCISES, 
PUSH_SOLVED_EXERCISE,
SET_ACTIVE_INPUT,
SET_USER_ANSWER, } 
from '../actions/exActions';

const initialState = {
  actualExercise: null,
  actualSection: null,
  actualSubsection: null,
  allSections: null,
  allSubsections: null,
  allExercises: null,
  selectedSubsectionIds: null,
  solvedExercises: [],
  activeInputRef: null,
  userAnswer: [],
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
        allSubsections: action.subsections
      };
    case SET_ALL_EXERCISES:
      return {
        ...state,
        allExercises: action.exercises
      };
    case SET_SELECTED_SUBSECTION_IDS:
      return {
        ...state,
        selectedSubsectionIds: action.ids
      }
    case SET_SOLVED_EXERCISES:
      return {
        ...state,
        solvedExercises: action.exercises
      }
    case PUSH_SOLVED_EXERCISE:
      return {
        ...state,
        solvedExercises: [...state.solvedExercises, action.exercise]
      }
    case SET_ACTIVE_INPUT:
      console.log('SET_ACTIVE_INPUT', action.payload);
      return {
        ...state,
        activeInputRef: action.payload
      };
    case SET_USER_ANSWER:
      return {
        ...state,
        userAnswer: action.payload
      }
    default:
      return state;
  }
};

export default exReducer
