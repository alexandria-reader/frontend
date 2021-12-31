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
    <li className='overflow-hidden shadow-lg border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r justify-between leading-normal flex flex-col p-2 m-4 items-center fill-inherit rounded' >
      <Link key={text.id} to={`/texts/${text.id}`}>
      <h2 className='font-bold text-xl mb-2' onClick={(_event) => setCurrentText(text)}>{text.title}</h2>
      <p className='text-gray-700 text-base'>{`${text.body.slice(0, 97)}...`}</p>
      </Link>
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeTextFromServer(text.id)}>Delete</button>
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
    <div className='flex flex-col'>
      <p>Add a new text here:</p>
      <form className='flex flex-col items-center' onSubmit={(event) => submitText(event)}>
      <input type={'text'} placeholder='title' name='title' value={newTextTitle} onChange={(e) => setNewTextTitle(e.target.value)}></input>
      <textarea name='text' placeholder='text body' value={newText} onChange={(e) => setNewText(e.target.value)}></textarea>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => setShowNewTextForm(false)}>Cancel</button>
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
        {!showNewTextForm && <div className='flex flex-row justify-between m-4 border p4'>
        {textList.length === 0 ? <p>You have no texts, please add a text to begin.</p>
          : <p>Click to add a new text.</p>}
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setShowNewTextForm(true)}>New Text</button>
        </div>}

        {showNewTextForm && <NewTextForm submitText={submitText} newTextTitle={newTextTitle}
          newText={newText} setNewTextTitle={setNewTextTitle} setNewText={setNewText}
          setShowNewTextForm={setShowNewTextForm} />}
        {!showNewTextForm && <ul className='flex flex-col'>
          {textList.map((text) => <><IndividualText key={text.id} text={text} /></>)}
        </ul>}
        <Outlet />
      </div>
  );
};

export default UserTexts;
