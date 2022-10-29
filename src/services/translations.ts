import axios from 'axios';
import { Translation } from '../types';
import getToken from '../utils/getToken';
import host from './host';

const baseUrl = `${host}/api/translations`;

const addTranslation = async function (translationObj: Translation) {
  const token = getToken();

  const response = await axios.post(`${baseUrl}/`, translationObj, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
};

const updateTranslation = async function (translationObj: Translation) {
  const token = getToken();

  const response = await axios.put(
    `${baseUrl}/${translationObj.id}`,
    translationObj,
    {
      headers: { Authorization: `bearer ${token}` },
    }
  );

  const updatedTranslation = response.data;
  return updatedTranslation;
};

const removeTranslation = async function (translationObj: Translation) {
  const token = getToken();

  const response = await axios.delete(`${baseUrl}/${translationObj.id}`, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.status === 204;
};

export default {
  addTranslation,
  removeTranslation,
  updateTranslation,
};
