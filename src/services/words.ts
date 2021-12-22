import axios from 'axios';
import { convertUserWordType, DbUserWord, UserWord } from '../types';

const baseUrl = 'http://localhost:3000/api/words/';

const getWordsFromText = async function(textId: string, _languageId: string) {
  const request = await axios.get(`${baseUrl}text/${textId}/de/user/1`);
  const words: DbUserWord[] = request.data;
  const userWords: UserWord[] = [];
  words.forEach((word) => userWords.push(convertUserWordType(word)));
  return userWords;
};

export default {
  getWordsFromText,
};
