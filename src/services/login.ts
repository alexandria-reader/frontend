import axios from 'axios';
import { LoginDetails } from '../types';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://alexandria-reader-staging.herokuapp.com';

const baseUrl = `${host}/api/login`;

const loginUser = async function(credentials: LoginDetails) {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

export default {
  loginUser,
};
