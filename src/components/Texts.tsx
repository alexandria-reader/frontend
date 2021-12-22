/* eslint-disable max-len */
import React, { useState } from 'react';
import { Text, UserWord, State } from '../types';
import SingleTextBody from './SingleText';
import wordsService from '../services/words';
import UserTexts from './UserTexts';
import UserInput from './UserInput';

const TextsPageComponent = function() {
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);
  const [words, setWords]: [words: [] | UserWord[], setWords: Function] = useState([]);
  const [currentWord, setCurrentWord]: [word: null | UserWord, setWord: Function] = useState(null);

  const getWordsAndText = async function(id: string, languageId: string) {
    const wordsFromServer = await wordsService.getWordsFromText(id, languageId);
    setWords(wordsFromServer);
  };

  const openText = async function(_event: Event, textToOpen: Text) {
    await getWordsAndText(String(textToOpen.id), String(textToOpen.languageId));
    setText(textToOpen);
  };

  const setStateTo = function(state: State, word: UserWord) {
    const newWord = { ...word };
    newWord.state = state;

    setCurrentWord(newWord);
    // eslint-disable-next-line max-len
    const updatedWords = [...words.filter((wordObj) => wordObj.word.toLowerCase() !== newWord.word.toLowerCase()), newWord];
    setWords(updatedWords);
  };

  const handleWordClick = function(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const input = event.target as HTMLElement;
    const word = input.textContent || '';
    // eslint-disable-next-line max-len
    const wordObj = words.filter((arrWordObj) => arrWordObj.word.toLowerCase() === word.toLowerCase());

    if (wordObj.length > 0) {
      const wordObject = wordObj[0];

      if (wordObject.state === undefined || wordObject.state === 'undefined') {
        wordObject.state = 'learning';
      }

      // eslint-disable-next-line max-len
      const updatedWords = [...words.filter((arrWordObj) => arrWordObj.word.toLowerCase() !== word.toLowerCase()), wordObject];
      setWords(updatedWords);
      setCurrentWord(wordObject);
    } else {
      const newWordObj = {
        word: `${word.toLowerCase()}`, state: 'learning', translations: [], contexts: [],
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

  // eslint-disable-next-line max-len
  const handleTranslation = function(event: React.FormEvent<HTMLFormElement>, translation: string, word: UserWord) {
    event.preventDefault();

    const newWord = { ...word };
    newWord.translations = [...word.translations, translation];
    setCurrentWord(newWord);
    // eslint-disable-next-line max-len
    const updatedWords = [...words.filter((wordObj) => wordObj.word.toLowerCase() !== newWord.word.toLowerCase()), newWord];
    setWords(updatedWords);
  };

  if (text) {
    return (
      <div className="Text-page">
        {<SingleTextBody getSelection={getSelection} handleWordClick={handleWordClick} text={text} words={words} />}
        <UserInput word={currentWord} setStateTo={setStateTo} handleTranslation={handleTranslation}/>
      </div>
    );
  }
  return (
      <>
        {<UserTexts openText={openText} />}
      </>
  );
};


export default TextsPageComponent;
