import axios from 'axios';
import { UserWord } from '../types';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const baseUrl = `${host}/api/words`;

const getUserwordsInText = async function(currentTextId:string, targetLanguageId: string) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.get(`${baseUrl}/text/${currentTextId}/language/${targetLanguageId}/`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const userWords: UserWord[] = request.data;
  return userWords;
};

const addWordWithTranslation = async function(word: UserWord) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  // backend needs to be changed from word id to word
  const request = await axios.post(`${baseUrl}/`, word, {
    headers: { Authorization: `bearer ${token}` },
  });

  const response = request.data;
  return response;
};

const updateStatus = async function(word: UserWord) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;
  const { id, status } = word;

  const response = await axios.put(`${baseUrl}/${id}`, { status }, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response;
};

export default {
  getUserwordsInText,
  addWordWithTranslation,
  updateStatus,
};
