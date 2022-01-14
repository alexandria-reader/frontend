import {
  TouchEvent, useState,
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
import { stripPunctuation } from '../../utils/punctuation';

export const Word = function ({ word, dataKey, context }:
{ word: string, dataKey:string, context: string }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  // const [mouseStartX, setMouseStartX] = useRecoilState(mouseStartXState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const markedWords = useRecoilValue(markedwordsState);

  const [touchStart, setTouchStart] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isWordInPhrase, setIsWordInPhrase] = useState(false);

  const wordStatus = markedWords[word.toLowerCase()];

  const getHighlightedWordOrPhrase = function() {
    // fix bug where if a user selects backwards, first and last words are swapped
    const selection = window.getSelection();

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
        const lastLetter = firstWordPartial[firstWordPartial.length - 1];

        if (/[.,]/.test(lastLetter)) {
          stringArray[0] = `${startWord}${lastLetter}`;
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

      let newPhrase = stringArray.filter((_, index) => index < 10).join(' ').trim().split('.')[0];
      const regex = new RegExp(newPhrase, 'gi');

      // if the phrase is not found in the sentence, then the selection was done backwards
      if (!regex.test(context)) {
        const array = newPhrase.split(' ');
        const end = array[array.length - 1];
        const start = array[0];
        const middle = array.filter((_, index) => index !== 0 && index !== array.length - 1);
        newPhrase = [end, ...middle, start].join(' ');
      }

      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase && wordObj.id);
      let newWordObject: UserWord;

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

  let wordClass = '';

  if (wordStatus === 'learning') {
    wordClass = 'bg-fuchsia-500/70 dark:bg-fuchsia-800/80';
  } else if (wordStatus === 'familiar') {
    wordClass = 'bg-sky-400/70 dark:bg-sky-600/80';
  }

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

  // const setMouseStartX = function () {};

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

        // onMouseDown={(event) => setMouseStartX(event.clientX)}
        onTouchStart={() => setTouchStart(window.scrollY)}
        onMouseOver={(event) => highlightWordsInPhrases(event.target)}
        className={`${wordClass} ${isWordInPhrase ? 'betterhover:hover:bg-violet-600' : 'betterhover:hover:border-blue-500'} cursor-pointer border border-transparent py-2 md:py-1 p-px rounded-md`}
        data-key={dataKey}
        data-type={'word'}>
        {word}
      </span>
    </div>
  );
};


export const Phrase = function ({ phrase, context }: { phrase: string, context: string }) {
  const markedWords = useRecoilValue(markedwordsState);
  const phraseStatus = markedWords[stripPunctuation(phrase.toLowerCase())];

  let wordClass = '';

  if (phraseStatus === 'learning') {
    wordClass = 'bg-fuchsia-500/70 dark:bg-fuchsia-600/60';
  } else if (phraseStatus === 'familiar') {
    wordClass = 'bg-sky-400/70 dark:bg-sky-600/80';
  }

  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${wordFinder}|${noWordFinder}`, 'gui');

  const tokens = phrase.match(tokenRegExp);

  return (
    <>
      <div className='inline text-xl md:text-lg'>
        <span className={`${wordClass} cursor-pointer m-[-1px] border border-transparent betterhover:hover:border-zinc-500 hover:py-2.5 md:py-1.5 py-2 rounded-md`} data-type={'phrase'}>
      {/* {
        parts.map((word, index, array) => <Fragment key={index + word} >
          <Word key={index + word} dataKey={index + word} word={word} context={context} />
          <>{index === array.length - 1 ? '' : ' '}</>
        </Fragment>)
      } */}
      {
        tokens?.map((token, index) => {
          if (token.match(wordRegExp)) {
            return <Word key={index + token} dataKey={index + token}
            word={token} context={context} />;
          }

          return <span key={index + token}>{token}</span>;
        })
      }
        </span>
      </div>
    </>
  );
};
