import axiosClient from 'axios';

export const apiUrl = process.env.API_URL || 'http://localhost:8000';

const axios = axiosClient.create({
  baseURL: apiUrl,
  withCredentials: true
});

export default axios;
