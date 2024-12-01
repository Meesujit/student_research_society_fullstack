import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({ baseURL: 'http://localhost:5000',
headers: {
    'Content-Type': 'application/json',
  },
 });

// Automatically add token to headers for every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`; // Add Bearer token
  }
  return req;
});

export default API;
