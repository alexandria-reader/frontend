/* eslint-disable max-len */
import {
  useState,
  useEffect,
  FormEvent,
} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Link, Outlet } from 'react-router-dom';
import textsService from '../../services/texts';
import { CurrentUserLanguages, Text } from '../../types';

import { textlistState, currenttextState, currentUserLanguagesState } from '../../states/recoil-states';


const IndividualText = function({ text }: { text: Text }) {
  const setCurrentText = useSetRecoilState(currenttextState);
  const [textList, setTextList] = useRecoilState(textlistState);

  const removeTextFromServer = async function (id: number | undefined) {
    if (id) {
      const updatedTextList = textList.filter((textObj) => textObj.id !== id);
      setTextList(updatedTextList);
      await textsService.removeTextFromServer(id);
    }
  };

  return (
    <li className='text-item' >
      <Link key={text.id + text.body.slice(1, 6)} to={`/texts/${text.id}`}>
      <h2 onClick={(_event) => setCurrentText(text)}>{text.title}</h2>
      <p>{`${text.body.slice(0, 97)}...`}</p>
      </Link>
      <button onClick={() => removeTextFromServer(text.id)}>Delete</button>
    </li>
  );
};

const NewTextForm = function({
  submitText, setNewTextTitle, setNewText, newTextTitle, newText, setShowNewTextForm,
}:
{
  submitText: Function,
  setNewTextTitle: Function,
  setNewText: Function,
  newTextTitle: string,
  newText: string,
  setShowNewTextForm: Function
}) {
  return (
    <div className='new-text-form-div'>
      <p>Add a new text here:</p>
      <form className='newTextForm' onSubmit={(event) => submitText(event)}>
      <input type={'text'} placeholder='title' name='title' value={newTextTitle} onChange={(e) => setNewTextTitle(e.target.value)}></input>
      <textarea name='text' placeholder='text body' value={newText} onChange={(e) => setNewText(e.target.value)}></textarea>
      <button type='submit'>Submit</button><button onClick={() => setShowNewTextForm(false)}>Cancel</button>
      </form>
    </div>
  );
};

const UserTexts = function() {
  const [textList, setTextList] = useRecoilState(textlistState);
  const [newText, setNewText] = useState('');
  const [newTextTitle, setNewTextTitle] = useState('');
  const [currentUserLanguages, setCurrentUserLanguages] = useRecoilState(currentUserLanguagesState);
  const [showNewTextForm, setShowNewTextForm] = useState(false);

  const getLanguagesFromLocalStorage = async function() {
    const user = await JSON.parse(localStorage.user);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownLanguageId: user.currentKnownLanguageId,
      currentLearnLanguageId: user.currentLearnLanguageId,
    };

    if (!currentUserLanguages) {
      setCurrentUserLanguages(currentUserLangs);
    }
  };

  function isCurrentUserLanguage(currentUserLangs: CurrentUserLanguages | null)
    : currentUserLangs is CurrentUserLanguages {
    return (currentUserLangs as CurrentUserLanguages)?.currentLearnLanguageId !== undefined;
  }

  const fetchUserTexts = async function() {
    if (isCurrentUserLanguage(currentUserLanguages)) {
      const languageId = currentUserLanguages.currentLearnLanguageId;
      const userTextsResponse = await textsService.getAllUserTextsByLanguage(languageId);
      setTextList(userTextsResponse);
    }
  };

  useEffect(() => {
    getLanguagesFromLocalStorage();
    fetchUserTexts();
  }, [currentUserLanguages]);

  const submitText = async function(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTextObj: Text = {
      languageId: currentUserLanguages?.currentLearnLanguageId || '',
      title: newTextTitle,
      body: newText,
    };

    const addTextResponse = await textsService.postNewText(newTextObj);
    const newUsersTexts = [...textList, addTextResponse];
    setTextList(newUsersTexts);
    setNewText('');
    setNewTextTitle('');
    setShowNewTextForm(false);
  };

  return (
      <div>
        {!showNewTextForm && <div className='new-texts-div'>
        {textList.length === 0 ? <p>You have no texts, please add a text to begin.</p>
          : <p>Click to add a new text.</p>}
        <button onClick={() => setShowNewTextForm(true)}>New Text</button>
        </div>}

        {showNewTextForm && <NewTextForm submitText={submitText} newTextTitle={newTextTitle}
          newText={newText} setNewTextTitle={setNewTextTitle} setNewText={setNewText}
          setShowNewTextForm={setShowNewTextForm} />}
        {!showNewTextForm && <ul className='textList'>
          {textList.map((text) => <IndividualText key={text.id + text.body.slice(0, 5)} text={text} />)}
        </ul>}
        <Outlet />
      </div>
  );
};

export default UserTexts;
