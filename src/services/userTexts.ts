import axios from 'axios';
import { Text } from '../types';

const baseUrl = 'http://localhost:3000/api/texts'

const getAllUserTexts = async function() {
  const request = await axios.get(`${baseUrl}`);
  console.log(request.data)
  const texts: Array<Text> = request.data;
  return texts;
}

const getTextById = async function(id: string) {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
}

export default {
  getAllUserTexts,
  getTextById
}