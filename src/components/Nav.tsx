import {
  Fragment, useEffect, MouseEvent,
} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink, useLocation } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  languagesState, userState, languageFlagsState, languageNamesState,
} from '../states/recoil-states';

import languageService from '../services/languages';
import userService from '../services/users';

import logOut from '../utils/logOut';
import LoggedOutNav from './LoggedOutNav';
import capitalize from '../utils/capitalize';

import { SanitizedUser } from '../types';

const logo = require('../assets/logo/logo-crop-dark.png');

const navigation = [
  { name: 'Texts', href: '/texts' },
  { name: 'Vocabulary', href: '/words' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [languages, setLanguages] = useRecoilState(languagesState);
  const flags = useRecoilValue(languageFlagsState);
  const names = useRecoilValue(languageNamesState);

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
      <Disclosure key='disclosure' as="nav" className="bg-black">
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
                <NavLink to={'/about'}>
                  <div className="flex-shrink-0 flex items-center">
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
              <div className="absolute inset-y-0 right-0 flex justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="sm:ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                      <div className="sm:block sm:ml-6">
                        <div className="flex space-x-4">
                          {<a
                            key={'languages'}
                            href={'#'}
                            className={classNames(
                              'text-gray-300  hover:text-white flex flex-row px-1 sm:px-3 py-2 rounded-md text-sm font-medium',
                            )}
                          >
                            <p><span className="h-5 w-5 user-lang-flag">{flags[user.learnLanguageId]}</span> {capitalize(names[user.learnLanguageId])}</p>
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
                    <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {languages.filter((language) => language.id !== user.learnLanguageId
                        && language.id !== user.knownLanguageId)
                        .map((language) => <Menu.Item key={language.id}>
                        {({ active }) => (
                          <div onClick={(event) => setUserLanguagesOnServer(event, language.id)}>
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              <div className='flex flex-row justify-between m-2'>
                                <span className="h-5 w-5">{flags[language.id]}</span>
                                {capitalize(language.name)}
                              </div>
                            </a>
                          </div>
                        )}
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* User profile picture dropdown menu */}
                <Menu as="div" className="sm:ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-500 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black click-user" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
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
                          <NavLink to='/settings'>
                            <Disclosure.Button
                              key='Settings'
                              id='settings-key'
                              as="div"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 settings-key')}
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
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
              {navigation.map((item) => {
                const isActive = useLocation().pathname === item.href;

                return <NavLink key={item.name} to={`${item.href}`}>
                          <Disclosure.Button
                            as="div"
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
