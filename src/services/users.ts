import axios from 'axios';
import { CurrentUserLanguages, SanitizedUser } from '../types';

const baseUrl = 'http://localhost:3000/api/users/';

const setUserLanguages = async function(currentUserLanguages: CurrentUserLanguages) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.put(`${baseUrl}set-languages`, currentUserLanguages, {
    headers: { Authorization: `bearer ${token}` },
  });

  const updatedUser: SanitizedUser = request.data;
  return updatedUser;
};

export default {
  setUserLanguages,
};
