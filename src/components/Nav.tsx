import {
  useState, Fragment, useEffect, MouseEvent,
} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { NavLink, useLocation } from 'react-router-dom';
import logOut from '../utils/logOut';
import { currentUserLanguagesState, languagesState } from '../states/recoil-states';
import languageService from '../services/languages';
import { CurrentUserLanguages, LocalStorageUser, User } from '../types';
import userService from '../services/users';
import getToken from '../utils/getToken';
import LoggedOutNav from './LoggedOutNav';

const logo = require('../assets/logo.png');

const navigation = [
  { name: 'Texts', href: '/texts' },
  { name: 'Vocabulary', href: '/words' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [languages, setLanguages] = useRecoilState(languagesState);
  const [currentUserLanguages, setCurrentUserLanguages] = useRecoilState(currentUserLanguagesState);
  const [currentLangName, setCurrentLangName] = useState('');
  const [currentKnownLanguageId, setCurrentKnownLanguageId] = useState('');
  const [currentLearnLanguageId, setCurrentLearnLanguageId] = useState('');
  const tokenObj = getToken();
  console.log(tokenObj);


  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageService.getAllLanguages();
    setLanguages(dbLanguages);
  };

  const getLanguagesFromLocalStorage = async function() {
    const user = await JSON.parse(localStorage.user);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownLanguageId: user.currentKnownLanguageId,
      currentLearnLanguageId: user.currentLearnLanguageId,
    };

    if (!currentUserLanguages) {
      setCurrentUserLanguages(currentUserLangs);
    }

    if (!currentKnownLanguageId) {
      setCurrentKnownLanguageId(`${currentUserLanguages?.currentKnownLanguageId || currentUserLangs.currentKnownLanguageId}`);
    }

    if (!currentLearnLanguageId) {
      setCurrentLearnLanguageId(`${currentUserLanguages?.currentLearnLanguageId || currentUserLangs.currentLearnLanguageId}`);
    }
  };

  const setUserLanguagesOnServer = async function (event: /* eslint-disable max-len */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  MouseEvent<HTMLDivElement, globalThis.MouseEvent>, langId: string) {
    event.preventDefault();
    setCurrentLearnLanguageId(langId);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownLanguageId,
      currentLearnLanguageId: langId,
    };

    if (currentKnownLanguageId && currentLearnLanguageId) {
      if (currentKnownLanguageId === langId) {
        // eslint-disable-next-line no-alert
        alert('Leaning language cannot be the same as known language');
      } else {
        setCurrentUserLanguages(currentUserLangs);

        const localStorageUser: LocalStorageUser = await JSON.parse(localStorage.user);
        const updatedUser: User = await userService.setUserLanguages(currentUserLangs);

        const newLocalStorageUser: LocalStorageUser = {
          currentKnownLanguageId: updatedUser.currentKnownLanguageId,
          currentLearnLanguageId: updatedUser.currentLearnLanguageId,
          email: localStorageUser.email,
          token: localStorageUser.token,
          username: localStorageUser.username,
        };

        // updates the languages on user in local storage
        localStorage.setItem('user', JSON.stringify(newLocalStorageUser));

        setCurrentKnownLanguageId(currentUserLangs.currentKnownLanguageId);
        setCurrentLearnLanguageId(currentUserLangs.currentLearnLanguageId);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Select both options (defaults need to be set on signup and saved to recoil');
    }
  };

  useEffect(() => {
    getLanguageListFromServer();
    getLanguagesFromLocalStorage();
  }, []);

  useEffect(() => {
    const langName = languages.filter((lang) => lang.id === currentUserLanguages?.currentLearnLanguageId);
    setCurrentLangName(langName[0]?.name);
  }, [currentUserLanguages, languages]);

  if (tokenObj) {
    return (
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to={'/texts'}>
                <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                  </div>
                      </NavLink>;


                  {/* These are the navigation buttons e.g. Texts/Vocabulary */}
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => {
                        const isActive = useLocation().pathname === item.href;

                        return <NavLink to={`${item.href}`}>
                        <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium',
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                      </NavLink>;
                      })}
                  </div>
                </div>

              </div>

              {/* Language dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                      <div className="sm:block sm:ml-6">
                        <div className="flex space-x-4">
                          {<a
                            key={'languages'}
                            href={'#'}
                            className={classNames(
                              'text-gray-300  hover:text-white flex flex-row px-3 py-2 rounded-md text-sm font-medium',
                            )}
                          >
                            {<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                            </svg>}
                            <p>{currentLangName && `${currentLangName.slice(0, 1).toUpperCase()}${currentLangName.slice(1)}`}</p>
                            <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </a>
                          }
                        </div>
                      </div>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {languages.filter((lang) => lang.id !== currentLearnLanguageId && lang.id !== currentKnownLanguageId).map((lang) => <Menu.Item>
                        {({ active }) => (
                          <div key={lang.id} onClick={(event) => setUserLanguagesOnServer(event, lang.id)}>
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <div
                                className='flex flex-row justify-between m-2'>
                                {<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                                </svg>}
                                {`${lang.name.slice(0, 1).toUpperCase()}${lang.name.slice(1)}`}
                              </div>
                            </a>
                          </div>
                        )}
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* User profile picture dropdown menu */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="settings"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            onClick={() => logOut()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

            {/* This is the mobile dropdown menu */}
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 bg-gray-800 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = useLocation().pathname === item.href;

                return <NavLink to={`${item.href}`}>
                          <Disclosure.Button
                            key={item.name}
                            as="div"
                            // href={item.href}
                            className={classNames(
                              isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'block px-3 py-2 rounded-md text-base font-medium',
                            )}
                            aria-current={isActive ? 'page' : undefined}
                          >
                        {item.name}
                        </Disclosure.Button>
                      </NavLink>;
              })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return <LoggedOutNav />;
}
