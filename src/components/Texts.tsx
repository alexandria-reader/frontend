import React, { useState, FormEvent } from "react";
import { Text, UserWord, State } from "../types";
import SingleTextBody from "./SingleText";
import wordsService from '../services/words';
import UserTexts from "./UserTexts";
import UserInput from "./UserInput";

const TextsPageComponent = function() {
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);
  const [words, setWords]: [words: [] | UserWord[], setWords: Function] = useState([]);
  const [currentWord, setCurrentWord]: [word: null | UserWord, setWord: Function] = useState(null);

  const getWordsAndText = async function(id: string, languageId: string) {
    const words = await wordsService.getWordsFromText(id, languageId);
    setWords(words);
  }

  const openText = async function(_event: Event, text: Text) {
    await getWordsAndText(String(text.id), String(text.languageId));
    setText(text);
  }

  const setStateTo = function(state: State, word: UserWord) {
    word.state = state;

    setCurrentWord(word);
    const updatedWords = [...words.filter(wordObj => wordObj.word.toLowerCase() !== word.word.toLowerCase()), currentWord];
    setWords(updatedWords);
  }

  const cycleState = function(event: { target: { textContent: any; }; }) {
    const word = event.target.textContent;
    const wordObj = words.filter(wordObj => wordObj.word.toLowerCase() === word.toLowerCase());

    if (wordObj.length > 0) {
      const wordObject = wordObj[0];

      if (wordObject.state === undefined || wordObject.state === 'undefined') {
        wordObject.state = 'learning';
      } 

      const updatedWords = [...words.filter(wordObj => wordObj.word.toLowerCase() !== word.toLowerCase()), wordObject];
      setWords(updatedWords);
      setCurrentWord(wordObject);

    } else {
      const newWordObj = {word: `${word.toLowerCase()}`, state: 'learning', translations: [], contexts: []};
      setCurrentWord(newWordObj);
      const updatedWords = [...words, newWordObj];
      setWords(updatedWords);
    }
  }

  const getSelection = function(_event: { target: { textContent: any; }; }) {
    // todo: check interaction between this and cycleState
    // fix bug where if a user selects backwards, first and last words are swapped
    // gets the selection string
    let selection = window.getSelection();
    if (selection !== null && selection.toString()) {
      let selectedString = selection.toString();

      const startNode = selection.anchorNode
      const endNode = selection.focusNode
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
      const newWordObj = {word: `${newPhrase.toLowerCase()}`, state: 'learning', translations: [], contexts: []}
      setCurrentWord(newWordObj);

      if (words.filter(wordObj => wordObj.word.toLowerCase() === newWordObj.word.toLowerCase()).length === 0) {
        const updatedWords = [...words, newWordObj];
        setWords(updatedWords)
      }
    } 
  }

  const handleTranslation = function(event: any, translation: string, word: UserWord) {
    event.preventDefault();
    word.translations = [...word.translations, translation];
    setCurrentWord(word);
    const updatedWords = [...words.filter(wordObj => wordObj.word.toLowerCase() !== word.word.toLowerCase()), word];
    setWords(updatedWords);
  }

  if (text) {
    return (
      <div className="Text-page">
        {<SingleTextBody getSelection={getSelection} cycleState={cycleState} text={text} words={words} />}
        <UserInput word={currentWord} setStateTo={setStateTo} handleTranslation={handleTranslation}/>
      </div>
    );
  } else {
    return (
      <>
        {<UserTexts openText={openText} />}
      </>
    );
  }
}


export default TextsPageComponent;