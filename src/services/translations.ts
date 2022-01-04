import axios from 'axios';
import { Translation } from '../types';
import getToken from '../utils/getToken';
import host from './host';

const baseUrl = `${host}/api/translations`;

const addTranslation = async function(translationObj: Translation) {
  const token = getToken();

  const response = await axios.post(`${baseUrl}/`, translationObj, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
};

export default {
  addTranslation,
};
