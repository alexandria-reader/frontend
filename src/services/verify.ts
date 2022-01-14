/* eslint-disable max-len */
import axios from 'axios';
import getToken from '../utils/getToken';
import host from './host';

const baseUrl = `${host}/verify`;

const resendEmail = async function(): Promise<boolean> {
  const token = getToken();
  try {
    const response = await axios.get(`${baseUrl}/resend-email`, {
      headers: { Authorization: `bearer ${token}` },
    });
    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};

export default {
  resendEmail,
};
