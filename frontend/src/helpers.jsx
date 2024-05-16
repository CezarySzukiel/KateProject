import axios from 'axios';

export const getTokens = (refreshToken) => {
  return async () => {
    console.log("refreshToken: ", refreshToken)
    try {
      const response = await axios.post('http://0.0.0.0:8000/api/v1/auth/token/refresh/', {
        refresh: refreshToken
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('response; ', response)
        return response.data
      }
    } catch (error) {
      console.error(error);
    }
  };
};
  
export const getSectionsAndSubsections = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/api/v1/exercises/all-sections-and-subsections/')
        return response
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

export const extractSections = (response) => (response.data.map(item => ({
        id: item.id,
        name: item.name
      })));

export const extractSubsections = (response) => {
    return response.data.reduce((acc, item) => {
        if (item.subsections) {
            item.subsections.forEach(subsection => {
                acc.push(subsection);
            });
        }
        return acc;
    }, []);
};
