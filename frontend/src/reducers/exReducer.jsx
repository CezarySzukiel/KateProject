import { SET_ACTUAL_EXERCISE } from '../actions/exActions';

const initialState = {
  actualExercise: null,
}

const exReducer = (state = initialState, action) => {
  switch (action.type) {
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
