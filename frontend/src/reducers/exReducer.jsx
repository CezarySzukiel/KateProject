import { SET_ACTUAL_EXERCISE, SET_ACTUAL_SECTION, SET_ACTUAL_SUBSECTION } from '../actions/exActions';

const initialState = {
  actualExercise: null,
  actualSection: null,
  actualSubsection: null,
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
    default:
      return state;
  }
};

export default exReducer
