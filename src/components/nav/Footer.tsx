/* eslint-disable max-len */
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/recoil-states';

export default function Footer() {
  const user = useRecoilValue(userState);

  return (
    <footer className="bg-primary w-full py-8 mt-10 md:text-lg text-md">
      <div className="md:mx-14 lg:mx-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl px-4 md:px-10 sm:px-6 lg:px-14 mx-auto flex flex-col items-center">
          <ul className="md:text-lg text-md max-w-lg font-light flex flex-row gap-x-12 md:gap-x-20 justify-between">
            {user && (
              <li className="my-2 flex justify-center">
                <a
                  href="/about"
                  className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
            )}
            <li className="my-2 flex justify-center">
              <a
                href="/how-to"
                className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                How To
              </a>
            </li>
            <li className="my-2 flex justify-center">
              <a
                title="Link to GitHub repository"
                href="https://github.com/alexandria-reader"
                className="text-gray-400 hover:text-gray-200 dark:hover:text-white transition-colors duration-200"
              >
                Github{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200 inline"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                </svg>
              </a>
            </li>
            <li className="my-2 flex justify-center">
              <a
                title="Link to Privacy policy"
                href="/privacy"
                className="text-gray-400 hover:text-gray-200 dark:hover:text-white transition-colors duration-200"
              >
                Privacy
              </a>
            </li>
          </ul>

          <div className="text-center border-t border-slate-800 mt-3 pt-3 text-gray-500 dark:text-gray-200 font-light flex flex-row justify-center">
            <a
              className="text-gray-400 hover:text-gray-200 dark:text-gray-400 my-2 dark:hover:text-white transition-colors duration-200"
              href="https://alexandria-reader.github.io/"
            >
              © All Rights Reserved 2022. Created by Team Alexandria in the 🇪🇺
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
