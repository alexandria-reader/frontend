import axios from 'axios';
import { UserWord } from '../types';

const baseUrl = 'http://localhost:3000/api/words/';

const getUserwordsInText = async function(textId: number, targetLanguageId: string = 'de') {
  const request = await axios.get(`${baseUrl}text/${textId}/${targetLanguageId}/user/1`);
  const userWords: UserWord[] = request.data;
  return userWords;
};

export default {
  getUserwordsInText,
};
