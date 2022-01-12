import {
  useState, useEffect, Fragment,
} from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Menu, Transition } from '@headlessui/react';
import {
  textlistState, currenttextState, userState, currentwordState, languageNamesState, textToEditState,
} from '../../states/recoil-states';
import textsService from '../../services/texts';
import { Text } from '../../types';
import Modal from '../Modal';

const IndividualText = function({ text, setOpenModal, setTextToDelete }:
{ text: Text, setOpenModal: Function, setTextToDelete: Function }) {
  const setCurrentText = useSetRecoilState(currenttextState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const setTextToEdit = useSetRecoilState(textToEditState);

  const confirmDeleteText = function() {
    setTextToDelete(text);
    setOpenModal(true);
  };

  useEffect(() => {
    setTextToEdit(null);
    setCurrentWord(null);
  }, []);

  return (
    <li className='mb-2 col-span-3 bg-white rounded-lg shadow relative group divide-y divide-gray-200' >
      <div className='flex flex-row justify-between group-hover:shadow-md'>
        <Link className='w-full overflow-hidden' key={`${text.id} ${text.body.slice(0, 7)}`} to={`/texts/${text.id}`}>
          <div onClick={(_event) => setCurrentText(text)} className='flex items-center p-6 space-x-6'>
            <div className='flex justify-center items-center p-4 rounded-full flex-shrink-0 bg-fuchsia-800'>
            <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
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
        <Menu as="div" className="flex m-3 w-5">
          <div>
            <Menu.Button className="flex text-sm rounded-full">
              <span className="sr-only">Open user menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <NavLink
                    to="/texts/edit"
                    onClick={() => setTextToEdit(text)}
                    className={ `block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}` }
                  >
                    <div className='flex flex-row justify-between m-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </div>
                  </NavLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => confirmDeleteText()}
                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                  >
                    <div className='flex flex-row justify-between m-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </div>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};


const UserTexts = function() {
  const [textList, setTextList] = useRecoilState(textlistState);
  const user = useRecoilValue(userState);
  const names = useRecoilValue(languageNamesState);

  const [openModal, setOpenModal] = useState(false);
  const [textToDelete, setTextToDelete] = useState(null);
  // const [textToEdit, setTextToEdit] = useState(null);

  const removeTextFromServer = async function () {
    if (textToDelete) {
      const { id } = textToDelete;
      if (id && user && textList) {
        const updatedTextList = textList.filter((textObj) => textObj.id !== id);
        setTextList(updatedTextList);
        await textsService.removeTextFromServer(id);
      }
    }
  };

  const fetchUserTexts = async function() {
    if (user) {
      const userTextsResponse = await textsService.getAllUserTextsByLanguage(user.learnLanguageId);
      setTextList(userTextsResponse);
    }
  };

  useEffect(() => {
    fetchUserTexts();
  }, [user]);

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
          {textList
            ? <div className='pb-5 border-b border-gray-200 flex items-center justify-between'>
              {(user && textList.length === 0)
                ? <h2 className='text-lg leading-6 font-medium text-gray-900'>{`You have no texts in ${names[user.learnLanguageId]}, please add a text to begin.`}</h2>
                : <h2 className='text-lg leading-6 font-medium text-gray-900'>Texts</h2>}
            <NavLink to={'/texts/new'}>
              <button className='bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 text-white font-bold py-2 px-4 rounded' data-testid='new-text'>New Text</button>
            </NavLink>
          </div>
            : ''
          }
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <ul className='grid grid-cols-3 gap-3 sm:grid-cols-1 lg:grid-cols-3'>
          {(textList && textList.length > 0) ? textList.map((text) => <IndividualText key={`${text.id} ${text.body.slice(1, 8)}`}
            setOpenModal={setOpenModal} setTextToDelete={setTextToDelete} text={text} />) : ''}
        </ul>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal}
        removeTextFromServer={removeTextFromServer} />
      <Outlet />
      </>
  );
};

export default UserTexts;
