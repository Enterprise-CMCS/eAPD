import axiosClient from 'axios';

export const apiUrl = process.env.API_URL || 'http://localhost:8000';

const axios = axiosClient.create({
  baseURL: apiUrl,
  withCredentials: true
});

// add Authorization header to axios request if jwt is present in localStorage
const presentTokenViaAuthorizationHeader = (config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}
axios.interceptors.request.use(presentTokenViaAuthorizationHeader);

export default axios;
