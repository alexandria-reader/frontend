import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/translations/';

const addTranslation = async function(word: string, translation: string, targetLang: string) {
  const user = JSON.parse(localStorage.user);
  const { token } = user;

  const data = {
    word,
    translation,
    targetLang,
  };

  console.log(data);
  // backend needs to be changed from word id to word
  const request = await axios.post(`${baseUrl}`, data, {
    headers: { Authorization: `bearer ${token}` },
  });

  const response = request.data;
  return response;
};

export default {
  addTranslation,
};
