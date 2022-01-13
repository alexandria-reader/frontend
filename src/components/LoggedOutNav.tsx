import { Disclosure } from '@headlessui/react';
import { NavLink, useLocation } from 'react-router-dom';

const logo = require('../assets/logo/logo-dark.png');

const navigation = [
  { name: 'Log in', href: '/login' },
  { name: 'Sign up', href: '/signup' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LoggedOutNav() {
  return (
    <Disclosure as="nav" className="bg-primary">
    {/* <Disclosure as="nav" className="bg-black sticky top-0 z-10"> */}
      {() => (
        <>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-stretch justify-between">
                <div className="flex-shrink-0 flex items-center">
                <NavLink to={'/'}>
                  <img
                    className="block h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                    </NavLink>

                </div>

                {/* These are the navigation buttons e.g. Texts/Vocabulary */}
                <div className="ml-6">
                  <div className="flex space-x-4">
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
