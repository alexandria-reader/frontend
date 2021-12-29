import axios from 'axios';
import { Translation } from '../types';

const baseUrl = 'http://localhost:3000/api/translations/';

const addTranslation = async function(translationObj: Translation) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.post(`${baseUrl}`, translationObj, {
    headers: { Authorization: `bearer ${token}` },
  });

  const response = request.data;
  return response;
};

export default {
  addTranslation,
};
