import React, { useState, useEffect } from "react";
import textsService from '../services/userTexts'
import Nav from './Nav'
import { Text, UserWord } from "../types";
import TextBody from "./TextBody";
import wordsService from '../services/words';

const IndividualText = function({ text, openText }: { text: Text, openText: Function }) {
  return (
    <li onClick={(event) => openText(event, text)}>
      <h2>{text.title}</h2>
      <p>{text.body.slice(0, 300)}</p>
    </li>
  )
}

const UserTexts = function({ openText }: { openText: Function }) {
  const [texts, setTexts] = useState<Text[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserTexts = function() {
    textsService.getAllUserTexts().then(texts => {
      setTexts(texts)
      setIsLoaded(true)
    })
  }

  useEffect(getUserTexts, [])

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Nav />
        <ul>
          {texts.map(text => <IndividualText key={text.id} openText={openText} text={text} />)}
        </ul>
      </div>
    )
  }
}

const TextsComponent = function() {
  // const [text, setText] = useState('');
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);
  const [words, setWords]: [words: [] | UserWord[], setWords: Function] = useState([]);

  const getWordsAndText = async function(id: string) {
    const words = await wordsService.getWordsFromText(id);
    setWords(words);
    console.log(words);
  }

  const openText = function(_event: Event, text: Text) {
    setText(text);
    getWordsAndText(String(text.id));
  }



  // useEffect(getWordsAndText, [text])

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

  const getSelection = function(event: any) {
    // todo: check interaction between this and cycleState
    // fix bug where if a user selects backwards, first and last words are swapped
    // gets the selection string
    console.log(window.getSelection())
    if (window.getSelection() !== null) {
      let selectedString = window.getSelection().toString();
      const startNode = window.getSelection().anchorNode
      const endNode = window.getSelection().focusNode
      const startWord = startNode.textContent
      const endWord = endNode.textContent
  
      // ensures the first and last words are whole words
      const stringArray = selectedString.split(' ');
      stringArray[0] = startWord;
      stringArray[stringArray.length - 1] = endWord;
      const newPhrase = stringArray.join(' ').trim().split('.')[0]
      console.log(newPhrase)
  
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
        {<TextBody getSelection={getSelection} cycleState={cycleState} text={text} words={words} />}
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


export default TextsComponent;