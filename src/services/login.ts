import axios from 'axios';
import { LoggedInUser, LoginDetails } from '../types';
import host from './host';

const baseUrl = `${host}/api/login`;

const loginUser = async function(credentials: LoginDetails): Promise<LoggedInUser> {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

export default {
  loginUser,
};
