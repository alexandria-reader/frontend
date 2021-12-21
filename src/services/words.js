import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/words'

const getWordsFromText = async function(id) {
  // const request = await axios.get(`${baseUrl}/text/${id}/user/1`);
  // return request.data;

  return [
    {id: 1, word: 'of course', state: 'familiar'},
    {id: 3, word: 'across the road', state: 'learning'},
    {id: 7, word: 'bareheaded', state: 'learned'},
    {id: 9, word: 'carriages', state: 'learning'}
  ]
}

export default {
  getWordsFromText,
}