import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

async function getBarberos() {
  const response = await axios.get(`${API_URL}/barberos`);
  return response.data;
}

export const barberosService = {
  getBarberos,
};