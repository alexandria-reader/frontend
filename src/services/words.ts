/* eslint-disable max-len */
import axios from 'axios';
import { UserWord } from '../types';
import host from './host';

const baseUrl = `${host}/api/words`;

const getUserwordsInText = async function(currentTextId:string, targetLanguageId: string, token: string): Promise<Array<UserWord>> {
  const request = await axios.get(`${baseUrl}/text/${currentTextId}/language/${targetLanguageId}/`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const userWords: Array<UserWord> = request.data;
  return userWords;
};


const getUserwordsByLanguage = async function(languageId: string, token: string): Promise<Array<UserWord>> {
  const request = await axios.get(`${baseUrl}/language/${languageId}/`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const userWords: Array<UserWord> = request.data;
  return userWords;
};


const addWordWithTranslation = async function(word: UserWord, token: string) {
  const request = await axios.post(`${baseUrl}/`, word, {
    headers: { Authorization: `bearer ${token}` },
  });

  const response = request.data;
  return response;
};


const updateStatus = async function(word: UserWord, token: string) {
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
