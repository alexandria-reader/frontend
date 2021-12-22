import axios from 'axios';
import { convertUserWordType, DbUserWord, UserWord } from '../types';
const baseUrl = 'http://localhost:3000/api/words/'

const getWordsFromText = async function(textId: string, _languageId: string) {
  const request = await axios.get(`${baseUrl}text/${textId}/de/user/1`);
  const words: DbUserWord[] = request.data;
  let userWords: UserWord[] = [];
  words.forEach(word => userWords.push(convertUserWordType(word)))
  return userWords;


  // const words: UserWord[] = [
  //   {id: 1, word: 'of course', state: 'familiar', translations: [], contexts: []},
  //   {id: 3, word: 'across the road', state: 'learning', translations: [], contexts: []},
  //   {id: 7, word: 'bareheaded', state: 'learned', translations: [], contexts: []},
  //   {id: 9, word: 'carriages', state: 'learning', translations: [], contexts: []}
  // ]

  // return words;
}

export default {
  getWordsFromText,
}