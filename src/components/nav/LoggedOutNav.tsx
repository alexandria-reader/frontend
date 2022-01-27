import { Disclosure } from '@headlessui/react';
import { NavLink, useLocation } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

const logo = require('../../assets/logo/logo-dark.png');

const navigation = [
  { name: 'Log in', href: '/login' },
  { name: 'Sign up', href: '/signup' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LoggedOutNav() {
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

  return (
    <Disclosure as="nav" className={`bg-primary ${theme}`}>
    {/* <Disclosure as="nav" className="bg-black sticky top-0 z-10"> */}
      {() => (
        <>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative dark:border-b-gray-700 dark:border-b flex items-center justify-between h-16">
              <div className="flex-1 flex items-stretch justify-between">
                <div className="flex-shrink-0 flex items-center">
                <NavLink to={'/'}>
                  <img
                    height={32}
                    width={84}
                    className="block h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                    </NavLink>

                </div>

                {/* These are the navigation buttons e.g. Texts/Vocabulary */}
                <div className="ml-6">
                  <div className="flex sm:space-x-4">
                    {/* dark mode toggle */}
                    <button
                      id="theme-toggle"
                      aria-label="toggle-light-dark-mode"
                      type="button"
                      onClick={() => toggleDarkMode()}
                      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-transparent dark:focus:ring-transparent rounded-lg text-sm p-2.5"
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
