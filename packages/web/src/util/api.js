import axiosClient from 'axios';
import { getLocalAccessToken } from './auth';

export const apiUrl = process.env.API_URL || 'http://localhost:8000';

const axios = axiosClient.create({
  baseURL: apiUrl
});

// add Authorization header to axios request if jwt is present in localStorage
const presentTokenViaAuthorizationHeader = async config => {
  // retrieve access token from local storage
  const accessToken = getLocalAccessToken() || null;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
axios.interceptors.request.use(presentTokenViaAuthorizationHeader);

export default axios;
