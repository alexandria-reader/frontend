import axios from 'axios';
import { LoginDetails } from '../types';

const baseUrl = 'http://localhost:3000/api/login';

const loginUser = async function(credentials: LoginDetails) {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

export default {
  loginUser,
};
