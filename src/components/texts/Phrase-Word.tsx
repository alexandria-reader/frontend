/* eslint-disable max-len */
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { markedwordsState, userwordsState, currentwordState } from '../../states/recoil-states';


export const Word = function ({ word, handleWordClick }: { word: string, handleWordClick: Function }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);

  const getSelection = function(_event: unknown) {
    // todo: check interaction between this and cycleState
    // fix bug where if a user selects backwards, first and last words are swapped
    // gets the selection string
    const selection = window.getSelection();
    if (selection !== null && selection.toString()) {
      const selectedString = selection.toString();

      const startNode = selection.anchorNode;
      const endNode = selection.focusNode;
      const stringArray = selectedString.split(' ');

      // ensures the first and last words are whole words
      let startWord = '';
      let endWord = '';

      if (startNode && startNode.textContent) {
        startWord = startNode.textContent;
        if (stringArray[0] && startWord) {
          stringArray[0] = startWord;
        }
      }

      if (endNode && endNode.textContent) {
        endWord = endNode.textContent;
        if (stringArray[stringArray.length - 1] && endWord) {
          stringArray[stringArray.length - 1] = endWord;
        }
      }

      const newPhrase = stringArray.join(' ').trim().split('.')[0];

      // adds the phrase to words with state: learning
      const newWordObj = {
        word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [], contexts: [],
      };
      setCurrentWord(newWordObj);

      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObj.word.toLowerCase()).length === 0) {
        const updatedWords = [...userWords, newWordObj];
        setUserWords(updatedWords);
      }
    }
  };

  const markedWords = useRecoilValue(markedwordsState);
  const wordStatus = markedWords[word.toLowerCase()];

  let wordClass = 'word ';

  if (wordStatus) wordClass += wordStatus;


  return (
    <span onMouseUp={(event) => getSelection(event)}
          onClick={(event) => handleWordClick(event)}
          className={wordClass}>
      {word}
    </span>
  );
};


export const Phrase = function ({ phrase, handleWordClick }: { phrase: string, handleWordClick: Function }) {
  const markedWords = useRecoilValue(markedwordsState);
  const phraseStatus = markedWords[phrase.toLowerCase()];

  let phraseClass = 'phrase ';

  if (phraseStatus) phraseClass += phraseStatus;

  const parts = phrase.split(' ');

  return (
    <span onClick={(event) => handleWordClick(event)} className={phraseClass}>
      {
        parts.map((word, index, array) => <><Word key={word + index} word={word} handleWordClick={handleWordClick}/>{index === array.length - 1 ? '' : ' '}</>)
      }
    </span>
  );
};
