import axiosClient from 'axios';
import oktaAuth from './oktaAuth';

export const apiUrl = process.env.API_URL || 'http://localhost:8000';

const axios = axiosClient.create({
  baseURL: apiUrl
});

// add Authorization header to axios request if jwt is present in localStorage
const presentTokenViaAuthorizationHeader = async config => {
  // retrieve access token from local storage
  const { accessToken } = await oktaAuth.tokenManager.get('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
axios.interceptors.request.use(presentTokenViaAuthorizationHeader);

export default axios;
