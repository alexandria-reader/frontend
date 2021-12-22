import { ChangeEvent, useState } from 'react';
import { UserWord } from '../types';

// eslint-disable-next-line max-len
const Translation = function({ word, handleTranslation }: { word: UserWord | null, handleTranslation: Function }) {
  const [translation, setTranslation] = useState('');
  const handleInput = function(event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  return (
    <div className="translation-div">
      {word && word?.translations.length > 0 && <p>Current translation: {word?.translations}</p>}
      <form onSubmit={(event) => {
        handleTranslation(event, translation, word);
        setTranslation('');
      }} action="">
        <label>
          Write your translation here:
        </label>
        <input onChange={(event) => handleInput(event)} value={translation} type={'text'} />

        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};

// eslint-disable-next-line max-len
const ChangeState = function({ word, setStateTo }: { word: UserWord | null, setStateTo: Function }) {
  return (
    <div className="change-state-div">
      {word && <p>Current state: {word.state}</p>}
      <div className="word-state-toolbar">
        <button onClick={() => setStateTo('learning', word)} type={'button'}>Learning</button>
        <button onClick={() => setStateTo('familiar', word)} type={'button'}>Familiar</button>
        <button onClick={() => setStateTo('known', word)} type={'button'}>Known</button>
        <button onClick={() => setStateTo('undefined', word)} type={'button'}>Ignore</button>
      </div>
    </div>
  );
};

// eslint-disable-next-line max-len
const UserInput = function({ word, setStateTo, handleTranslation }: { word: UserWord | null, setStateTo: Function, handleTranslation: Function }) {
  return (
    <div className="user-input-div">
      {word && <p>Selected word: {word.word}</p>}
      {!word && <p>Select a word</p>}
      <Translation handleTranslation={handleTranslation} word={word} />
      <ChangeState word={word} setStateTo={setStateTo} />
    </div>
  );
};

export default UserInput;
