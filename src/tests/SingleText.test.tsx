import '@testing-library/jest-dom';
import loginServices from '../services/login';
import wordsService from '../services/words';
import textsService from '../services/texts';

describe('Tests single text and user words', () => {
  test('Gets user words in a piece of text', async () => {
    const user = await loginServices.loginUser({
      email: 'dana@example.com',
      password: 'danapwhash',
    });
    localStorage.setItem('user', JSON.stringify(user));
    const fetchUserWords = await wordsService.getUserwordsInText('69', 'fr');
    expect(fetchUserWords[0].status).toBe('learning');
    expect(fetchUserWords[0].word).toBe('of course');
    expect(fetchUserWords[0].translations[0].translation).toBe('bien sûr');
  });
  test('Gets text by id', async () => {
    const fetchTextById = await textsService.getTextById('69');
    expect(fetchTextById.body).toContain('It was so terribly cold.');
  });
});


