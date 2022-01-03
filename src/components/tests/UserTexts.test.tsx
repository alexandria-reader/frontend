import '@testing-library/jest-dom';
import loginServices from '../../services/login';
import textsServices from '../../services/texts';

describe('Tests user ability to interact with texts', () => {
  test('Renders user text by language id', async () => {
    const user = await loginServices.loginUser({
      email: 'dana@example.com',
      password: 'danapwhash',
    });
    localStorage.setItem('user', JSON.stringify(user));
    const fetchUserTexts = await textsServices.getAllUserTextsByLanguage('en');
    expect(fetchUserTexts[0].body).toContain('It was so terribly cold.');
  });

  test('User adds new text by language', async () => {
    const newTextObj = {
      languageId: 'en',
      title: 'The Steadfast Tin Soldier',
      body: 'HERE were once five-and-twenty tin soldiers, who were all brothers, for they had been made out of the same old tin spoon. They shouldered arms and looked straight before them, and wore a splendid uniform, red and blue. The first thing in the world they ever heard were the words, “Tin soldiers!” uttered by a little boy, who clapped his hands with delight when the lid of the box, in which they lay, was taken off. They were given him for a birthday present, and he stood at the table to set them up. The soldiers were all exactly alike, excepting one, who had only one leg; he had been left to the last, and then there was not enough of the melted tin to finish him, so they made him to stand firmly on one leg, and this caused him to be very remarkable.',
    };

    await textsServices.postNewText(newTextObj);
    const fetchUserTexts = await textsServices.getAllUserTextsByLanguage('en');
    console.log(fetchUserTexts);
    expect(fetchUserTexts[fetchUserTexts.length - 1].body).toContain('HERE were once five-and-twenty tin soldiers');
  });

  test('User deletes existing text', async () => {
    const fetchUserTexts = await textsServices.getAllUserTextsByLanguage('en');
    const lastInsertedId = fetchUserTexts[fetchUserTexts.length - 1].id;
    if (lastInsertedId) await textsServices.removeTextFromServer(lastInsertedId);
    const fetchUserTextsAgain = await textsServices.getAllUserTextsByLanguage('en');
    expect(fetchUserTextsAgain[fetchUserTextsAgain.length - 1].body).not.toContain('HERE were once five-and-twenty tin soldiers');
  });
});
