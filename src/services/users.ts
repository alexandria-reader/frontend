/* eslint-disable max-len */
import axios from 'axios';
import { SanitizedUser, User } from '../types';
import getToken from '../utils/getToken';
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

const setUserLanguages = async function(knownLanguageId: string, learnLanguageId: string): Promise<SanitizedUser> {
  const token = getToken();

  const response = await axios.put(`${baseUrl}/set-languages`, { knownLanguageId, learnLanguageId }, {
    headers: { Authorization: `bearer ${token}` },
  });

  const updatedUser: SanitizedUser = response.data;
  return updatedUser;
};


const getUserFromToken = async function(token: string) {
  const response = await axios.get(`${baseUrl}/from-token`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const foundUser: SanitizedUser = response.data;
  return foundUser;
};

const updateInfo = async function(token: string, userName: string, email: string) {
  const response = await axios.put(`${baseUrl}/update`, {
    token, userName, email,
  }, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
};

const updatePassword = async function(currentPassword: string, newPassword: string) {
  const token = getToken();
  console.log(currentPassword, newPassword);
  const response = await axios.put(`${baseUrl}/change-password`, {
    currentPassword, newPassword,
  }, {
    headers: { Authorization: `bearer ${token}` },
  });
  return response.data;
};

export default {
  setUserLanguages,
  addUser,
  getUserFromToken,
  updateInfo,
  updatePassword,
};

