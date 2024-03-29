import { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import textsService from '../../services/texts';
import {
  textlistState,
  textToEditState,
  userState,
} from '../../states/recoil-states';
import { ArticleData, Text } from '../../types';
import urlService from '../../services/url';

const TextForm = function () {
  const [textList, setTextList] = useRecoilState(textlistState);
  const [newTextBody, setNewTextBody] = useState('');
  const [newTextTitle, setNewTextTitle] = useState('');
  const [newTextURL, setNewTextURL] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [showURLWarning, setShowURLWarning] = useState(false);
  const [newTextExtractionURL, setNewTextExtractionURL] = useState('');
  const [textToEdit, setTextToEdit] = useRecoilState(textToEditState);
  const navigate = useNavigate();

  const user = useRecoilValue(userState);

  const fetchUserTexts = async function () {
    if (user) {
      const userTextsResponse = await textsService.getAllUserTextsByLanguage(
        user.learnLanguageId
      );
      setTextList(userTextsResponse);
    }
  };

  useEffect(() => {
    fetchUserTexts();
  }, [user]);

  useEffect(() => {
    if (textToEdit) {
      setNewTextTitle(textToEdit.title);
      setNewTextBody(textToEdit.body);
      setNewTextURL(textToEdit?.sourceURL || '');
    }
  }, [textToEdit]);

  const submitText = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTextObj: Text = {
      languageId: user?.learnLanguageId || '',
      title: newTextTitle,
      body: newTextBody,
    };

    if (user && textList) {
      const addTextResponse = await textsService.postNewText(newTextObj);
      const newUsersTexts = [...textList, addTextResponse];
      setTextList(newUsersTexts);
      navigate('/texts');
    }

    setNewTextBody('');
    setNewTextTitle('');
  };

  const extractTextFromURL = async function (
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (newTextExtractionURL.startsWith('http')) {
      setShowURLWarning(false);
      const textObject: ArticleData | null = await urlService.postURL(
        newTextExtractionURL
      );

      if (textObject?.content) {
        let body = textObject.content;
        body = body.replaceAll('</p>', '</p> \r\n');
        body = body.replaceAll(/<\/h\d>/g, (match) => `${match} \r\n`);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = body;
        const { textContent } = tempDiv;

        setNewTextBody(textContent || '');
        setNewTextTitle(textObject.title);
        setNewTextURL(textObject.url);
        setNewTextExtractionURL('');
      } else {
        setWarningMessage(
          'Text extraction failed. Please try another link or copy the text manually'
        );
        setShowURLWarning(true);
      }
    } else {
      setWarningMessage('URL must start with http.');
      setShowURLWarning(true);
    }
  };

  const updateText = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user && textList && textToEdit) {
      const newTextObj: Text = {
        id: textToEdit.id,
        languageId: textToEdit.languageId,
        title: newTextTitle,
        body: newTextBody,
        sourceURL: newTextURL,
        userId: textToEdit.userId,
      };

      const addTextResponse = await textsService.updateText(newTextObj);
      const newUsersTexts = [
        ...textList.filter((text) => text.id !== textToEdit.id),
        addTextResponse,
      ];
      setTextList(newUsersTexts);
      navigate('/texts');
    }

    setNewTextBody('');
    setNewTextTitle('');
    setNewTextURL('');
    setTextToEdit(null);
  };

  const cancelButton = function () {
    setTextToEdit(null);
    setNewTextBody('');
    setNewTextTitle('');
    setNewTextURL('');
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
          <div className="pb-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-tertiary">
              {textToEdit ? 'Edit text' : 'Add new text'}
            </h2>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 mx-auto md:gap-6 min-h-full max-w-7xl sm:grid-cols-1 lg:grid-cols-3 px-4 py-8 sm:px-8 lg:px-10">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-tertiary">
              {textToEdit ? 'Edit text' : 'New text'}
            </h3>
            <p className="mt-1 text-sm text-secondary">
              {textToEdit ? 'Edit your text here:' : 'Add a new text here:'}
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form
            action="#"
            method="POST"
            onSubmit={(event) => {
              if (textToEdit) {
                updateText(event);
              } else {
                submitText(event);
              }
            }}
          >
            <div className="sm:rounded-md sm:overflow-hidden">
              <div className="px-4 bg-secondary space-y-6 sm:px-6 ">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-six"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        required
                        className="focus:ring-0 bg-tertiary dark:border-transparent focus:border-sky-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                        value={newTextTitle}
                        onChange={(e) => setNewTextTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-six"
                  >
                    Text body:
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={10}
                      className="shadow-sm bg-tertiary dark:border-transparent focus:ring-0 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Paste your text here"
                      value={newTextBody}
                      onChange={(e) => setNewTextBody(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 flex justify-end bg-secondary text-right sm:px-6">
                <button
                  type="submit"
                  className={`inline-flex mx-2 ${
                    newTextBody && newTextTitle
                      ? 'bg-sky-600 text-white border-0 focus:ring-sky-500 hover:bg-sky-500'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-400 pointer-events-none'
                  } justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  Save
                </button>
                <NavLink to={'/texts'} onClick={() => cancelButton()}>
                  <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                    Cancel
                  </button>
                </NavLink>
              </div>
            </div>
          </form>
        </div>

        <div className="md:col-span-3 md:gap-6 md:grid md:grid-cols-3 border-t-gray-500">
          {!textToEdit && (
            <div className="md:col-span-1 mt-6 sm:mt-6">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-tertiary">
                  {'BETA feature: Extract text from URL'}
                </h3>
                <p className="mt-1 text-sm text-secondary">
                  {
                    'Automatically extract text and title. May not work on every website.'
                  }
                </p>
              </div>
            </div>
          )}
          {!textToEdit && (
            <div className="mt-6 md:mt-6 md:col-span-2">
              <form
                action="#"
                method="POST"
                onSubmit={(event) => extractTextFromURL(event)}
              >
                <div className=" sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 bg-secondary space-y-6 sm:px-6">
                    <div className="">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="text-url"
                          className="block text-sm font-medium text-six"
                        >
                          Source URL:
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="text-url"
                            id="text-url"
                            value={newTextExtractionURL}
                            onChange={(e) =>
                              setNewTextExtractionURL(e.target.value)
                            }
                            className="focus:ring-0 focus:border-sky-500 focus:border dark:border-transparent bg-tertiary flex-1 block w-full rounded-l-md sm:text-sm border-gray-300"
                            placeholder="https://www.example.com/article"
                          />
                          <button
                            type="submit"
                            className={`inline-flex focus:ring-0 justify-center py-2 px-4 border border-l-0 border-gray-300 dark:border-transparent shadow-sm text-sm font-medium rounded-r-md text-white ${
                              newTextExtractionURL
                                ? 'bg-sky-600 text-white border-1 border-sky-600 focus:ring-sky-600 hover:bg-sky-600'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-400 pointer-events-none'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 `}
                          >
                            Extract
                          </button>
                        </div>
                        {showURLWarning && (
                          <p className="text-sm text-red-500">
                            {warningMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TextForm;
