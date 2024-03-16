import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_LOGIN_TOKEN, DELETE_LOGIN_TOKEN } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  loginToken: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SET_LOGIN_TOKEN:
      return {
        ...state,
        loginToken: action.token
      }
    case DELETE_LOGIN_TOKEN:
      return {
        ...state,
        loginToken: ''
      }
    default:
      return state;
  }
};

export default authReducer;
