/* eslint-disable max-len */
// import '@testing-library/jest-dom';
// // import loginServices from '../services/login';
// // import textsServices from '../services/texts';

// xdescribe('Tests user ability to interact with texts', () => {
//   test('Renders user text by language id', async () => {
//     const user = await loginServices.loginUser({
//       email: 'dana@example.com',
//       password: 'danapwhash',
//     });
//     localStorage.setItem('user', JSON.stringify(user));
//     const fetchUserTexts = await textsServices.getAllUserTextsByLanguage('en');
//     expect(fetchUserTexts[0].body).toContain('It was so terribly cold.');
//   });

//   test('User adds new text by language', async () => {
//     const newTextObj = {
//       languageId: 'en',
//       title: 'The Steadfast Tin Soldier',
//       body: 'HERE were once five-and-twenty tin soldiers, who were all brothers, for they had been made out of the same old tin spoon. They shouldered arms and looked straight before them, and wore a splendid uniform, red and blue. The first thing in the world they ever heard were the words, “Tin soldiers!” uttered by a little boy, who clapped his hands with delight when the lid of the box, in which they lay, was taken off. They were given him for a birthday present, and he stood at the table to set them up. The soldiers were all exactly alike, excepting one, who had only one leg; he had been left to the last, and then there was not enough of the melted tin to finish him, so they made him to stand firmly on one leg, and this caused him to be very remarkable.',
//     };

//     await textsServices.postNewText(newTextObj);
//     const fetchUserTexts = await textsServices.getAllUserTextsByLanguage('en');
//     expect(fetchUserTexts[fetchUserTexts.length - 1].body).toContain('HERE were once five-and-twenty tin soldiers');
//   });

//   test('User deletes existing text', async () => {
//     const fetchUserTexts = await textsServices.getAllUserTextsByLanguage('en');
//     const lastInsertedId = fetchUserTexts[fetchUserTexts.length - 1].id;
//     if (lastInsertedId) await textsServices.removeTextFromServer(lastInsertedId);
//     const fetchUserTextsAgain = await textsServices.getAllUserTextsByLanguage('en');
//     expect(fetchUserTextsAgain[fetchUserTextsAgain.length - 1].body).not.toContain('HERE were once five-and-twenty tin soldiers');
//   });
// });

/*

Input: Selected text with partial words
Output: Selected text full words

Selected input -
- Remove all punctuation except .?! from phrase
- Remove all punctuation except .?! from context

Check if phrase appears in context

If yes, replace first and last words

If not, phrase is backwards
Replace first and last words backwards

------------------
Check if selection is forwards
If selected text is in context?

Backwards?
If mouse Start Y > End Y
OR
If starting X is < end X && Start Y is === End Y

*/

// const getHighlightedWordOrPhrase = function() {
//   // fix bug where if a user selects backwards, first and last words are swapped
//   const selection = window.getSelection();

//   if (selection?.toString() && selection !== null) {
//     const selectedString = selection.getRangeAt(0).cloneContents().textContent || '';
//     const startNode = selection.anchorNode;
//     const endNode = selection.focusNode;

//     const stringArray = selectedString.split(' ');

//     // ensures the first and last words are whole words
//     let startWord = '';
//     let endWord = '';

//     if (startNode && startNode.textContent) {
//       startWord = startNode.textContent;
//       const firstWordPartial = stringArray[0];
//       const lastLetter = firstWordPartial[firstWordPartial.length - 1];
//       console.log(lastLetter);
//       if (/[.,;:]/.test(lastLetter)) {
//         stringArray[0] = `${startWord}${lastLetter}`;
//       } else {
//         stringArray[0] = startWord;
//       }
//     }

//     if (endNode?.textContent && endNode.textContent !== ' ') {
//       endWord = endNode.textContent;
//       if (stringArray[stringArray.length - 1] && endWord) {
//         stringArray[stringArray.length - 1] = endWord;
//       }
//     }

//     let newPhrase = stringArray.filter((_, index) => index < 10).join(' ').trim().split(/[.?!]/)[0];
//     const regex = new RegExp(newPhrase, 'gi');

//     // if the phrase is not found in the sentence, then the selection was done backwards
//     if (!regex.test(context)) {
//       const array = newPhrase.split(' ');
//       const end = array[array.length - 1];
//       const start = array[0];
//       const middle = array.filter((_, index) => index !== 0 && index !== array.length - 1);
//       newPhrase = [end, ...middle, start].join(' ');
//     }

//     const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase && wordObj.id);
//     let newWordObject: UserWord;

//     if (existingWord[0]) {
//       // eslint-disable-next-line prefer-destructuring
//       newWordObject = existingWord[0];
//     } else {
//       newWordObject = {
//         word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
//       };

//       setCurrentWord(newWordObject);
//       setCurrentWordContext(context);
//     }

//     // if userWords does not include the new word
//     if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
//       === newWordObject?.word.toLowerCase()).length === 0) {
//       // removes any words without an id, meaning that they also have no translation
//       const updatedWords = [...userWords
//         .filter((wordObj) => wordObj.id !== undefined), newWordObject];
//       setUserWords(updatedWords);
//     }
//   }
// };

// export default getHighlightedWordOrPhrase;
export default {};
