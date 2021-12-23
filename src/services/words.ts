import axios from 'axios';
import { UserWord } from '../types';

const baseUrl = 'http://localhost:3000/api/words/';

const getWordsFromText = async function(textId: string, _languageId: string) {
  const request = await axios.get(`${baseUrl}text/${textId}/de/user/1`);
  const userWords: UserWord[] = request.data;
  return userWords;
};

export default {
  getWordsFromText,
};
