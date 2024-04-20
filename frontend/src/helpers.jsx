import axios from 'axios';

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post('http://0.0.0.0:8000/api/v1/token/refresh/', {
      refresh: refreshToken
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};