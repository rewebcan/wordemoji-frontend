import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: process.env.VUE_APP_WS_URL,
});

export default defaultAxios;