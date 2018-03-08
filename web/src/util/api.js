import axiosClient from 'axios';

const axios = axiosClient.create({
  baseURL: process.env.API_URL || 'http://localhost:8000',
  withCredentials: true
});

export default axios;
