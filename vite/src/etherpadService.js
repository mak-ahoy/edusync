
import axios from 'axios';


const ETHERPAD_API_URL = 'http://localhost:9001'; // Replace with your Etherpad API URL
const API_KEY = 'yourapikey'; // Replace with your Etherpad API key

const createPad = async (padId) => {
  try {
    const response = await axios.post(`${ETHERPAD_API_URL}/createPad`, null, {
      params: {
        apikey: API_KEY,
        padID: padId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating pad:', error);
    throw error;
  }
};

const getPadText = async (padId) => {
  try {
    const response = await axios.get(`${ETHERPAD_API_URL}/getText`, {
      params: {
        apikey: API_KEY,
        padID: padId,
      },
    });
    return response.data.data.text;
  } catch (error) {
    console.error('Error getting pad text:', error);
    throw error;
  }
};

export { createPad, getPadText };
