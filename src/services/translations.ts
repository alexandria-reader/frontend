import axios from 'axios';
import { Translation } from '../types';
import host from './host';

const baseUrl = `${host}/api/translations`;

const addTranslation = async function(translationObj: Translation) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const response = await axios.post(`${baseUrl}/`, translationObj, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
};

export default {
  addTranslation,
};
