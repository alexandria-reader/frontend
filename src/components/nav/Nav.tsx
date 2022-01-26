import { Fragment, useEffect, MouseEvent } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import {
  NavLink, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  languagesState, userState, languageFlagsState, languageNamesState,
} from '../../states/recoil-states';

import logOut from '../../utils/logOut';
import LoggedOutNav from './LoggedOutNav';

import { SanitizedUser } from '../../types';

import languageService from '../../services/languages';
import userService from '../../services/users';

const logo = require('../../assets/logo/logo-dark.png');

const navigation = [
  { name: 'Texts', href: '/texts' },
  { name: 'Vocabulary', href: '/vocabulary' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [languages, setLanguages] = useRecoilState(languagesState);
  const flags = useRecoilValue(languageFlagsState);
  const names = useRecoilValue(languageNamesState);
  const params = useParams();
  const navigate = useNavigate();
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const toggleDarkMode = function() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      if (!document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } else if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageService.getAllLanguages();
    setLanguages(dbLanguages);
  };

  const [user, setUser] = useRecoilState(userState);

  const setUserLanguagesOnServer = async function (event: /* eslint-disable max-len */
  MouseEvent<HTMLDivElement, globalThis.MouseEvent>, learnLanguageId: string) {
    event.preventDefault();
    if (user) {
      if (user.knownLanguageId === learnLanguageId) {
        // eslint-disable-next-line no-alert
        alert('Leaning language cannot be the same as known language');
      } else {
        const updatedUser: SanitizedUser = await userService.setUserLanguages(user.knownLanguageId, learnLanguageId);

        setUser(updatedUser);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Select both options (defaults need to be set on signup and saved to recoil');
    }
  };


  useEffect(() => {
    getLanguageListFromServer();
  }, []);


  if (user) {
    return (
      <Disclosure key='disclosure' as="nav" className="bg-primary">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative dark:border-b-gray-700 dark:border-b flex items-center justify-between h-16">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">

                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-six hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* logo */}
                <div className="flex items-center justify-center sm:items-start sm:justify-start">
                  <NavLink to={'/'}>
                    <div className="flex-shrink-0 ml-2 sm:ml-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src={logo}
                        alt="Alexandria logo"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src={logo}
                        alt="Alexandria logo"
                      />
                    </div>
                  </NavLink>

                  {/* These are the navigation buttons e.g. Texts/Vocabulary */}
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item, index) => {
                        const isActive = useLocation().pathname === item.href;

                        return <NavLink key={item.name + index} to={`${item.href}`}>
                        <Disclosure.Button
                        as="div"
                        className={classNames(
                          isActive ? 'bg-gray-800 text-white' : 'text-five hover:bg-gray-700 hover:text-white',
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
              <div className="flex justify-end mr-8 items-center pr-2 sm:ml-6 sm:pr-0">
                <div>
                  {/* dark mode toggle */}
                  <button
                    id="theme-toggle"
                    aria-label="toggle-light-dark-mode"
                    type="button"
                    onClick={() => toggleDarkMode()}
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-transparent dark:focus:ring-transparent rounded-lg text-sm p-2.5"
                  >
                    <svg
                      id="theme-toggle-dark-icon"
                      className="w-5 h-5 dark:hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                      ></path>
                    </svg>
                    <svg
                      id="theme-toggle-light-icon"
                      className="w-5 h-5 hidden dark:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className=" flex  text-sm">
                      <div className="sm:block hover:bg-gray-700 focus:outline-none rounded-md">
                        <div className="flex space-x-4">
                          {<a
                            key={'languages'}
                            href={'#'}
                            className={classNames(
                              'text-five  hover:text-white flex flex-row px-1 sm:px-3 py-2 rounded-md text-sm font-medium',
                            )}
                          >
                            <p><span className="h-5 w-5 user-lang-flag mr-2">{flags[user.learnLanguageId]}</span> {names[user.learnLanguageId]}</p>
                            <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
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
                    <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-secondary ring-1 ring-black dark:ring-white/20 ring-opacity-5 focus:outline-none">
                      {languages.filter((language) => language.id !== user.learnLanguageId
                        && language.id !== user.knownLanguageId)
                        .map((language) => <Menu.Item key={language.id}>
                        {({ active }) => (
                          <div className='' onClick={(event) => {
                            setUserLanguagesOnServer(event, language.id);
                            if (params.textId) {
                              navigate('/texts');
                            }
                          }}>
                            <a
                              href=""
                              className={classNames(active ? 'bg-gray-200 dark:bg-gray-700' : '', 'block px-4 py-2 text-sm text-six')}
                            >
                              <div className='flex flex-row justify-between m-2'>
                                <span className="h-5 w-5">{flags[language.id]}</span>
                                {names[language.id]}
                              </div>
                            </a>
                          </div>
                        )}
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* User profile picture dropdown menu */}
                <Menu as="div" className="hidden rounded-md sm:block sm:ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-500 flex text-sm rounded-full focus:outline-none focus:ring-0">
                      <span className="sr-only">Open user menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black click-user" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
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
                    <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-secondary ring-1 ring-black dark:ring-white/20 ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to='/settings'>
                            <Disclosure.Button
                              key='Settings'
                              id='settings-key'
                              as="div"
                              className={classNames('block hover:bg-gray-200 hover:dark:bg-gray-700 px-4 py-2 text-sm text-six settings-key')}
                              aria-current={active ? 'page' : undefined}
                            >
                            Settings
                          </Disclosure.Button>
                        </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to='/' onClick={() => logOut()}>
                            <Disclosure.Button
                              key='Sign Out'
                              as="div"
                              className={classNames('block hover:bg-gray-200 hover:dark:bg-gray-700 px-4 py-2 text-sm text-six')}
                              aria-current={active ? 'page' : undefined}
                            >
                            Sign out
                          </Disclosure.Button>
                        </NavLink>
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
                <div className='pb-2'>
                  {navigation.map((item) => {
                    const isActive = useLocation().pathname === item.href;

                    return <NavLink key={item.name} to={`${item.href}`}>
                            <Disclosure.Button
                              as="div"
                              className={classNames(
                                isActive ? 'bg-gray-900 text-white' : 'text-five hover:bg-gray-700 hover:text-white',
                                'block px-3 py-2 rounded-md text-base font-medium',
                              )}
                              aria-current={isActive ? 'page' : undefined}
                            >
                          {item.name}
                          </Disclosure.Button>
                        </NavLink>;
                  })}
                </div>
                <div className='border-t border-gray-600 pt-2'>
                  <NavLink key={'Settings'} to={'/settings'}>
                    <Disclosure.Button
                      as="div"
                      className={classNames(
                        useLocation().pathname === '/settings'
                          ? 'bg-gray-900 text-white' : 'text-five hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={useLocation().pathname === '/settings' ? 'page' : undefined}
                    >
                      {'Settings'}
                    </Disclosure.Button>
                  </NavLink>
                  <NavLink key={'SignOut'} to={'/'} onClick={() => logOut()}>
                    <Disclosure.Button
                      as="div"
                      className={classNames(
                        'text-five hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium',
                      )}
                    >
                    {'Sign Out'}
                    </Disclosure.Button>
                  </NavLink>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return <LoggedOutNav />;
}
