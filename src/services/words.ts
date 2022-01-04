/* eslint-disable max-len */
import axios from 'axios';
import { UserWord } from '../types';
import getToken from '../utils/getToken';
import host from './host';

const baseUrl = `${host}/api/words`;

const getUserwordsInText = async function(currentTextId:string, targetLanguageId: string): Promise<Array<UserWord>> {
  const token = getToken();

  const request = await axios.get(`${baseUrl}/text/${currentTextId}/language/${targetLanguageId}/`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const userWords: Array<UserWord> = request.data;
  return userWords;
};


const getUserwordsByLanguage = async function(languageId: string): Promise<Array<UserWord>> {
  const token = getToken();

  const request = await axios.get(`${baseUrl}/language/${languageId}/`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const userWords: Array<UserWord> = request.data;
  return userWords;
};


const addWordWithTranslation = async function(word: UserWord) {
  const token = getToken();

  const request = await axios.post(`${baseUrl}/`, word, {
    headers: { Authorization: `bearer ${token}` },
  });

  const response = request.data;
  return response;
};


const updateStatus = async function(word: UserWord) {
  const token = getToken();
  const { id, status } = word;

  const response = await axios.put(`${baseUrl}/${id}`, { status }, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response;
};

export default {
  getUserwordsInText,
  getUserwordsByLanguage,
  addWordWithTranslation,
  updateStatus,
};
