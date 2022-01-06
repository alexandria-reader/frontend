import axios from 'axios';
import { Webdictionary } from '../types';
import host from './host';

const baseUrl = `${host}/api/webdictionaries`;

const getBySourceTarget = async function(
  sourceLanguageId: string,
  targetLanguageId: string,
): Promise<Array<Webdictionary>> {
  const response = await axios.get(`${baseUrl}/source/${sourceLanguageId}/target/${targetLanguageId}`);

  const dictionaries: Array<Webdictionary> = response.data;
  return dictionaries;
};

export default {
  getBySourceTarget,
};
