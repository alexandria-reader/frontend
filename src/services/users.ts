import axios from 'axios';
import { User } from '../types';

const baseUrl = 'http://localhost:3000/api/users';

const addUser = async function(newUser: User) {
  const request = await axios.post(`${baseUrl}`, newUser);

  const user: User = request.data;
  return user;
};

export default {
  addUser,
};
