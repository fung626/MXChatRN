import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/',
});

export default instance;
