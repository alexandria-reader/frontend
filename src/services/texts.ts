import axios from 'axios';
import { Text } from '../types';

const baseUrl = 'http://localhost:3000/api/texts';

const getAllUserTextsByLanguage = async function(languageId: string) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.get(`${baseUrl}/language/${languageId}`, {
    headers: { Authorization: `bearer ${token}` },
  });

  const texts: Array<Text> = request.data;
  return texts;
};

const postNewText = async function(newText: Text) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.post(`${baseUrl}`, newText, {
    headers: { Authorization: `bearer ${token}` },
  });

  const text: Text = request.data;
  return text;
};

const getTextById = async function(id: string) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });

  return request.data;
};

const removeTextFromServer = async function(id: number) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  });

  // backend is not returning deleted text while code is 204
  return response.data;
};

export default {
  getAllUserTextsByLanguage,
  getTextById,
  postNewText,
  removeTextFromServer,
};
