import axios from 'axios';
import { Language } from '../types';
import host from './host';

const baseUrl = `${host}/api/languages`;

const getAllLanguages = async function () {
  const request = await axios.get(baseUrl);

  const languages: Array<Language> = request.data;
  return languages;
};

export default {
  getAllLanguages,
};
