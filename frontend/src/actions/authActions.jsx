export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_ACCESS_TOKEN = 'SET_LOGIN_TOKEN';
export const DELETE_ACCESS_TOKEN = 'DELETE_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'; 

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
  }
}