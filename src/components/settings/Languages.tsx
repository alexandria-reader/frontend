import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import userServices from '../../services/users';
import {
  languageFlagsState,
  languageNamesState,
  languagesState,
  userState,
} from '../../states/recoil-states';

export default function Languages() {
  const [user, setUser] = useRecoilState(userState);
  const languages = useRecoilValue(languagesState);
  const [languagemessage, setLanguagemessage] = useState('');
  const [showLanguageMessage, setShowLanguageMessage] = useState(true);
  const flags = useRecoilValue(languageFlagsState);
  const names = useRecoilValue(languageNamesState);

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    setError: setError3,
    reset: reset3,
  } = useForm({
    mode: 'onSubmit',
  });

  const changeLanguages: SubmitHandler<FieldValues> = async (data) => {
    if (data.currentKnownLanguageId === data.currentLearnLanguageId) {
      setError3('languages', {
        type: 'languages',
        message: ' Learning language cannot be the same as known language',
      });
      const timeId = setTimeout(() => {
        reset3();
      }, 5000);

      return () => {
        clearTimeout(timeId);
      };
    }
    const response = await userServices.setUserLanguages(
      data.currentKnownLanguageId,
      data.currentLearnLanguageId
    );
    setUser(response);
    setLanguagemessage('Language settings updated');
    return null;
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowLanguageMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
      setLanguagemessage('');
      setShowLanguageMessage(true);
    };
  }, [showLanguageMessage]);

  return (
    <div>
      <form key={3} onSubmit={handleSubmit3(changeLanguages)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-tertiary sm:p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-xl text-secondary mb-3 tracking-normal">
                Update your learning preferences
              </h2>
              <p className="text-secondary text-sm">Update languages:</p>
              <p className="text-sm text-green-600 font-bold">
                {showLanguageMessage && languagemessage}
              </p>
            </div>

            <div>
              <label htmlFor="currentKnownLanguageId" className="label text-sm">
                I know
              </label>
              {
                <select
                  {...register3('currentKnownLanguageId')}
                  defaultValue={user?.knownLanguageId}
                  className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {flags[lang.id]} {names[lang.id]}
                    </option>
                  ))}
                </select>
              }
            </div>

            <div>
              <label htmlFor="currentLearnLanguageId" className="label text-sm">
                I want to learn
              </label>
              {
                <select
                  {...register3('currentLearnLanguageId')}
                  defaultValue={user?.learnLanguageId}
                  className="input bg-four dark:border-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-tertiary focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {flags[lang.id]} {names[lang.id]}
                    </option>
                  ))}
                </select>
              }
              {errors3.languages && (
                <p style={{ color: 'red', fontSize: '14px' }}>
                  {errors3.languages.message?.toString()}
                </p>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="button-lang-preferences relative inline-flex items-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
