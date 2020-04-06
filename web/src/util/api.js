import axiosClient from 'axios';

export const apiUrl = process.env.API_URL || 'http://localhost:8000';

const headers = {}
const jwt = localStorage.getItem('token');
if (!!jwt) headers['Authorization'] = `Bearer ${jwt}`

const axios = axiosClient.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: headers
});

export default axios;
