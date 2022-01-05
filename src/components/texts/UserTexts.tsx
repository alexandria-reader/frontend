/* eslint-disable max-len */
import { useState, useEffect, FormEvent } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  textlistState, currenttextState, userState, currentwordState,
} from '../../states/recoil-states';

import textsService from '../../services/texts';
import { Text } from '../../types';

const IndividualText = function({ text }: { text: Text }) {
  const setCurrentText = useSetRecoilState(currenttextState);
  const [textList, setTextList] = useRecoilState(textlistState);
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);

  const user = useRecoilValue(userState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeTextFromServer = async function (id: number | undefined) {
    if (id && user) {
      const updatedTextList = textList.filter((textObj) => textObj.id !== id);
      setTextList(updatedTextList);
      await textsService.removeTextFromServer(id);
    }
  };

  useEffect(() => {
    if (currentWord) {
      setCurrentWord(null);
    }
  }, []);

  return (
    <li className='mb-2 col-span-3 bg-white rounded-lg shadow relative group divide-y divide-gray-200 sm:mr-5' >
      <Link key={text.id + text.body.slice(0, 7)} to={`/texts/${text.id}`}>
        <div onClick={(_event) => setCurrentText(text)} className='w-full flex items-center justify-between p-6 space-x-6 group-hover:shadow-md'>
          <div className='flex justify-center items-center p-4 rounded-full flex-shrink-0 bg-blue-500'>
          <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          </div>
          <div className='flex-1 truncate'>
            <div className="flex items-center space-x-3">
              <h2 className='text-gray-900 text-xl font-medium truncate'>{text.title}</h2>
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
    <>
        <div className="min-h-full flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
          <div className="max-w-sm w-fit space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add a new text here:</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(event) => submitText(event)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="title" className="sr-only">
                    Title
                  </label>
                  <input
                    type='text'
                    placeholder='title'
                    name='title'
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={newTextTitle}
                    onChange={(e) => setNewTextTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="text" className="sr-only">
                    Password
                  </label>
                  <textarea
                    name='text'
                    placeholder='text body'
                    value={newText}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    onChange={(e) => setNewText(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => setShowNewTextForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  );
};

const UserTexts = function() {
  const [textList, setTextList] = useRecoilState(textlistState);
  const [newText, setNewText] = useState('');
  const [newTextTitle, setNewTextTitle] = useState('');
  const [showNewTextForm, setShowNewTextForm] = useState(false);

  const user = useRecoilValue(userState);

  const fetchUserTexts = async function() {
    if (user) {
      const userTextsResponse = await textsService.getAllUserTextsByLanguage(user.learnLanguageId);
      setTextList(userTextsResponse);
    }
  };

  useEffect(() => {
    fetchUserTexts();
  }, [user]);

  const submitText = async function(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTextObj: Text = {
      languageId: user?.learnLanguageId || '',
      title: newTextTitle,
      body: newText,
    };

    if (user) {
      const addTextResponse = await textsService.postNewText(newTextObj);
      const newUsersTexts = [...textList, addTextResponse];
      setTextList(newUsersTexts);
    }

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
          {textList.map((text) => <><IndividualText key={text.id + text.body.slice(1, 8)} text={text} /></>)}
        </ul>}
        <Outlet />
      </div>
  );
};

export default UserTexts;
