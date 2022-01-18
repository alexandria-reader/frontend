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

const setUserLanguages = async function(knownLanguageId: string, learnLanguageId: string) {
  const token = getToken();

  const response = await axios.put(`${baseUrl}/set-languages`, { knownLanguageId, learnLanguageId }, {
    headers: { Authorization: `bearer ${token}` },
  });

  // const updatedUser: SanitizedUser = response.data;
  return response.data;
};


const getUserFromToken = async function(token: string) {
  const response = await axios.get(`${baseUrl}/from-token`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const foundUser: SanitizedUser = response.data;
  return foundUser;
};

const updateInfo = async function(userName: string, email: string) {
  const token = getToken();
  const response = await axios.put(`${baseUrl}/update`, {
    userName, email,
  }, {
    headers: { Authorization: `bearer ${token}` },
  }).then((res) => res)
    .catch((error) => {
      const { message } = error.response.data.error;
      return message;
    });

  return response.data;
};

const updatePassword = async function(currentPassword: string, newPassword: string) {
  const token = getToken();
  const response = await axios.put(`${baseUrl}/change-password`, {
    currentPassword, newPassword,
  }, {
    headers: { Authorization: `bearer ${token}` },
  }).then((res) => res)
    .catch((error) => {
      const { message } = error.response.data.error;
      return message;
    });
  return response;
};

const confirmPassword = async function(password: string) {
  const token = getToken();

  const response = await axios.post(`${baseUrl}/confirm`, {
    password,
  }, {
    headers: { Authorization: `bearer ${token}` },
  }).then((res) => res)
    .catch((error) => {
      const { message } = error.response.data.error;
      return message;
    });

  const { match } = response.data;
  return match === 'true';
};

const removeUser = async function() {
  const token = getToken();

  const response = await axios.delete(`${baseUrl}/`, {
    headers: { Authorization: `bearer ${token}` },
  }).then((res) => res)
    .catch((error) => {
      const { message } = error.response.data.error;
      return message;
    });

  return response;
};

export default {
  setUserLanguages,
  addUser,
  getUserFromToken,
  updateInfo,
  updatePassword,
  confirmPassword,
  removeUser,
};

