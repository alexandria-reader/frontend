import React, { useState } from "react";
import { Text, UserWord } from "../types";
import SingleTextBody from "./SingleText";
import wordsService from '../services/words';
import UserTexts from "./UserTexts";

const TextsPageComponent = function() {
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);
  const [words, setWords]: [words: [] | UserWord[], setWords: Function] = useState([]);

  const getWordsAndText = async function(id: string, languageId: string) {
    const words = await wordsService.getWordsFromText(id, languageId);
    setWords(words);
  }

  const openText = async function(_event: Event, text: Text) {
    await getWordsAndText(String(text.id), String(text.languageId));
    setText(text);
  }

  const cycleState = function(event: { target: { textContent: any; }; }) {
    const word = event.target.textContent;
    const wordObj = words.filter(wordObj => wordObj.word.toLowerCase() === word.toLowerCase());

    if (wordObj.length > 0) {
      const wordObject = wordObj[0];

      if (wordObject.state === undefined || wordObject.state === 'undefined') {
        wordObject.state = 'learning';
      } else if (wordObject.state === 'familiar') {
        wordObject.state = 'learned';
      } else if (wordObject.state === 'learned') {
        wordObject.state = 'undefined';
      } else if (wordObject.state === 'learning') {
        wordObject.state = 'familiar';
      }

      const updatedWords = [...words.filter(wordObj => wordObj.word.toLowerCase() !== word.toLowerCase()), wordObject];
      setWords(updatedWords)
    } else {
      const newWordObj = {word: `${word.toLowerCase()}`, state: 'learning'}
      const updatedWords = [...words, newWordObj];
      setWords(updatedWords)
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
      const newWordObj = {word: `${newPhrase.toLowerCase()}`, state: 'learning'}
  
      if (words.filter(wordObj => wordObj.word.toLowerCase() === newWordObj.word.toLowerCase()).length === 0) {
        const updatedWords = [...words, newWordObj];
        setWords(updatedWords)
      }
    } 
  }

  if (text) {
    return (
      <>
        {<SingleTextBody getSelection={getSelection} cycleState={cycleState} text={text} words={words} />}
      </>
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