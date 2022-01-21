/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import parseHTML from 'html-react-parser';

import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userwordsState, userState } from '../states/recoil-states';

import wordsService from '../services/words';

const WordTable = function () {
  const userwords = useRecoilValue(userwordsState);
  const setUserWords = useSetRecoilState(userwordsState);

  const sortUserwordsByStatus = function() {
    const sorted = userwords.slice();
    sorted.sort((a, b) => {
      if (a.status === 'learning' && b.status === 'familiar') return -1;
      if (a.status === 'learning' && b.status === 'learned') return -1;
      if (a.status === 'familiar' && b.status === 'learned') return -1;
      return 1;
    });
    setUserWords(sorted);
  };

  const sortUserwordsByABC = function() {
    const sorted = userwords.slice();
    sorted.sort((a, b) => {
      if (a.word < b.word) return -1;
      return 1;
    });
    setUserWords(sorted);
  };

  const statusClasses = {
    learning: 'bg-fuchsia-500/40 dark:bg-fuchsia-500/40',
    familiar: 'bg-sky-400/70 dark:bg-sky-600/80',
    learned: 'bg-green-600/40 dark:bg-green-700/70',
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
          <div className='pb-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between'>
            <h2 className='text-lg leading-6 font-medium text-tertiary'>Vocabulary</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="shadow overflow-x-auto border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className='flex md:table-row flex-wrap'>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span className="underline cursor-pointer" onClick={sortUserwordsByABC}>Word</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span className="underline cursor-pointer" onClick={sortUserwordsByStatus}>Status</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Translations
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contexts
                </th>
              </tr>
            </thead>
            <tbody className="bg-tertiary divide-y divide-gray-200 dark:divide-gray-700">
              {userwords.map((userword) => (
                <tr className='flex md:table-row flex-wrap' key={userword.word}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-tertiary">
                    {userword.word}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-sm font-semibold rounded ${userword.status ? statusClasses[userword.status] : ''}`}>
                      {userword.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-tertiary">
                    {userword.translations.map((translation) => (
                      <div key={translation.id} className="text-sm text-tertiary">{translation.translation}</div>
                    ))}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {userword.translations.map((translation) => (
                      <div key={`context ${translation.id}`} className="text-sm text-tertiary">{parseHTML(translation.context || '')}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Words = function() {
  const setUserWords = useSetRecoilState(userwordsState);
  const user = useRecoilValue(userState);

  const fetchUserwords = async function() {
    if (user) {
      const userWordsResponse = await wordsService
        .getUserwordsByLanguage(user.learnLanguageId);

      setUserWords(userWordsResponse);
    }
  };

  useEffect(() => {
    fetchUserwords();
  }, [user]);

  return (
    <WordTable key='words-table' />
  );
};

export default Words;
