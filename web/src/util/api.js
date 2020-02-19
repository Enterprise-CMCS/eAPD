export const apiUrl = process.env.API_URL || 'http://localhost:8000';

import axiosClient from 'axios';

const axios = axiosClient.create({
  baseURL: apiUrl,
  withCredentials: true
});

export default axios;
