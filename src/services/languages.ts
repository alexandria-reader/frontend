import axios from 'axios';
import { Language } from '../types';

const baseUrl = 'http://localhost:3000/api/languages';

const getAllLanguages = async function() {
  const request = await axios.get(`${baseUrl}`);

  const languages: Array<Language> = request.data;
  return languages;
};

export default {
  getAllLanguages,
};
