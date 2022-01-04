import {
  Fragment, TouchEvent, useState,
} from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import {
  markedwordsState, userwordsState, currentwordState, currentwordContextState,
} from '../../states/recoil-states';
import { UserWord } from '../../types';


export const Word = function ({ word, dataKey, context }:
{ word: string, dataKey:string, context: string }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const [touchStart, setTouchStart] = useState(0);
  const markedWords = useRecoilValue(markedwordsState);
  const wordStatus = markedWords[word.toLowerCase()];

  const getHighlightedWordOrPhrase = function(_event: unknown) {
    // fix bug where if a user selects backwards, first and last words are swapped
    const selection = window.getSelection();
    // console.log('getting selection');

    if (selection?.toString() && selection !== null) {
      const selectedString = selection.toString();

      const startNode = selection.anchorNode;
      const endNode = selection.focusNode;
      const stringArray = selectedString.split(' ');

      // ensures the first and last words are whole words
      let startWord = '';
      let endWord = '';

      if (startNode && startNode.textContent) {
        startWord = startNode.textContent;
        const firstWordPartial = stringArray[0];
        if (firstWordPartial[firstWordPartial.length - 1] === '.') {
          stringArray[0] = `${startWord}.`;
        } else {
          stringArray[0] = startWord;
        }
      }

      if (endNode?.textContent && endNode.textContent !== ' ') {
        endWord = endNode.textContent;
        if (stringArray[stringArray.length - 1] && endWord) {
          stringArray[stringArray.length - 1] = endWord;
        }
      }

      const newPhrase = stringArray.join(' ').trim().split('.')[0];
      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase && wordObj.id);
      let newWordObject: UserWord | undefined;

      if (existingWord[0]) {
        // eslint-disable-next-line prefer-destructuring
        newWordObject = existingWord[0];
      } else {
        newWordObject = {
          word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObject);
        setCurrentWordContext(context);
      }

      // if userWords does not include the new word
      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObject?.word.toLowerCase()).length === 0) {
        // removes any words without an id, meaning that they also have no translation
        const updatedWords = [...userWords
          .filter((wordObj) => wordObj.id !== undefined), newWordObject];
        setUserWords(updatedWords);
      }
    }
  };

  const getClickedOnWord = function (event: React.MouseEvent | TouchEvent<HTMLSpanElement>) {
    const input = event.target as HTMLElement;
    const selectedWord = input.textContent || '';

    const wordObj = userWords.filter((arrWordObj) => arrWordObj.word.toLowerCase()
      === selectedWord.toLowerCase());

    if (wordObj.length > 0) {
      const wordObject = wordObj[0];

      if (wordObject.status === undefined) {
        wordObject.status = 'learning';
      }

      const updatedWords = [...userWords.filter((arrWordObj) => arrWordObj.word.toLowerCase()
        !== selectedWord.toLowerCase() && arrWordObj.id), wordObject];
      setUserWords(updatedWords);
      setCurrentWord(wordObject);
    } else {
      const newWordObj: UserWord = {
        word: `${selectedWord.toLowerCase()}`, status: 'learning', translations: [],
      };

      setCurrentWord(newWordObj);

      const updatedWords = [...userWords
        .filter((wordObject) => wordObject.id !== undefined), newWordObj];
      setUserWords(updatedWords);
    }
  };

  let wordClass = '';

  if (wordStatus === 'learning') {
    wordClass = 'bg-amber-500';
  } else if (wordStatus === 'familiar') {
    wordClass = 'bg-yellow-500';
  } else if (wordStatus === 'learned') {
    wordClass = 'bg-gray-200';
  }

  return (
    <div className='inline-block my-1'>
      <span
        onTouchEnd={(event) => {
          if (touchStart === window.scrollY) {
            if (window.getSelection()?.toString()) {
              getHighlightedWordOrPhrase(event);
            } else {
              getClickedOnWord(event);
            }
            window.getSelection()?.removeAllRanges();
          }
        }}

        onMouseUp={(event) => {
          if (window.getSelection()?.toString()) {
            getHighlightedWordOrPhrase(event);
          } else {
            getClickedOnWord(event);
          }
        }}

        onTouchStart={() => setTouchStart(window.scrollY)}
        className={`${wordClass} cursor-pointer border border-transparent betterhover:hover:border-blue-500 betterhover:hover:border py-1 p-px rounded-md`}
        data-key={dataKey}>
        {word}
      </span>
    </div>
  );
};


export const Phrase = function ({ phrase, context }: { phrase: string, context: string }) {
  const markedWords = useRecoilValue(markedwordsState);
  const phraseStatus = markedWords[phrase.toLowerCase()];

  let wordClass = '';

  if (phraseStatus === 'learning') {
    wordClass = 'bg-amber-500';
  } else if (phraseStatus === 'familiar') {
    wordClass = 'bg-yellow-500';
  } else if (phraseStatus === 'learned') {
    wordClass = 'bg-gray-200';
  }

  const parts = phrase.split(' ');

  return (
    <div className='inline'>
      <span className={`${wordClass} cursor-pointer  py-2 rounded-md`}>
        {
          parts.map((word, index, array) => <Fragment>
            <Word key={word + index} dataKey={word + index} word={word} context={context} />
            <>{index === array.length - 1 ? '' : ' '}</>
            </Fragment>)
        }
      </span>
    </div>
  );
};
