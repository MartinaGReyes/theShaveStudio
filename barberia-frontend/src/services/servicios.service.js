import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

async function getServicios() {
  const response = await axios.get(`${API_URL}/servicios`);
  return response.data;
}

export const serviciosService = {
  getServicios,
};