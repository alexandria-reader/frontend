import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ChangeEvent, MouseEvent, useEffect, useState,
} from 'react';
import {
  UserWord, Status, CurrentUserLanguages, Translation,
} from '../../types';
import wordsService from '../../services/words';
import translationServices from '../../services/translations';
import {
  userwordsState, currentwordState, currenttextState, currentUserLanguagesState,
} from '../../states/recoil-states';

const ChangeStatus = function({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const setWordStatus = function(status: Status, userWord: UserWord) {
    const newUserWord = { ...userWord };
    newUserWord.status = status;

    if (newUserWord.id) {
      wordsService.updateStatus(newUserWord);
    }
    setCurrentWord(newUserWord);

    const updatedWords = [...userWords.filter((wordObj: UserWord) => wordObj.word.toLowerCase()
      !== newUserWord.word.toLowerCase()), newUserWord];
    setUserWords(updatedWords);
  };

  const wordStatusToolbar = word
    ? <div className="flex flex-row justify-center overflow-visible">
        <button className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus('learning', word)} type={'button'}>Learning</button>
        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus('familiar', word)} type={'button'}>Familiar</button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus('learned', word)} type={'button'}>Learned</button>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-3 rounded my-4' onClick={() => setWordStatus(undefined, word)} type={'button'}>Ignore</button>
      </div>
    : '';

  return (
    <div className="">
      {word && <p className='text-xl'>Current status: {word.status}</p>}
      {wordStatusToolbar}
    </div>
  );
};

const DictionaryIframe = function({ url }: { url: string }) {
  return (
    <>
      <iframe width="320" height="350"
        src={url}>
      </iframe>
    </>
  );
};

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
            targetLanguageId: currentUserLanguages?.currentLearnLanguageId,
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
            targetLanguageId: currentUserLanguages?.currentLearnLanguageId,
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
  const [showDictionary, setShowDictionary] = useState(false);
  const handleInput = function(event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  return (
    <div>
      {currentWord && currentWord?.translations?.length > 0
      && <><h2>Current translation{currentWord?.translations?.length > 1 ? 's' : ''}:</h2>
        <ul className='flex flex-row'>{currentWord?.translations
          .map((transObj) => <li className='p-2 mx-1 shadow-md bg-gray-50 rounded-lg'>{transObj.translation}</li>)}</ul></>}
      {currentWord && <>
      <div className='my-4'>
        <form className=' flex flex-col justify-center' onSubmit={(event) => {
          handleTranslation(event, translation, word);
          setShowDictionary(false);
          setTranslation('');
        } }>
          <label htmlFor="translation" className="block text-md font-medium text-gray-700">
            Add translation:
          </label>
          <div className="relative rounded-md shadow-sm flex flex-row items-center my-2">
            <input
              type="text"
              name="translation"
              id="translation"
              onChange={(event) => handleInput(event)}
              value={translation}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type={'submit'}>Submit</button>
          </div>
        </form>

        {/* dictionary buttons and change status */}
        <div className='flex flex-col justify-center'>
          {showDictionary && <><button onClick={() => setShowDictionary(false)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-1'>Close Dictionary</button>
          <DictionaryIframe url={`https://www.wordreference.com/${currentText?.languageId}${currentUserLanguages?.currentKnownLanguageId}/${currentWord.word}`} /></>}
          {!showDictionary && <><p>View word in dictionary:</p>
          <button onClick={() => setShowDictionary(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1'>WordReference</button>
          <button onClick={() => window.open(`https://www.deepl.com/translator#${currentText?.languageId}/${currentUserLanguages?.currentKnownLanguageId}/${currentWord.word}/`, 'DeepL', 'left=100,top=100,width=650,height=550')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1'>DeepL (Popup)</button>
          {/* <button onClick={() => window.open(`https://www.wordreference.com/${currentText?.languageId}${currentUserLanguages?.currentKnownLanguageId}/${currentWord.word}`, 'WordReference', 'left=100,top=100,width=350,height=550')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1'>WordReference (Popup)</button>
          <button onClick={() => window.open(`https://translate.google.com/?sl=${currentText?.languageId}&tl=${currentUserLanguages?.currentKnownLanguageId}&text=${currentWord.word}%0A&op=translate/`, 'Google Translate', 'left=100,top=100,width=350,height=550')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1'>Google Translate (Popup)</button> */}
          </>}
        </div>
        {!showDictionary && <ChangeStatus word={word} />}
      </div></>}
    </div>
  );
};

const TranslationInput = function({ word }: { word: UserWord | null }) {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);

  const isElement = function(element: Element | EventTarget): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const closeModal = function(event:
  MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    event?.preventDefault();
    const element = event.target;
    if (isElement(element) && element.id === 'outer-modal') {
      setCurrentWord(null);
    }
  };

  if (window.innerWidth > 768) {
    return (
      <>
        <div className='bg-white shadow sm:rounded-lg sm:px-6 md:flex flex-col m-4 md:col-start-3 min-w-min md:col-span-1 hidden'>
          <h2 className='ml-2 text-3xl font-medium text-gray-900 my-4'>{word ? `${word.word}` : 'Select a word'}</h2>
          <TranslationComponent word={word} />
        </div>
      </>
    );
  }

  return (
    <>
      {currentWord && <div id='outer-modal' onClick={(event) => closeModal(event)} className='sm:hidden p-2 fixed inset-0 flex items-end sm:p-6 pointer-events-auto sm:items-start'>
      <div className='w-full p-4 overflow-scroll pointer-events-auto flex flex-col items-center shadow-lg rounded-lg space-y-4 sm:items-end bg-white'>
        <div className='w-full'>
          <h2 className='text-3xl font-medium text-gray-900 mb-2'>{word ? `${word.word}` : 'Select a word'}</h2>
          <TranslationComponent word={word} />
        </div>
      </div>
    </div>}
  </>
  );
};

export default TranslationInput;
