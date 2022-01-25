/* eslint-disable max-len */
import { TouchEvent, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  markedwordsState, userwordsState, currentwordState, currentwordContextState,
} from '../../states/recoil-states';

import { UserWord } from '../../types';
import { stripPunctuationExceptEndOfLine } from '../../utils/punctuation';


const selectedBackwards = function (selection: Selection): boolean {
  const range = document.createRange();

  if (selection.anchorNode && selection.focusNode) {
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.focusNode, selection.focusOffset);
  }

  const backwards = range.collapsed;
  range.detach();

  return backwards;
};


const phraseFromSelection = function (selection: Selection): string {
  const start = selection.anchorNode as Node;
  const end = selection.focusNode as Node;
  const backwards = selectedBackwards(selection);

  if (start.textContent && backwards) {
    selection.setBaseAndExtent(start, start.textContent.length, end, 0);
  } else if (end.textContent && !backwards) {
    selection.setBaseAndExtent(start, 0, end, end.textContent.length);
  }

  const selectedString = selection.getRangeAt(0).cloneContents().textContent || '';

  const filteredSelectedStringArray = stripPunctuationExceptEndOfLine(selectedString)
    .split(/[.?!]/); // stops selection at end of sentence

  const first = filteredSelectedStringArray[0].split(' ')
    .filter((_, index) => index < 10) // fewer than 10 words
    .join(' ')
    .trim();

  const last = filteredSelectedStringArray[filteredSelectedStringArray.length - 1].split(' ')
    .filter((_, index, array) => index > array.length - 11) // fewer than 10 words
    .join(' ')
    .trim();

  return backwards ? last : first;
};


const Word = function ({ word, dataKey, context }:
{ word: string, dataKey:string, context: string }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const markedWords = useRecoilValue(markedwordsState);

  const [touchStart, setTouchStart] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isWordInPhrase, setIsWordInPhrase] = useState(false);

  const wordStatus = markedWords[word.toLowerCase()];

  const getHighlightedWordOrPhrase = function() {
    const selection: Selection | null = window.getSelection();

    if (selection?.toString() && selection !== null) {
      const newPhrase = phraseFromSelection(selection);

      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase && wordObj.id)[0];
      let newWordObject: UserWord;

      if (existingWord) {
        newWordObject = existingWord;
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
    const possiblePhraseDiv = input?.parentElement?.parentElement;
    const pointerEvent = event.nativeEvent as PointerEvent | TouchEvent;

    // checks if user tapped on an existing phrase, if so, show the phrase instead of the word
    if (possiblePhraseDiv?.dataset?.type === 'phrase' && possiblePhraseDiv?.textContent && pointerEvent.type === 'touchend') {
      const current = userWords
        .filter((wordObj) => wordObj.word === possiblePhraseDiv?.textContent?.toLowerCase());

      if (current.length === 1) {
        setCurrentWord(current[0]);
        setCurrentWordContext(context);
      }
    } else {
      const selectedWord = input.textContent || '';

      const wordObj = userWords.filter((arrWordObj) => arrWordObj.word.toLowerCase()
        === selectedWord.toLowerCase());

      if (wordObj.length > 0) {
        const wordObject = { ...wordObj[0] };

        if (wordObject.status === undefined) {
          wordObject.status = 'learning';
        }

        const updatedWords = [...userWords.filter((arrWordObj) => arrWordObj.word.toLowerCase()
          !== selectedWord.toLowerCase() && arrWordObj.id), wordObject];
        setUserWords(updatedWords);
        setCurrentWord(wordObject);
        setCurrentWordContext(context);
      } else {
        const newWordObj: UserWord = {
          word: `${selectedWord.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObj);
        setCurrentWordContext(context);

        const updatedWords = [...userWords
          .filter((wordObject) => wordObject.id !== undefined), newWordObj];
        setUserWords(updatedWords);
      }
    }
  };


  const isElement = function(element: Element | EventTarget): element is Element {
    return (element as Element).nodeName !== undefined;
  };


  const highlightWordsInPhrases = function (target: EventTarget | Element) {
    if (isElement(target)) {
      const possiblePhraseDiv = target?.parentElement?.parentElement;

      // checks if user is hovering over an existing phrase
      if (possiblePhraseDiv?.dataset?.type === 'phrase') {
        setIsWordInPhrase(true);
      } else {
        setIsWordInPhrase(false);
      }
    }
  };


  let wordClass = '';
  if (wordStatus === 'learning') {
    wordClass = 'bg-fuchsia-500/40 dark:bg-fuchsia-500/40';
  } else if (wordStatus === 'familiar') {
    wordClass = 'bg-sky-400/40 dark:bg-sky-600/40';
  }

  return (
    <div className='inline-block text-xl md:text-lg my-2 md:my-1.5'>
      <span
        onTouchEnd={(event) => {
          setIsTouch(true);

          if (touchStart === window.scrollY) {
            if (window.getSelection()?.toString()) {
              getHighlightedWordOrPhrase();
            } else {
              getClickedOnWord(event);
            }
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.empty();
          }
        }}

        onMouseUp={(event) => {
          const pointerEvent = event.nativeEvent as PointerEvent | TouchEvent;

          if (window.getSelection()?.toString() && pointerEvent.type === 'mouseup' && !isTouch) {
            getHighlightedWordOrPhrase();
          } else if (pointerEvent.type === 'mouseup' && !isTouch) {
            getClickedOnWord(event);
          }

          window.getSelection()?.removeAllRanges();
          window.getSelection()?.empty();
          setIsTouch(false);
        }}

        onTouchStart={() => setTouchStart(window.scrollY)}
        onMouseOver={(event) => highlightWordsInPhrases(event.target)}
        className={`${wordClass} ${isWordInPhrase ? 'betterhover:hover:bg-violet-400 dark:betterhover:hover:bg-violet-600' : 'betterhover:hover:border-blue-500'} cursor-pointer border border-transparent py-2 md:py-1 p-px rounded-md`}
        data-key={dataKey}
        data-type={'word'}>
        {word}
      </span>
    </div>
  );
};

export default Word;
