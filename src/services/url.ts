import axios from 'axios';
// import { Text } from '../types';
import host from './host';
import getToken from '../utils/getToken';
import { ArticleData } from '../types';

const baseUrl = `${host}/api/url`;

const postURL = async function (url: string) {
  const token = getToken();

  const response = await axios.post(
    `${baseUrl}`,
    { url },
    {
      headers: { Authorization: `bearer ${token}` },
    }
  );

  if (response.status === 204) {
    return null;
  }

  const textObject: ArticleData = response.data;
  return textObject;
};

export default {
  postURL,
};
