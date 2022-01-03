/* eslint-disable @typescript-eslint/no-unused-vars */
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
    <li className='mb-2 col-span-3 bg-white rounded-lg shadow relative group divide-y divide-gray-200 sm:mr-5' >
      <Link key={text.id} to={`/texts/${text.id}`}>
        <div className='w-full flex items-center justify-between p-6 space-x-6 group-hover:shadow-md'>
          <div className='flex justify-center items-center p-4 rounded-full flex-shrink-0 bg-blue-500'>
          <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          </div>
          <div className='flex-1 truncate'>
            <div className="flex items-center space-x-3">
              <h2 className='text-gray-900 text-xl font-medium truncate' onClick={(_event) => setCurrentText(text)}>{text.title}</h2>
            </div>
            <p className='mt-1 text-gray-500 text-sm truncate'>{`${text.body.slice(0, 97)}...`}</p>
          </div>
        </div>
      </Link>
      {/* <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeTextFromServer(text.id)}>Delete</button> */}
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
      <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8 flex flex-col'>
          {!showNewTextForm && <div className='pb-5 border-b border-gray-200 flex items-center justify-between'>
          {textList.length === 0 ? <h2 className='text-lg leading-6 font-medium text-gray-900'>You have no texts, please add a text to begin.</h2>
            : <h2 className='text-lg leading-6 font-medium text-gray-900'>Texts</h2>}
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' data-testid='new-text' onClick={() => setShowNewTextForm(true)}>New Text</button>
          </div>}
        </div>

        {showNewTextForm && <NewTextForm submitText={submitText} newTextTitle={newTextTitle}
          newText={newText} setNewTextTitle={setNewTextTitle} setNewText={setNewText}
          setShowNewTextForm={setShowNewTextForm} />}
        {!showNewTextForm && <ul className='grid grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-3'>
          {textList.map((text) => <><IndividualText key={text.id} text={text} /></>)}
        </ul>}
        <Outlet />
      </div>
  );
};

export default UserTexts;
