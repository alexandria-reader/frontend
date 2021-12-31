import axios from 'axios';
import { Language } from '../types';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://alexandria-reader-staging.herokuapp.com';

const baseUrl = `${host}/api/languages`;

const getAllLanguages = async function() {
  const request = await axios.get(`${baseUrl}/`);

  const languages: Array<Language> = request.data;
  return languages;
};

export default {
  getAllLanguages,
};
