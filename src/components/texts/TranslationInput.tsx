/* eslint-disable max-len */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ChangeEvent, useState } from 'react';
import { UserWord, Status } from '../../types';
import translationService from '../../services/translations';
import { userwordsState, currentwordState, currenttextState } from '../../states/recoil-states';

const Translation = function({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const currentWord = useRecoilValue(currentwordState);
  const currentText = useRecoilValue(currenttextState);

  const handleTranslation = async function(
    event: React.FormEvent<HTMLFormElement>,
    translation: string,
    userWord: UserWord | null,
  ) {
    event.preventDefault();

    if (userWord) {
      const newUserWord = { ...userWord };
      newUserWord.translations = [...userWord.translations, translation];
      if (currentText) {
        const response = await translationService.addTranslation(userWord.word, translation, currentText?.languageId);
        console.log(response);
      }
      setCurrentWord(newUserWord);

      const updatedWords = [...userWords.filter((wordObj: UserWord) => wordObj.word.toLowerCase()
        !== newUserWord.word.toLowerCase()), newUserWord];
      setUserWords(updatedWords);
    }
  };

  // if a translation is not set, the state should be restored to 'undefined'
  const [translation, setTranslation] = useState('');
  const handleInput = function(event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  return (
    <div className="translation-div">
      {word && word?.translations.length > 0
      && <p>Current translation: {word?.translations.join(', ')}</p>}
      {currentWord && <iframe width="350" height="500" src={`https://www.wordreference.com/${currentText?.languageId}en/${currentWord.word}`}></iframe>}
      <form onSubmit={(event) => {
        handleTranslation(event, translation, word);
        setTranslation('');
      }} action="">
        <label htmlFor='translation'>
          Write your translation here:
        </label>
        <input id='translation' onChange={(event) => handleInput(event)} value={translation} type={'text'} />

        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};


const ChangeStatus = function({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const setWordStatus = function(status: Status, userWord: UserWord) {
    const newUserWord = { ...userWord };
    newUserWord.status = status;

    setCurrentWord(newUserWord);

    const updatedWords = [...userWords.filter((wordObj: UserWord) => wordObj.word.toLowerCase()
      !== newUserWord.word.toLowerCase()), newUserWord];
    setUserWords(updatedWords);
  };

  const wordStatusToolbar = word
    ? <div className="word-status-toolbar">;
        <button onClick={() => setWordStatus('learning', word)} type={'button'}>Learning</button>
        <button onClick={() => setWordStatus('familiar', word)} type={'button'}>Familiar</button>
        <button onClick={() => setWordStatus('learned', word)} type={'button'}>Learned</button>
        <button onClick={() => setWordStatus(undefined, word)} type={'button'}>Ignore</button>
      </div>
    : '';

  return (
    <div className="change-status-div">
      {word && <p>Current status: {word.status}</p>}
      {wordStatusToolbar}
    </div>
  );
};


const TranslationInput = function({ word }: { word: UserWord | null }) {
  return (
    <div className="user-input-div">
      {word && <p>Selected word: {word.word}</p>}
      {!word && <p>Select a word</p>}
      <Translation word={word} />
      <ChangeStatus word={word} />
    </div>
  );
};

export default TranslationInput;
