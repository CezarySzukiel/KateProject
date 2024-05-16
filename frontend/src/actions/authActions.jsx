export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_ACCESS_TOKEN = 'SET_LOGIN_TOKEN';
export const DELETE_ACCESS_TOKEN = 'DELETE_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const DELETE_REFRESH_TOKEN = 'DELETE_REFRESH_TOKEN' ;
export const SET_USER_DATA = 'SET_USER_DATA';
export const DELETE_USER_DATA = 'DELETE_USER_DATA';

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

export const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    token: token,
  };
};

export const deleteAccessToken = () => {
  return {
    type: DELETE_ACCESS_TOKEN,
  };
};

export const setRefreshToken = (token) => {
  return {
    type: SET_REFRESH_TOKEN,
    token: token,
  };
};

export const deleteRefreshToken = () => {
  return {
    type: DELETE_REFRESH_TOKEN,
  };
};

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    data:data,
  };
};

export const deleteUserData = () => {
  return {
    type: DELETE_USER_DATA,
  };
};

