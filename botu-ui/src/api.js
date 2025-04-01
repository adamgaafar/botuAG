import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Ensure this points to the backend
});

export default api;
