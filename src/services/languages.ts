import axios from 'axios';
import { Language } from '../types';
import dbHost from './dbHost';

const baseUrl = `${dbHost}/api/languages`;

const getAllLanguages = async function() {
  const request = await axios.get(`${baseUrl}/`);

  const languages: Array<Language> = request.data;
  return languages;
};

export default {
  getAllLanguages,
};
