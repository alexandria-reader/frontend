import axios from 'axios';
import { CurrentUserLanguages, SanitizedUser, User } from '../types';

const baseUrl = 'http://localhost:3000/api/users';

const addUser = async function(newUser: User) {
  const request = await axios.post(`${baseUrl}`, newUser);
  const user: User = request.data;
  return user;
};

const setUserLanguages = async function(currentUserLanguages: CurrentUserLanguages) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.put(`${baseUrl}`, currentUserLanguages, {
    headers: { Authorization: `bearer ${token}` },
  });

  const updatedUser: SanitizedUser = request.data;
  return updatedUser;
};

export default {
  setUserLanguages,
  addUser,
};

