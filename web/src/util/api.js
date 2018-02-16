import axiosClient from 'axios';

const axios = axiosClient.create({ withCredentials: true });

export default axios;
