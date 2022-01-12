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

const updateTranslation = async function(translationObj: Translation) {
  const token = getToken();
  console.log(translationObj);
  const response = await axios.put(`${baseUrl}/translation/${translationObj.id}`, translationObj, {
    headers: { Authorization: `bearer ${token}` },
  });

  // update once backend correctly returns modified object
  const updatedTranslation = response.data.rows[0];
  return updatedTranslation;
};

const removeTranslation = async function(translationObj: Translation) {
  const token = getToken();

  const response = await axios.delete(`${baseUrl}/${translationObj.id}`, {
    headers: { Authorization: `bearer ${token}` },
  });

  // update once backend correctly returns modified object
  const deletedTranslation = response.data.rows[0];
  return deletedTranslation;
};

export default {
  addTranslation,
  removeTranslation,
  updateTranslation,
};
