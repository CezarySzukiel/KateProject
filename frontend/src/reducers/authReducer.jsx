import { 
  LOGIN_SUCCESS, 
  LOGOUT_SUCCESS, 
  SET_ACCESS_TOKEN, 
  DELETE_ACCESS_TOKEN, 
  SET_REFRESH_TOKEN,
  DELETE_REFRESH_TOKEN, 
  SET_USER_DATA, 
  DELETE_USER_DATA, 
} from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  userData: '',
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
    case DELETE_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: ''
      }
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.data
      }
    case DELETE_USER_DATA:
      return {
        ...state,
        userData: 0,
      }
    default:
      return state;
  }
};

export default authReducer;
