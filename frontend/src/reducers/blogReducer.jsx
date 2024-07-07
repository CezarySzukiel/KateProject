import { SET_ACTUAL_POST } 
from '../actions/blogActions';

const initialState = {
  actualPost: null,
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTUAL_POST:
      return {
      ...state,
      actualPost: action.payload,
      };
    default:
      return state;
  }
}

export default blogReducer