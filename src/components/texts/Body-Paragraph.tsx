/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  selector, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import { Word, Phrase } from './Phrase-Word';
import {
  currentwordContextState,
  currentwordState,
  markedwordsState,
  userwordsState,
} from '../../states/recoil-states';
import { UserWord } from '../../types';

const phrasesState = selector({
  key: 'phrasesState',
  get: ({ get }) => Object.keys(get(markedwordsState)).filter((key) => key.split(' ').length > 1),
});

const Sentence = function({ sentence }: { sentence: string }) {
  const phrases = useRecoilValue(phrasesState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  // const setCurrentWord = useSetRecoilState(currentwordState);
  // const setCurrentWord = useSetRecoilState(currentwordState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);

  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const isElement = function(element: Element | EventTarget | null): element is Element {
    return (element as Element).textContent !== undefined;
  };

  const mouseMoveEventHandler = function(event: MouseEvent) {
    const selection = window.getSelection();
    const element = event.currentTarget;

    // if (isElement(element)) console.log(element?.textContent !== ' ');

    if (selection !== null && event.buttons > 0 && isElement(element) && element?.textContent !== ' ') {
      // console.log(event);
      const selectedString = selection.toString();
      const startNode = selection.anchorNode;
      const endNode = selection.focusNode;
      let stringArray = selectedString.split(' ');
      // console.log('selected string');
      // console.log(selectedString);
      // console.log(stringArray);
      // ensures the first and last words are whole words
      let startWord = '';
      let endWord = '';
      if (startNode && startNode?.parentElement?.nodeName === 'SPAN' && startNode.textContent) {
        startWord = startNode.textContent;
        stringArray[0] = startWord;
      }

      // console.log('start node');
      // console.log(startNode);

      stringArray = stringArray.filter((str) => str !== ' ').filter(Boolean);

      // is the endNode and current target are not the same node,
      if (endNode?.textContent === ' ' && isElement(element) && element?.textContent && endNode !== element && stringArray[stringArray.length - 1] !== element?.textContent && element?.textContent !== ' ') {
        // stringArray.push(element?.textContent);
        // console.log('target element');
        // console.log(stringArray);

        if (stringArray.length > 0 && stringArray[stringArray.length] !== element?.textContent && event.movementX > 0) {
          stringArray[stringArray.length] = element?.textContent;
        }
        // console.log(stringArray);
      } else {
        if (endNode && endNode?.parentElement?.nodeName === 'SPAN' && endNode.textContent && endNode.textContent !== ' ') {
          endWord = endNode.textContent;
          // console.log('end node');
          if (stringArray[stringArray.length - 1] && endWord) {
            stringArray = stringArray.filter((str) => str !== ' ');
            // console.log(stringArray);
            if (stringArray[stringArray.length - 1] !== endWord && endWord.startsWith(stringArray[stringArray.length - 1])) {
              stringArray[stringArray.length - 1] = endWord;
            }
          }
        }
      }

      // console.log(stringArray);

      const newPhrase = stringArray.filter((str) => str !== ' ').join(' ').trim().split('.')[0];
      // console.log('newPhrase');
      // console.log(newPhrase);
      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase);
      // console.log('existing word');
      // console.log(existingWord);
      let newWordObject: UserWord | undefined;

      if (existingWord[0]) {
        // eslint-disable-next-line prefer-destructuring
        newWordObject = existingWord[0];

        setCurrentWord(newWordObject);
        setCurrentWordContext(sentence);
      } else {
        newWordObject = {
          word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObject);
        setCurrentWordContext(sentence);
      }

      // console.log(newWordObject);
      // if (!newPhrase) {
      //   newWordObject = currentWord;
      // }
      // console.log(newWordObject);
      // console.log(currentWord);
      // console.log(userWords.filter((wordObj) => wordObj.word.toLowerCase()
      // === newWordObject?.word.toLowerCase()).length === 0);

      // check if the word or phrase already exists in user words
      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObject?.word.toLowerCase()).length === 0) {
        // remove any words without an id, meaning that they also have no translation
        // console.log(newWordObject);
        // console.log(currentWord);
        if (newWordObject.word) {
          // console.log('new word obj');
          const updatedWords = [...userWords
            .filter((wordObj) => wordObj.id !== undefined), newWordObject];
          setUserWords(updatedWords);
        } else if (currentWord) {
          // console.log('current word');
          setCurrentWord(currentWord);
          const updatedWords = [...userWords
            .filter((wordObj) => wordObj.id !== undefined), currentWord];
          setUserWords(updatedWords);
        }
      } else {
        setCurrentWord(currentWord);
      }
    }
  };
  // console.log(userWords);
  const tokens = sentence.match(tokenRegExp);

  return (
    <>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token.toLowerCase())) {
            return <Phrase mouseMoveEventHandler={mouseMoveEventHandler} key={token + index} phrase={token} context={sentence} />;
          }

          if (token.match(wordRegExp)) {
            return <Word mouseMoveEventHandler={mouseMoveEventHandler} key={token + index} dataKey={token + index}
            word={token} context={sentence} />;
          }

          return <span>{token}</span>;
        })
      }
    </>
  );
};


const Paragraph = function({ paragraph }: { paragraph: string }) {
  const sentences = paragraph.match(/[^\s]([^!?\\.]|\.{3})*["!?\\.\s]*/gmu) || [''];

  return (
    <>
      {
        sentences.map((sentence, index) => <Sentence key={index} sentence={sentence} />)
      }
    </>
  );
};


const TextBody = function ({ title, textBody }: { title: string, textBody: string }) {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const paragraphs = textBody.split('\n');

  const isElement = function(element: Element | EventTarget): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const removeUnusedWord = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { target }: { target: Element | EventTarget } = event;

    // if a user clicks empty space inside the text div, the current word is removed
    // if that word did not have a translation (or id) it is removed from userWords
    if (isElement(target) && target.nodeName !== 'SPAN') {
      setCurrentWord(null);

      const updatedWords = [...userWords
        .filter((wordObj) => wordObj.id !== undefined)];
      setUserWords(updatedWords);
      setCurrentWordContext(null);
    }
  };

  return (
    <>
      <div onClick={(event) => removeUnusedWord(event)} className={`container mx-auto p-4 m-4 md:col-span-2 md:col-start-1 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 ${currentWord && window.innerWidth < 760 ? 'blur-sm bg-gray-300' : ''}`}>
        <h1 className='font-bold text-3xl mb-2'>{title}</h1>
          {paragraphs.map((paragraph, index) => <Paragraph key={index} paragraph={paragraph} />)}
      </div>
    </>
  );
};

export default TextBody;
