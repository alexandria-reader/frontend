import { useState, useEffect } from 'react';
import {
  MarkedWords, Text, UserWord, State,
} from '../types';
import wordsService from '../services/words';
import UserInput from './UserInput';

const Word = function ({
  word, status, handleWordClick, getSelection,
}: { word: string, status: string, handleWordClick: Function, getSelection: Function }) {
  return <span onMouseUp={(event) => getSelection(event)}
  onClick={(event) => handleWordClick(event)} className={`${status} word`}>{word}</span>;
};

const Phrase = function ({
  phrase, status, markedWords, handleWordClick, getSelection,
}: { phrase: string, status: string, markedWords: MarkedWords,
  handleWordClick: Function, getSelection: Function }) {
  const parts = phrase.split(' ');

  return (
    <span onClick={(event) => handleWordClick(event)} className={`${status} phrase`}>
      {
        parts.map((word, index, array) => <><Word handleWordClick={handleWordClick}
        getSelection={getSelection} key={word + index} word={word}
        status={markedWords[word.toLowerCase()]} />{index === array.length - 1 ? '' : ' '}</>)
      }
    </span>
  );
};

const Paragraph = function({
  paragraph, words, handleWordClick, getSelection,
}: { paragraph: string, words: UserWord[], handleWordClick: Function, getSelection: Function }) {
  const markedWords: MarkedWords = {};
  // eslint-disable-next-line no-return-assign
  words.forEach((obj) => markedWords[obj.word] = obj.status);

  const phraseFinder = `(${Object.keys(markedWords)
    .filter((key) => key.split(' ').length > 1).join('|')})`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const phraseRegExp = new RegExp(phraseFinder, 'gui');
  const wordRegExp = new RegExp(wordFinder, 'gui');
  let tokenRegExp = new RegExp(`${wordFinder}|${noWordFinder}`, 'gui');

  if (phraseFinder !== '()') {
    tokenRegExp = new RegExp(`${phraseFinder}|${wordFinder}|${noWordFinder}`, 'gui');
  }

  const tokens: string[] = paragraph.match(tokenRegExp) || [];

  return (
    <p>
      {
        tokens.map((token, index) => {
          if (phraseFinder !== '()' && token.match(phraseRegExp)) {
            return <Phrase getSelection={getSelection} handleWordClick={handleWordClick}
            key={token + index} phrase={token} markedWords={markedWords}
            status={markedWords[token.toLowerCase()]} />;
          }
          if (token.match(wordRegExp)) {
            return <Word getSelection={getSelection}
            handleWordClick={handleWordClick} key={token + index} word={token}
            status={markedWords[token.toLowerCase()]} />;
          }
          return <span key={token + index}>{token}</span>;
        })
      }
    </p>
  );
};

const SingleTextBody = function ({ text }: { text: Text }) {
  const [words, setWords]: [words: [] | UserWord[], setWords: Function] = useState([]);
  const [currentWord, setCurrentWord]: [word: null | UserWord, setWord: Function] = useState(null);

  const getUserWordsFromServer = function() {
    wordsService.getWordsFromText(String(text.id), text.languageId)
      .then((userWords) => setWords(userWords));
  };

  const callServer = () => getUserWordsFromServer();
  useEffect(callServer, []);

  const setWordStatus = function(status: State, word: UserWord) {
    const newWord = { ...word };
    newWord.status = status;

    setCurrentWord(newWord);

    const updatedWords = [...words.filter((wordObj) => wordObj.word.toLowerCase()
      !== newWord.word.toLowerCase()), newWord];
    setWords(updatedWords);
  };

  const handleWordClick = function(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const input = event.target as HTMLElement;
    const word = input.textContent || '';

    const wordObj = words.filter((arrWordObj) => arrWordObj.word.toLowerCase()
      === word.toLowerCase());

    if (wordObj.length > 0) {
      const wordObject = wordObj[0];

      if (wordObject.status === undefined || wordObject.status === 'undefined') {
        wordObject.status = 'learning';
      }

      const updatedWords = [...words.filter((arrWordObj) => arrWordObj.word.toLowerCase()
        !== word.toLowerCase()), wordObject];
      setWords(updatedWords);
      setCurrentWord(wordObject);
    } else {
      const newWordObj = {
        word: `${word.toLowerCase()}`, status: 'learning', translations: [], contexts: [],
      };
      setCurrentWord(newWordObj);
      const updatedWords = [...words, newWordObj];
      setWords(updatedWords);
    }
  };

  const getSelection = function(_event: { target: { textContent: unknown; }; }) {
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
        word: `${newPhrase.toLowerCase()}`, state: 'learning', translations: [], contexts: [],
      };
      setCurrentWord(newWordObj);

      if (words.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObj.word.toLowerCase()).length === 0) {
        const updatedWords = [...words, newWordObj];
        setWords(updatedWords);
      }
    }
  };

  const handleTranslation = function(
    event: React.FormEvent<HTMLFormElement>,
    translation: string,
    word: UserWord,
  ) {
    event.preventDefault();

    const newWord = { ...word };
    newWord.translations = [...word.translations, translation];
    setCurrentWord(newWord);

    const updatedWords = [...words.filter((wordObj) => wordObj.word.toLowerCase()
      !== newWord.word.toLowerCase()), newWord];
    setWords(updatedWords);
  };

  const textBody = text.body;
  const paragraphs = textBody?.split('\n');

  return (
    <>
      <div className="text-div">
        {paragraphs.map((paragraph, index) => <Paragraph getSelection={getSelection}
          handleWordClick={handleWordClick} key={index} paragraph={paragraph} words={words} />)}
      </div>
        <UserInput word={currentWord} setWordStatus={setWordStatus}
          handleTranslation={handleTranslation} />
    </>
  );
};

export default SingleTextBody;
