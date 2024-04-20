import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_ACCESS_TOKEN, DELETE_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
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
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.token
      }
    case DELETE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: ''
      }
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.token
      }
    default:
      return state;
  }
};

export default authReducer;
