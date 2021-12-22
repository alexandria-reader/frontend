import axios from 'axios';
import { UserWord } from '../types';
const baseUrl = 'http://localhost:3000/api/words/'

const getWordsFromText = async function(textId: string, languageId: string) {
  // const request = await axios.get(`${baseUrl}text/${textId}/${languageId}/user/1`);
  // const words: UserWord = request.data;
  // return words;

  const words: UserWord[] = [
    {id: 1, word: 'of course', state: 'familiar', translations: [], contexts: []},
    {id: 3, word: 'across the road', state: 'learning', translations: [], contexts: []},
    {id: 7, word: 'bareheaded', state: 'learned', translations: [], contexts: []},
    {id: 9, word: 'carriages', state: 'learning', translations: [], contexts: []}
  ]

  return words;
}

export default {
  getWordsFromText,
}