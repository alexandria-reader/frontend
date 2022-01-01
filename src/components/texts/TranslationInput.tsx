import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  UserWord, Status, CurrentUserLanguages, Translation,
} from '../../types';
import wordsService from '../../services/words';
import translationServices from '../../services/translations';
import {
  userwordsState, currentwordState, currenttextState, currentUserLanguagesState,
} from '../../states/recoil-states';

const TranslationComponent = function({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const currentWord = useRecoilValue(currentwordState);
  const currentText = useRecoilValue(currenttextState);
  const [currentUserLanguages, setCurrentUserLanguages] = useRecoilState(currentUserLanguagesState);

  function isCurrentUserLanguage(currentUserLangs: CurrentUserLanguages | null)
    : currentUserLangs is CurrentUserLanguages {
    return (currentUserLangs as CurrentUserLanguages)?.currentLearnLanguageId !== undefined;
  }

  const getLanguagesFromLocalStorage = async function() {
    const user = await JSON.parse(localStorage.user);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownLanguageId: user.currentKnownLanguageId,
      currentLearnLanguageId: user.currentLearnLanguageId,
    };

    if (!currentUserLanguages) {
      setCurrentUserLanguages(currentUserLangs);
    }
  };

  useEffect(() => {
    getLanguagesFromLocalStorage();
  }, [currentUserLanguages]);


  const handleTranslation = async function(
    event: React.FormEvent<HTMLFormElement>,
    translation: string,
    userWord: UserWord | null,
  ) {
    event.preventDefault();

    if (userWord) {
      const newUserWord = { ...userWord };

      if (isCurrentUserLanguage(currentUserLanguages)) {
        if (!newUserWord.id) {
          // call api with word with translation object attatched
          const translationObj: Translation = {
            translation,
            targetLanguageId: currentUserLanguages?.currentKnownLanguageId,
            context: '',
          };

          const translations = [...userWord.translations, translationObj];
          newUserWord.translations = translations;
          setCurrentWord(newUserWord);

          const userWordFromServer = await wordsService.addWordWithTranslation(newUserWord);
          setCurrentWord(userWordFromServer);

          const updatedWords = [...userWords
            .filter((wordObj: UserWord) => wordObj.word.toLowerCase()
            !== newUserWord.word.toLowerCase()), userWordFromServer];

          setUserWords(updatedWords);
        } else {
          // call api with translation object, add word id to translation obj
          const newTranslationObj: Translation = {
            translation,
            targetLanguageId: currentUserLanguages?.currentKnownLanguageId,
            context: '',
            wordId: newUserWord.id,
          };

          // translation is added immediately so if appears instant to user
          let translations = [...userWord.translations, newTranslationObj];
          newUserWord.translations = translations;
          setCurrentWord(newUserWord);

          const response = await translationServices.addTranslation(newTranslationObj);
          translations = [...userWord.translations
            .filter((transObj) => transObj.translation !== newTranslationObj.translation),
          response];

          // once translation is recieved from the server, the word is updated to include
          // the translation id
          const updatedUserWord = { ...userWord };
          updatedUserWord.translations = translations;
          setCurrentWord(updatedUserWord);

          const updatedWords = [...userWords
            .filter((wordObj: UserWord) => wordObj.word.toLowerCase()
            !== updatedUserWord.word.toLowerCase()), updatedUserWord];
          setUserWords(updatedWords);
        }
      }
    }
  };

  // if a translation is not set, the state should be restored to 'undefined'
  const [translation, setTranslation] = useState('');
  const handleInput = function(event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  // once translations are converted to objects, remove the || from the translations.map line
  return (
    <div>
      {currentWord && currentWord?.translations?.length > 0
      && <h2>Current translation: {currentWord?.translations.map((transObj) => `${transObj.translation}, `)}</h2>}
      {currentWord && <>
      <div>
        {currentWord && <iframe width="350" height="500"
          src={`https://www.wordreference.com/${currentText?.languageId}${currentUserLanguages?.currentKnownLanguageId}/${currentWord.word}`}>
        </iframe>}
      </div>
      <div className='my-4'>
        <form className=' flex flex-col items-center' onSubmit={(event) => {
          handleTranslation(event, translation, word);
          setTranslation('');
        } }>
          <label htmlFor="translation" className="block text-md font-medium text-gray-700">
            Translation
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="translation"
              id="translation"
              onChange={(event) => handleInput(event)}
              value={translation}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" />
          </div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4' type={'submit'}>Submit</button>
        </form>
      </div></>}
    </div>
  );
};

const ChangeStatus = function({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const setWordStatus = function(status: Status, userWord: UserWord) {
    const newUserWord = { ...userWord };
    newUserWord.status = status;

    if (newUserWord.id) {
      // return word object rather than just status from backend
      wordsService.updateStatus(newUserWord);
    }
    setCurrentWord(newUserWord);

    const updatedWords = [...userWords.filter((wordObj: UserWord) => wordObj.word.toLowerCase()
      !== newUserWord.word.toLowerCase()), newUserWord];
    setUserWords(updatedWords);
  };

  const wordStatusToolbar = word
    ? <div className="word-status-toolbar">
        <button className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus('learning', word)} type={'button'}>Learning</button>
        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus('familiar', word)} type={'button'}>Familiar</button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus('learned', word)} type={'button'}>Learned</button>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus(undefined, word)} type={'button'}>Ignore</button>
      </div>
    : '';

  return (
    <div className="change-status-div">
      {word && <p className='text-xl'>Current status: {word.status}</p>}
      {wordStatusToolbar}
    </div>
  );
};


const TranslationInput = function({ word }: { word: UserWord | null }) {
  return (
    <div className='bg-white shadow sm:rounded-lg sm:px-6 md:flex flex-col m-4 md:col-start-3 min-w-min md:col-span-1 hidden'>
        <h2 className='ml-2 text-3xl font-medium text-gray-900 my-4'>{word ? `${word.word}` : 'Select a word'}</h2>
        <TranslationComponent word={word} />
        <ChangeStatus word={word} />
    </div>
  );
};

export default TranslationInput;
