import axios from 'axios';
import { LoginDetails } from '../types';
import dbHost from './dbHost';

const baseUrl = `${dbHost}/api/login`;

const loginUser = async function(credentials: LoginDetails) {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

export default {
  loginUser,
};
