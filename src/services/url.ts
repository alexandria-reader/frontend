import axios from 'axios';
// import { Text } from '../types';
import host from './host';
import getToken from '../utils/getToken';

const baseUrl = `${host}/api/url`;

const postURL = async function(url: string) {
  const token = getToken();

  const response = await axios.post(`${baseUrl}`, { url }, {
    headers: { Authorization: `bearer ${token}` },
  });

  const text = response.data;
  return text;
};

export default {
  postURL,
};
