import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { languagesState, userState } from '../states/recoil-states';
import languageServices from '../services/languages';

import UserInfo from './settings/UserInfo';
import Password from './settings/Password';
import Languages from './settings/Languages';
import DeleteAccount from './settings/DeleteAccount';

const logo = require('../assets/logo/logo-light.png');
const logoDark = require('../assets/logo/logo-dark.png');

export default function Settings() {
  const user = useRecoilValue(userState);
  const [, setLanguages] = useRecoilState(languagesState);

  const getLanguageListFromServer = async function () {
    const dbLanguages = await languageServices.getAllLanguages();
    setLanguages(dbLanguages);
  };

  useEffect(() => {
    getLanguageListFromServer();
  }, []);

  return (
    <div>
      {' '}
      {user && (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
            <div className="pb-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <img
                className="mx-auto dark:hidden h-20 w-auto"
                src={logo}
                alt="logo"
              />
              <img
                className="mx-auto hidden dark:block h-20 w-auto"
                src={logoDark}
                alt="logo"
              />
            </div>
          </div>

          <div className="md:grid md:grid-cols-3  mx-auto md:gap-6 min-h-full max-w-7xl sm:grid-cols-1 lg:grid-cols-3 px-4 py-8 sm:px-8 lg:px-10">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h2 className="text-lg font-medium leading-6 text-tertiary">
                  User account settings
                </h2>
                <p
                  id="loggedin-status"
                  className="loggedin-status mt-1 text-sm text-secondary"
                >
                  {user.username} at {user.email} is logged in
                </p>
              </div>
            </div>

            <div className="md:col-start-2 md:col-span-2 mt-8 md:mt-0">
              <div className="flex flex-col gap-6">
                <UserInfo />
                <Password />
                <Languages />
                <DeleteAccount />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
