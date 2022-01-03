import { Fragment } from 'react';
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

  const getWordOrPhrase = function(_event: unknown) {
    // fix bug where if a user selects backwards, first and last words are swapped
    const selection = window.getSelection();

    if (selection !== null) {
      const selectedString = selection.toString();

      const startNode = selection.anchorNode;
      const endNode = selection.focusNode;
      const stringArray = selectedString.split(' ');

      // ensures the first and last words are whole words
      let startWord = '';
      let endWord = '';

      if (startNode && startNode.textContent) {
        startWord = startNode.textContent;
        stringArray[0] = startWord;
      }

      if (endNode && endNode.textContent) {
        endWord = endNode.textContent;
        if (stringArray[stringArray.length - 1] && endWord) {
          stringArray[stringArray.length - 1] = endWord;
        }
      }

      const newPhrase = stringArray.join(' ').trim().split('.')[0];
      // console.log(newPhrase);
      // console.log(startNode, endNode);
      // console.log(selection);
      // console.log(context);
      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase);
      let newWordObject: UserWord | undefined;

      if (existingWord[0]) {
        // eslint-disable-next-line prefer-destructuring
        newWordObject = existingWord[0];

        setCurrentWord(newWordObject);
        setCurrentWordContext(context);
      } else {
        newWordObject = {
          word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObject);
        setCurrentWordContext(context);
      }

      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObject?.word.toLowerCase()).length === 0) {
        // removes any words without an id, meaning that they also have no translation
        const updatedWords = [...userWords
          .filter((wordObj) => wordObj.id !== undefined), newWordObject];
        setUserWords(updatedWords);
      }
    }
  };

  // const isElement = function(element: Element | EventTarget): element is Element {
  //   return (element as Element).nodeName !== undefined;
  // };

  // eslint-disable-next-line max-len
  // const mouseMoveEventHandler = function(event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) {
  //   if (window.getSelection()?.toString()) {
  //     // console.log(window.getSelection()?.toString());
  //     if (isElement(event.target)) {
  //       const element = event.target;
  //       console.log(element.textContent);
  //       // if (!element.className.match('bg-gray-500')) {
  //       //   element.className += ' bg-gray-500';
  //       // }
  //       // console.log(event.target.className);
  //     }
  //     // console.log(event.target);
  //   }
  // };

  const markedWords = useRecoilValue(markedwordsState);
  const wordStatus = markedWords[word.toLowerCase()];

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
        onMouseUp={(event) => {
          getWordOrPhrase(event);
          window.getSelection()?.empty();
        }}
        className={`${wordClass} cursor-pointer border border-transparent hover:border-blue-500 hover:border py-1 p-px rounded-md`}
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
    <div className='inline-block'>
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
