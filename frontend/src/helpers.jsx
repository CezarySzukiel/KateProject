import axios from 'axios';

export const getTokens = (refreshToken) => {
  return async () => {
    try {
      const response = await axios.post('http://0.0.0.0:8000/api/v1/auth/token/refresh/', {
        refresh: refreshToken
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error);
    }
  };
};