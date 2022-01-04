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
    learning: 'bg-orange-100 text-orange-800',
    familiar: 'bg-green-100 text-green-800',
    learned: 'bg-gray-100 text-gray-800',
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto py-8 px-4 sm:py-6 sm:px-6 lg:px-8 flex flex-col'>
          <div className='pb-5 border-b border-gray-200 flex items-center justify-between'>
          <h2 className='text-lg leading-6 font-medium text-gray-900'>Vocabulary</h2>
        </div>
      </div>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                    <tr key={userword.word}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {userword.word}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${userword.status ? statusClasses[userword.status] : ''}`}>
                          {userword.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {userword.translations.map((translation) => (
                          <div className="text-sm font-medium text-gray-900">{translation.translation}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userword.translations.map((translation) => (
                          <div className="text-sm font-medium text-gray-900">{parseHTML(translation.context)}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
    <WordTable />
  );
};

export default Words;
