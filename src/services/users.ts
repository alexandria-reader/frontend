import axios from 'axios';
import { CurrentUserLanguages, User } from '../types';

const baseUrl = 'http://localhost:3000/api/users';

const setUserLanguages = async function(currentUserLanguages: CurrentUserLanguages) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.put(`${baseUrl}`, currentUserLanguages, {
    headers: { Authorization: `bearer ${token}` },
  });

  const updatedUser: User = request.data;
  return updatedUser;
};

export default {
  setUserLanguages,
};
