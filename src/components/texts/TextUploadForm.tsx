import { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import textsService from '../../services/texts';
import { textlistState, userState } from '../../states/recoil-states';
import { Text } from '../../types';

const NewTextForm = function() {
  const [textList, setTextList] = useRecoilState(textlistState);
  const [newText, setNewText] = useState('');
  const [newTextTitle, setNewTextTitle] = useState('');
  const navigate = useNavigate();

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
      navigate('/texts');
    }

    setNewText('');
    setNewTextTitle('');
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
          <div className='pb-5 border-b border-gray-200 flex items-center justify-between'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>Add new text</h2>
          </div>
        </div>
      </div>
        <div className="min-h-full max-w-7xl flex items-center justify-center py-12 px-6 sm:px-8 lg:px-10">
          <div className="space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add a new text here:</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(event) => submitText(event)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="title" className='text-gray-700'>
                    Title:
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
                  <label htmlFor="text" className='text-gray-700'>
                    Text content:
                  </label>
                  <textarea
                    name='text'
                    placeholder='Enter the text you would like to read here:'
                    value={newText}
                    required
                    rows={6}
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
                <NavLink to={'/texts'}>
                  <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                  Cancel
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </>
  );
};

export default NewTextForm;
