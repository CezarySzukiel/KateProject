export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_LOGIN_TOKEN = 'SET_LOGIN_TOKEN';
export const DELETE_LOGIN_TOKEN = 'DELETE_LOGIN_TOKEN';

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const setLoginToken = (token) => {
  return {
    type: SET_LOGIN_TOKEN,
    token: token,
  };
};

export const deleteLoginToken = () => {
  return {
    type: DELETE_LOGIN_TOKEN,
  };
};