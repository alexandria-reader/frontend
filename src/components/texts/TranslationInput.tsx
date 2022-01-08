import {
  ChangeEvent, FormEvent, MouseEvent, useEffect, useState, Suspense,
} from 'react';

import {
  useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState,
} from 'recoil';

import {
  userwordsState, currentwordState, currenttextState,
  currentwordContextState, userState, currentdictionaryState,
} from '../../states/recoil-states';

import { UserWord, Status, Translation } from '../../types';
import wordsService from '../../services/words';
import translationServices from '../../services/translations';

const ChangeStatus = function({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const resetCurrentWord = useResetRecoilState(currentwordState);

  const user = useRecoilValue(userState);

  const setWordStatus = function(status: Status, userWord: UserWord) {
    const newUserWord = { ...userWord };
    newUserWord.status = status;

    if (newUserWord.id && user) {
      wordsService.updateStatus(newUserWord);
    }

    if (status) {
      setCurrentWord(newUserWord);
      const updatedWords = [...userWords.filter((wordObj: UserWord) => wordObj.word.toLowerCase()
        !== newUserWord.word.toLowerCase()), newUserWord];
      setUserWords(updatedWords);
    } else {
      resetCurrentWord();
      const updatedWords = [...userWords.filter((wordObj: UserWord) => wordObj.word.toLowerCase()
        !== newUserWord.word.toLowerCase())];
      setUserWords(updatedWords);
    }
  };

  const wordStatusToolbar = word
    ? <div className="flex flex-row text-lg justify-center overflow-visible">
        <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded mx-0.5 my-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500' onClick={() => setWordStatus('learning', word)} type={'button'}>Learning</button>
        <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-2 rounded mx-0.5 my-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500' onClick={() => setWordStatus('familiar', word)} type={'button'}>Familiar</button>
        <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mx-0.5 my-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' onClick={() => setWordStatus('learned', word)} type={'button'}>Learned</button>
        <button className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded mx-0.5 my-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500' onClick={() => setWordStatus(undefined, word)} type={'button'}>Ignore</button>
      </div>
    : '';

  return (
    <div className="mt-3">
      {word && <p className='text-xl'>Current status: {word.status}</p>}
      {wordStatusToolbar}
    </div>
  );
};

const DictionaryIframe = function({ url }: { url: string }) {
  return (
    <div className=''>
      <iframe title='Wordreference dictionary' className='' width="320" height="350"
        src={url}>
      </iframe>
    </div>
  );
};

const TranslationComponent = function({ word }:
{ word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const currentText = useRecoilValue(currenttextState);
  const currentWordContext = useRecoilValue(currentwordContextState);
  const dictionary = useRecoilValue(currentdictionaryState);

  const user = useRecoilValue(userState);

  const handleTranslation = async function(
    event: FormEvent<HTMLButtonElement>,
    translation: string,
    userWord: UserWord | null,
  ) {
    event.preventDefault();

    if (userWord && translation && user) {
      const newUserWord = { ...userWord };

      if (!newUserWord.id) {
        // call api with word with translation object attatched
        const translationObj: Translation = {
          translation,
          targetLanguageId: user.knownLanguageId,
          context: currentWordContext || '',
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
          targetLanguageId: user.knownLanguageId,
          context: currentWordContext || '',
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
  };

  // if a translation is not set, the state should be restored to 'undefined'
  const [translation, setTranslation] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const handleInput = function(event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  useEffect(() => {
    if (showDictionary) {
      setShowDictionary(false);
    }
  }, [currentWord]);

  return (
    <div className='text-xl flex flex-col gap-2' key={`translation-component ${word?.id}`}>
      {currentWord && currentWord?.translations?.length > 0
      && <><h2>Current translation{currentWord?.translations?.length > 1 ? 's' : ''}:</h2>
        <ul className='flex flex-row flex-wrap'>{currentWord?.translations
          .map((transObj) => <li key={`${transObj.id}`} className='p-2 mx-1 shadow-md bg-gray-50 rounded-lg'>{transObj.translation}</li>)}</ul></>}
      {currentWord && <>
      <div className='py-2'>
        <p>Context: {currentWordContext}</p>
      </div>
      <div className=''>
        <form className=' flex flex-col justify-center' >
          <label htmlFor="translation" className="block text-md">
            Add translation:
          </label>
          <div className="relative rounded-md shadow-sm flex flex-row items-center my-2">
            <input
              type="text"
              name="translation"
              id="translation"
              required
              minLength={1}
              onChange={(event) => handleInput(event)}
              value={translation}
              className="focus:ring-sky-600 focus:border-sky-600 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" />
            <button onClick={(event) => {
              handleTranslation(event, translation, word);
              setShowDictionary(false);
              setTranslation('');
            }} className='bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 ml-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500' type={'submit'}>Submit</button>
          </div>
        </form>

        {/* dictionary buttons and change status */}
        <div className='flex flex-col gap-1 justify-center'>
          {showDictionary && <><button onClick={() => setShowDictionary(false)} className='bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded my-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600'>Close Dictionary</button>
          <DictionaryIframe url={`${dictionary?.url}/${currentWord.word}`} /></>}
          {!showDictionary && <><p>View word in dictionary:</p>
          <button onClick={() => setShowDictionary(true)} className='bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded my-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>WordReference</button>
          <button onClick={() => window.open(`https://www.deepl.com/translator#${currentText?.languageId}/${user?.knownLanguageId}/${currentWord.word}/`, 'DeepL', 'left=100,top=100,width=650,height=550')} className='bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded my-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'>DeepL (Popup)</button>
          {/* <button onClick={() => window.open(`https://www.wordreference.com/${currentText?.languageId}${user?.knownLanguageId}/${currentWord.word}`, 'WordReference', 'left=100,top=100,width=350,height=550')} className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded my-1'>WordReference (Popup)</button>
          <button onClick={() => window.open(`https://translate.google.com/?sl=${currentText?.languageId}&tl=${user?.knownLanguageId}&text=${currentWord.word}%0A&op=translate/`, 'Google Translate', 'left=100,top=100,width=350,height=550')} className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded my-1'>Google Translate (Popup)</button> */}
          </>}
        </div>
        {!showDictionary && <ChangeStatus word={word} />}
      </div></>}
    </div>
  );
};

const TranslationInput = function({ word }: { word: UserWord | null }) {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);

  const user = useRecoilValue(userState);

  const voices = window.speechSynthesis.getVoices();

  const isElement = function(element: Element | EventTarget): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const closeModal = function(event:
  MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    event?.preventDefault();
    const element = event.target;
    if (isElement(element) && (element.id === 'outer-modal' || element.id === 'close-modal')) {
      setCurrentWord(null);
    }
  };

  // specific language variants can be added
  const speak = async function() {
    if (word && user) {
      const utterance = new SpeechSynthesisUtterance(word?.word);

      for (let i = 0; i < voices.length; i += 1) {
        if (voices[i].lang.startsWith(user.learnLanguageId)) {
          utterance.voice = voices[i];
        }
      }

      speechSynthesis.speak(utterance);
    }
  };

  // if (currentWord) {
  //   window.getSelection()?.removeAllRanges();
  //   window.getSelection()?.empty();
  // }

  if (window.innerWidth > 768) {
    return (
      <>
        <div className=' md:col-start-2 md:flex flex-col w-[368px] md:col-span-1 hidden'>
          <div className='sticky top-10 bg-white shadow sm:rounded-lg sm:px-6 py-4 '>
            {word && <div className='flex flex-row items-center'>
              <svg onClick={() => speak()} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <h2 className=' ml-2 text-3xl font-medium text-gray-900 mb-2'>{word.word}</h2>
            </div>}
            {!word && <h2 className='ml-2 text-3xl font-medium text-gray-900 my-4'>Select a word</h2>}
            <Suspense fallback={<div>Loading...</div>}>
              <TranslationComponent key={`translation-component ${word?.id}`} word={word} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {currentWord && <div id='outer-modal' onClick={(event) => closeModal(event)} className='sm:hidden p-2 fixed inset-0 flex items-end sm:p-6 pointer-events-auto sm:items-start'>
      <div className='w-full p-4 overflow-scroll pointer-events-auto flex flex-col items-center shadow-lg rounded-lg space-y-4 sm:items-end bg-white'>
        <div className='w-full'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
              <svg onClick={() => speak()} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <h2 className=' ml-2 text-3xl font-medium text-gray-900 mb-2'>{word ? `${word.word}` : 'Select a word'}</h2>
            </div>
            <div onClick={(event) => closeModal(event)} className='flex flex-row items-center'>
              <svg id='close-modal' xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <TranslationComponent key={`translation-component ${word?.id}`} word={word} />
          </Suspense>
        </div>
      </div>
    </div>}
  </>
  );
};

export default TranslationInput;
