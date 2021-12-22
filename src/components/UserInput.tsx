import { UserWord } from "../types";

const Translation = function() {
  return (
    <div className="translation-div">
      <label>
        Write your translation here:
      </label>
      <input type={'text'} />

      <button type={'submit'}>Submit</button>
    </div>
  )
}

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
  )
}

const UserInput = function({ word, setStateTo }: { word: UserWord | null, setStateTo: Function }) {
  return (
    <div className="user-input-div">
      {word && <p>Selected word: {word.word}</p>}
      {!word && <p>Select a word</p>}
      <Translation />
      <ChangeState word={word} setStateTo={setStateTo} />
    </div>
  )
}

export default UserInput;