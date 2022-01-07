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
    learning: 'bg-orange-400 text-orange-900',
    familiar: 'bg-yellow-300 text-yellow-800',
    learned: 'bg-green-200 text-green-700',
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
          <div className='pb-5 border-b border-gray-200 flex items-center justify-between'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>Vocabulary</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
          {/* <div className="min-w-full divide-y divide-gray-200">
            <div className="bg-gray-50">
              <div className='flex flex-row w-full'>
                <div className="px-6 py-3 text-left text-xs font-medium  w-1/6 text-gray-500 uppercase tracking-wider">
                  <span className="underline cursor-pointer" onClick={sortUserwordsByABC}>Word</span>
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium  w-1/6 text-gray-500 uppercase tracking-wider">
                  <span className="underline cursor-pointer" onClick={sortUserwordsByStatus}>Status</span>
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium  w-1/6 text-gray-500 uppercase tracking-wider">
                  Translations
                </div>
                <div className="px-6 py-3 text-left text-xs font-medium flex-1 text-gray-500 uppercase tracking-wider">
                  Contexts
                </div>
              </div>
            </div>
            <div className="bg-white divide-y divide-gray-200">
              {userwords.map((userword) => (
                <div className=' flex flex-row flex-wrap min-w-full' key={userword.word}>
                  <div className="px-6 py-4 w-1/6 text-sm font-medium text-gray-900">
                    {userword.word}
                  </div>
                  <div className="px-6 py-4  w-1/6">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${userword.status ? statusClasses[userword.status] : ''}`}>
                      {userword.status}
                    </span>
                  </div>
                  <div className="px-6 py-4  w-1/6 text-sm text-gray-900">
                    {userword.translations.map((translation) => (
                      <div key={translation.id} className="text-sm font-medium text-gray-900">{translation.translation}</div>
                    ))}
                  </div>
                  <div className="px-6 py-4 hidden md:flex flex-1 overflow-auto text-sm text-gray-500">
                    {userword.translations.map((translation) => (
                      <div key={`context ${translation.id}`} className="text-sm font-medium text-gray-900">{parseHTML(translation.context || '')}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {userwords.map((userword) => (
                <tr className='flex md:table-row flex-wrap' key={userword.word}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {userword.word}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded ${userword.status ? statusClasses[userword.status] : ''}`}>
                      {userword.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {userword.translations.map((translation) => (
                      <div key={translation.id} className="text-sm pb-2 font-medium text-gray-900">{translation.translation}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {userword.translations.map((translation) => (
                      <div key={`context ${translation.id}`} className="text-sm pb-2 font-medium text-gray-900">{parseHTML(translation.context || '')}</div>
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
