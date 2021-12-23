import { ChangeEvent, useState } from 'react';
import { UserWord } from '../types';

// eslint-disable-next-line max-len
const Translation = function({ word, handleTranslation }: { word: UserWord | null, handleTranslation: Function }) {
  // if a translation is not set, the state should be restored to 'undefined'
  const [translation, setTranslation] = useState('');
  const handleInput = function(event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  return (
    <div className="translation-div">
      {word && word?.translations.length > 0
      && <p>Current translation: {word?.translations.join(', ')}</p>}
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
const ChangeState = function({ word, setWordStatus }: { word: UserWord | null, setWordStatus: Function }) {
  return (
    <div className="change-state-div">
      {word && <p>Current state: {word.status}</p>}
      <div className="word-state-toolbar">
        <button onClick={() => setWordStatus('learning', word)} type={'button'}>Learning</button>
        <button onClick={() => setWordStatus('familiar', word)} type={'button'}>Familiar</button>
        <button onClick={() => setWordStatus('known', word)} type={'button'}>Known</button>
        <button onClick={() => setWordStatus('undefined', word)} type={'button'}>Ignore</button>
      </div>
    </div>
  );
};

// eslint-disable-next-line max-len
const UserInput = function({ word, setWordStatus, handleTranslation }: { word: UserWord | null, setWordStatus: Function, handleTranslation: Function }) {
  return (
    <div className="user-input-div">
      {word && <p>Selected word: {word.word}</p>}
      {!word && <p>Select a word</p>}
      <Translation handleTranslation={handleTranslation} word={word} />
      <ChangeState word={word} setWordStatus={setWordStatus} />
    </div>
  );
};

export default UserInput;
