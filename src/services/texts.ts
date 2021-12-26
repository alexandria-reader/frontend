import axios from 'axios';
import { Text } from '../types';

const baseUrl = 'http://localhost:3000/api/texts';

const getAllUserTexts = async function() {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const request = await axios.get(`${baseUrl}`, {
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
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

export default {
  getAllUserTexts,
  getTextById,
  postNewText,
};
