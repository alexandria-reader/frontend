/* eslint-disable max-len */
import axios from 'axios';
import { SanitizedUser, User } from '../types';
import host from './host';

const baseUrl = `${host}/api/users`;

const addUser = async function(newUser: User) {
  const response = await axios.post(`${baseUrl}/`, newUser)
    .then((res) => res)
    .catch((error) => {
      const { message } = error.response.data.error;
      return message;
    });
  return response;
};


const setUserLanguages = async function(knownLanguageId: string, learnLanguageId: string, token: string): Promise<SanitizedUser> {
  const response = await axios.put(`${baseUrl}/set-languages`, { knownLanguageId, learnLanguageId }, {
    headers: { Authorization: `bearer ${token}` },
  });

  const updatedUser: SanitizedUser = response.data;
  return updatedUser;
};


const getUserFromToken = async function(token: string) {
  const response = await axios.put(`${baseUrl}/from-token`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const foundUser: SanitizedUser = response.data;
  return foundUser;
};

export default {
  setUserLanguages,
  addUser,
  getUserFromToken,
};

