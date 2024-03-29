import { ChangeEvent, MouseEvent, useEffect, useState, Suspense } from 'react';
import parseHTML from 'html-react-parser';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { useLocation } from 'react-router-dom';
import randomNumber from '../../utils/randomNumber';
import {
  userwordsState,
  currentwordState,
  currenttextState,
  currentwordContextState,
  userState,
  currentdictionaryState,
} from '../../states/recoil-states';

import { UserWord, Status, Translation, UserTranslation } from '../../types';

import wordsService from '../../services/words';
import translationServices from '../../services/translations';
import shortenContext from '../../utils/shortenContext';

const ChangeStatus = function ({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const resetCurrentWord = useResetRecoilState(currentwordState);

  const user = useRecoilValue(userState);

  const setWordStatus = function (status: Status, userWord: UserWord) {
    const newUserWord = { ...userWord };
    newUserWord.status = status;

    if (newUserWord.id && user) {
      wordsService.updateStatus(newUserWord);
    }

    if (status) {
      setCurrentWord(newUserWord);
      const updatedWords = [
        ...userWords.filter(
          (wordObj: UserWord) =>
            wordObj.word.toLowerCase() !== newUserWord.word.toLowerCase()
        ),
        newUserWord,
      ];
      setUserWords(updatedWords);
    } else {
      resetCurrentWord();
      const updatedWords = [
        ...userWords.filter(
          (wordObj: UserWord) =>
            wordObj.word.toLowerCase() !== newUserWord.word.toLowerCase()
        ),
      ];
      setUserWords(updatedWords);
    }
  };

  const wordStatusToolbar = word ? (
    <div
      className={`flex flex-row text-md sm:text-sm max-w-fit border border-gray-300
      dark:border-gray-600 justify-center gap-0 rounded-md overflow-visible`}
    >
      <button
        className={`hover:bg-fuchsia-500/40 dark:hover:bg-fuchsia-500/40 rounded-l-md
          has-tooltip dark:border-gray-600 border-r flex flex-col group place-content-center 
        hover:text-white py-2 px-2  focus:outline-none focus:ring-2 focus:ring-offset-1
          ${
            word.status === 'learning'
              ? 'bg-fuchsia-500/40 dark:bg-fuchsia-500/40 text-white'
              : ''
          }
        focus:ring-fuchsia-500/40 dark:focus:ring-fuchsia-500/40`}
        onClick={() => setWordStatus('learning', word)}
        title="Learning"
        type={'button'}
      >
        Learning
      </button>

      <button
        className={`hover:bg-sky-400/70 dark:hover:bg-sky-600/80 has-tooltip flex
          flex-col border-r border-gray-300 dark:border-gray-600 group place-content-center
        hover:text-white py-2 px-2 focus:outline-none focus:ring-2 focus:ring-offset-1
          ${
            word.status === 'familiar'
              ? 'bg-sky-400/70 dark:bg-sky-600/80 text-white'
              : ''
          }
        focus:ring-sky-400/70 dark:focus:ring-sky-600/80`}
        onClick={() => setWordStatus('familiar', word)}
        title="Familiar"
        type={'button'}
      >
        Familiar
      </button>

      <button
        className={`hover:bg-green-600/50 dark:hover:bg-green-800 has-tooltip 
          flex flex-col group place-content-center dark:border-gray-600 hover:text-white py-2 px-2
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${
            word.status === 'learned'
              ? 'bg-green-600/50 dark:bg-green-800 text-white'
              : ''
          }
          focus:ring-green-600/50 dark:focus:ring-green-800`}
        onClick={() => setWordStatus('learned', word)}
        title="Learned"
        type={'button'}
      >
        Learned
      </button>

      <button
        className={`hover:bg-red-600/50 dark:hover:bg-red-700/90 has-tooltip
          rounded-r-md border-gray-300 dark:border-gray-600 border-l bord flex flex-col group
          place-content-center align-center hover:text-white py-2 px-2  focus:outline-none focus:ring-2
          focus:ring-offset-1 ${
            word.status === undefined ? 'bg-red-600 text-white' : ''
          }
        focus:ring-red-600/50 dark:focus:ring-red-700/90`}
        onClick={() => setWordStatus(undefined, word)}
        title="Ignore"
        type={'button'}
      >
        Ignore
      </button>
    </div>
  ) : (
    ''
  );

  return <div className="">{wordStatusToolbar}</div>;
};

const DictionaryIframe = function ({ url }: { url: string }) {
  return (
    <div className="flex justify-center">
      <iframe
        title="Wordreference dictionary"
        className=""
        width="350"
        height="450"
        src={url}
      ></iframe>
    </div>
  );
};

const CurrentTranslationInput = function ({
  translation,
  currentWord,
}: {
  translation: Translation;
  currentWord: UserWord;
}) {
  const [value, setValue] = useState(translation.translation);
  const [initialValue, setInitialValue] = useState('');
  const setCurrentWord = useSetRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);

  const deleteTranslation = async function () {
    const response = await translationServices.removeTranslation(translation);
    if (response) {
      const currentWordTranslations = currentWord.translations.filter(
        (obj) => obj.id !== translation.id
      );
      const newUserWord = { ...currentWord };
      newUserWord.translations = currentWordTranslations;
      setCurrentWord(newUserWord);

      const updatedWords = [
        ...userWords.filter(
          (wordObj: UserWord) => wordObj.id !== newUserWord.id
        ),
        newUserWord,
      ];

      setUserWords(updatedWords);
    }
  };

  const updateTranslation = async function () {
    // should the object be deleted if all the chars are deleted?
    if (value !== initialValue && value) {
      const newTranslation = { ...translation };
      newTranslation.translation = value;
      const updatedTranslation = await translationServices.updateTranslation(
        newTranslation
      );

      const newUserWord = { ...currentWord };
      const currentWordTranslations = [
        updatedTranslation,
        ...currentWord.translations.filter(
          (obj) => obj.id !== updatedTranslation.id
        ),
      ];
      newUserWord.translations = currentWordTranslations;
      setCurrentWord(newUserWord);

      const updatedWords = [
        ...userWords.filter(
          (wordObj: UserWord) => wordObj.id !== newUserWord.id
        ),
        newUserWord,
      ];

      setUserWords(updatedWords);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3">
        <div className="group flex rounded-md shadow-sm">
          <button
            onClick={() => {
              deleteTranslation();
            }}
            title="Delete translation"
            className={
              'group-hover:inline-flex w-[55px] border justify-center group-focus:inline-flex hidden order-2 items-center px-3 rounded-r-md border-l-0 border-red-600 dark:border-red-700/90 bg-red-600 dark:bg-red-700/90 text-white text-sm'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <input
            type="text"
            onBlur={() => updateTranslation()}
            onFocus={() => setInitialValue(value)}
            id="translation"
            onChange={(event) => setValue(event.target.value)}
            value={value}
            className=" flex-1 block focus:ring-0 bg-four dark:border-transparent w-full group-hover:rounded-r-none rounded-md sm:text-sm border-gray-300"
            placeholder="Enter a new translation here"
          />
        </div>
      </div>
    </div>
  );
};

const TranslationComponent = function ({ word }: { word: UserWord | null }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const currentText = useRecoilValue(currenttextState);
  const currentWordContext = useRecoilValue(currentwordContextState);
  const dictionary = useRecoilValue(currentdictionaryState);
  const user = useRecoilValue(userState);
  const location = useLocation();

  const handleTranslation = async function (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    translation: string,
    userWord: UserWord | null
  ) {
    event.preventDefault();

    if (userWord && translation && user) {
      const newUserWord = { ...userWord };

      if (!newUserWord.id) {
        // call api with word with translation object attatched
        const translationObj: UserTranslation = {
          translation,
          targetLanguageId: user.knownLanguageId,
          context: currentWordContext || '',
        };

        const translations = [...userWord.translations, translationObj];
        newUserWord.translations = translations;
        setCurrentWord(newUserWord);

        const userWordFromServer = await wordsService.addWordWithTranslation(
          newUserWord
        );
        setCurrentWord(userWordFromServer);

        const updatedWords = [
          ...userWords.filter(
            (wordObj: UserWord) =>
              wordObj.word.toLowerCase() !== newUserWord.word.toLowerCase()
          ),
          userWordFromServer,
        ];
        setUserWords(updatedWords);
      } else {
        // call api with translation object, add word id to translation obj
        const newTranslationObj: UserTranslation = {
          translation,
          targetLanguageId: user.knownLanguageId,
          context: currentWordContext || '',
          wordId: newUserWord.id,
        };

        // translation is added immediately so it appears instant to user
        let translations = [...userWord.translations, newTranslationObj];
        newUserWord.translations = translations;
        setCurrentWord(newUserWord);
        const response = await translationServices.addTranslation(
          newTranslationObj
        );
        translations = [
          ...userWord.translations.filter(
            (transObj) => transObj.translation !== newTranslationObj.translation
          ),
          response,
        ];

        // once translation is recieved from the server, the word is updated to include
        // the translation id
        const updatedUserWord = { ...userWord };
        updatedUserWord.translations = translations;
        setCurrentWord(updatedUserWord);

        const updatedWords = [
          ...userWords.filter(
            (wordObj: UserWord) =>
              wordObj.word.toLowerCase() !== updatedUserWord.word.toLowerCase()
          ),
          updatedUserWord,
        ];
        setUserWords(updatedWords);
      }
    } else if (location.pathname === '/demo' && userWord) {
      // Demo mode doesn't contact server, it just generates fake random ids
      let demoUserWord: UserWord;

      if (!userWord.id) {
        demoUserWord = { ...userWord, id: randomNumber() };
      } else {
        demoUserWord = { ...userWord };
      }

      const newTranslationObj: UserTranslation = {
        translation,
        targetLanguageId: 'en',
        context: currentWordContext || '',
        wordId: demoUserWord.id,
        id: randomNumber(),
      };

      demoUserWord.translations = [
        ...demoUserWord.translations,
        newTranslationObj,
      ];
      setCurrentWord(demoUserWord);

      const updatedWords = [
        ...userWords.filter(
          (wordObj: UserWord) =>
            wordObj.word.toLowerCase() !== demoUserWord.word.toLowerCase()
        ),
        demoUserWord,
      ];

      setUserWords(updatedWords);
    }
  };

  // if a translation is not set, the state should be restored to 'undefined'
  const [translation, setTranslation] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const handleInput = function (event: ChangeEvent<HTMLInputElement>) {
    setTranslation(event.target.value);
  };

  useEffect(() => {
    if (
      currentWord?.translations.length === 0 &&
      currentWord.word.split(' ').length < 2
    ) {
      setShowDictionary(true);
    } else if (showDictionary) {
      setShowDictionary(false);
    }
  }, [currentWord?.word]);

  const regex = new RegExp(`\\b${currentWord?.word}\\b`, 'gui');

  let shortenedContext = '';
  if (currentWord?.word && currentWordContext) {
    shortenedContext = shortenContext(
      currentWord.word,
      currentWordContext
    ).replaceAll(regex, (match) => `<strong>${match}</strong>`);
  }

  return (
    <div
      className="text-md flex text-lg sm:text-sm flex-col gap-4 mt-2"
      key={`translation-component ${word?.id}`}
    >
      {currentWord && (
        <>
          <div
            id="current-translations"
            className="flex flex-col flex-wrap gap-1"
          >
            {currentWord?.translations?.length > 0 && (
              <>
                <h2>
                  Your translation
                  {currentWord?.translations?.length > 1 ? 's' : ''}:
                </h2>
                {currentWord?.translations.map((transObj) => (
                  <CurrentTranslationInput
                    key={transObj.translation}
                    translation={transObj}
                    currentWord={currentWord}
                  />
                ))}
              </>
            )}

            <label
              htmlFor="translation"
              className={`block text-sm font-normal text-six ${
                currentWord?.translations?.length > 0 ? 'sr-only' : ''
              }`}
            >
              Add translation:
            </label>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <form action="" className="group flex rounded-md">
                  <button
                    onClick={(event) => {
                      handleTranslation(event, translation, word);
                      setShowDictionary(false);
                      setTranslation('');
                    }}
                    id="save-translation"
                    className={`inline-flex dark:border-transparent shadow-none order-2 w-[55px] items-center px-3 rounded-r-md border border-l-0 border-gray-300 ${
                      translation
                        ? 'bg-sky-600 text-white border-0'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-400 pointer-events-none'
                    } text-sm`}
                  >
                    Save
                  </button>
                  <input
                    type="text"
                    id="new-translation"
                    onChange={(event) => handleInput(event)}
                    value={translation}
                    className=" focus:border focus:border-sky-600 bg-four dark:border-transparent focus:ring-0 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    placeholder="Enter a new translation here"
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {currentWord && (
        <>
          {currentWordContext && (
            <div className="md:hidden flex flex-col gap-1">
              <p>{parseHTML(shortenedContext)}</p>
            </div>
          )}
          <div>
            {/* dictionary buttons and change status */}
            <div className="flex flex-col gap-1 text-lg sm:text-sm justify-center">
              {showDictionary && (
                <>
                  <button
                    onClick={() => setShowDictionary(false)}
                    className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white py-2 px-4 rounded my-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-600"
                  >
                    Close Dictionary
                  </button>
                  {/* <DictionaryIframe url={`${dictionary?.url}/${currentWord.word}`} /></>} */}
                  <DictionaryIframe
                    url={`${
                      location.pathname === '/demo'
                        ? 'https://www.wordreference.com/esen'
                        : dictionary?.url
                    }/${currentWord.word}`}
                  />
                </>
              )}
              {!showDictionary && (
                <>
                  <p className="">View word in dictionary:</p>
                  <button
                    onClick={() => setShowDictionary(true)}
                    className="bg-sky-600 dark:bg-sky-700 hover:bg-sky-500 dark:hover:bg-sky-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    WordReference
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.deepl.com/translator#${currentText?.languageId}/${user?.knownLanguageId}/${currentWord.word}/`,
                        'DeepL',
                        'left=100,top=100,width=650,height=550'
                      )
                    }
                    className="bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    DeepL (Popup)
                  </button>
                  {/* <button onClick={() => window.open(`https://www.wordreference.com/${currentText?.languageId}${user?.knownLanguageId}/${currentWord.word}`, 'WordReference', 'left=100,top=100,width=350,height=550')} className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded my-1'>WordReference (Popup)</button>
          <button onClick={() => window.open(`https://translate.google.com/?sl=${currentText?.languageId}&tl=${user?.knownLanguageId}&text=${currentWord.word}%0A&op=translate/`, 'Google Translate', 'left=100,top=100,width=350,height=550')} className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded my-1'>Google Translate (Popup)</button> */}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center">
            {/* {!showDictionary && <ChangeStatus word={word} />} */}
            {<ChangeStatus word={word} />}
          </div>
        </>
      )}
    </div>
  );
};

const TranslationInput = function () {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const user = useRecoilValue(userState);
  const location = useLocation();
  const voices = window.speechSynthesis.getVoices();

  const isElement = function (
    element: Element | EventTarget
  ): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const closeModal = function (event: MouseEvent) {
    event?.preventDefault();
    const element = event.target;

    // if (isElement(element) && (element.id === 'outer-modal')) {
    //   setCurrentWord(null);
    // } else

    if (
      isElement(element) &&
      (element.id === 'close-modal' ||
        element.id === 'close-modal-div' ||
        element?.id === 'close-modal-path')
    ) {
      setCurrentWord(null);

      const updatedWords = userWords.filter((wordObj: UserWord) => wordObj.id);
      setUserWords(updatedWords);
    }
  };

  // specific language variants can be added
  const speak = async function () {
    if (currentWord && user) {
      const utterance = new SpeechSynthesisUtterance(currentWord?.word);

      for (let i = 0; i < voices.length; i += 1) {
        if (voices[i].lang.startsWith(user.learnLanguageId)) {
          utterance.voice = voices[i];
        }
      }

      speechSynthesis.speak(utterance);
    } else if (currentWord && location.pathname === '/demo') {
      const utterance = new SpeechSynthesisUtterance(currentWord?.word);
      let voice;

      for (let i = 0; i < voices.length; i += 1) {
        if (voices[i].lang.startsWith('es') && voices[i].name === 'Jorge') {
          voice = voices[i];
        }
      }

      if (!voice) {
        for (let i = 0; i < voices.length; i += 1) {
          if (voices[i].lang.startsWith('es')) {
            voice = voices[i];
          }
        }
      }

      if (voice) utterance.voice = voice;
      speechSynthesis.speak(utterance);
    }
  };

  if (window.innerWidth > 768) {
    return (
      <>
        <div className=" col-start-2 flex flex-col w-[368px] col-span-1 ">
          <div
            id="translation-component"
            className="sticky top-10 bg-tertiary shadow sm:rounded-lg sm:px-6 py-4 "
          >
            {currentWord && (
              <div className="flex flex-row items-center">
                <svg
                  onClick={() => speak()}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
                <h2 className=" ml-2 text-3xl font-medium text-tertiary mb-2">
                  {currentWord?.word}
                </h2>
              </div>
            )}
            {!currentWord && (
              <h2 className="ml-2 text-3xl font-medium text-tertiary my-4">
                Select a word
              </h2>
            )}
            <Suspense fallback={<div>Loading...</div>}>
              <TranslationComponent
                key={`translation-component ${currentWord?.id}`}
                word={currentWord}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  window.getSelection()?.removeAllRanges();
  window.getSelection()?.empty();

  return (
    <>
      {currentWord && (
        <div
          id="outer-modal"
          onClick={(event) => closeModal(event)}
          className="h-full p-2 fixed inset-0 flex sm:p-6 pointer-events-auto items-end"
        >
          <div
            id="translation-component"
            className="w-full max-h-full p-4 overflow-scroll pointer-events-auto flex flex-col items-center shadow-lg rounded-lg space-y-4 sm:items-end bg-tertiary"
          >
            <div className="w-full sm:px-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                  <svg
                    onClick={() => speak()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-11 w-11 p-2 -mt-1 -ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                  <h2 className="text-3xl font-medium text-tertiary mb-2 ">
                    {currentWord ? `${currentWord.word}` : 'Select a word'}
                  </h2>
                </div>
                <div
                  id="close-modal-div"
                  onClick={(event) => closeModal(event)}
                  className="flex flex-row items-center dark:hover:bg-gray-700 hover:bg-gray-200 rounded-md"
                >
                  <svg
                    id="close-modal"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-11 w-11 p-2 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      id="close-modal-path"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <TranslationComponent
                  key={`translation-component ${currentWord?.id}`}
                  word={currentWord}
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TranslationInput;
