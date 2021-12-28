import { useState, useEffect, FormEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import textsService from '../../services/texts';
import Nav from '../Nav';
import { CurrentUserLanguages, Text } from '../../types';

import { textlistState, currenttextState, currentUserLanguagesState } from '../../states/recoil-states';


const IndividualText = function({ text }: { text: Text }) {
  const setCurrentText = useSetRecoilState(currenttextState);
  const [textList, setTextList] = useRecoilState(textlistState);

  const removeTextFromServer = async function (id: number | undefined) {
    if (id) {
      // backend needs to check user token
      await textsService.removeTextFromServer(id);
      const updatedTextList = textList.filter((textObj) => textObj.id !== id);
      setTextList(updatedTextList);
    }
  };

  return (
    <li className='textItem'>
      <h2><a href='#' onClick={(_event) => setCurrentText(text)}>{text.title}</a></h2>
      <p>{`${text.body.slice(0, 297)}...`}</p>
      <button onClick={() => removeTextFromServer(text.id)}>Delete</button>
    </li>
  );
};

const NewTextForm = function({
  submitText, setNewTextTitle, setNewText, newTextTitle, newText,
}:
{
  submitText: Function,
  setNewTextTitle: Function,
  setNewText: Function,
  newTextTitle: string,
  newText: string
}) {
  return (
    <div >
      <p>Add a new text here:</p>
      <form className='newTextForm' onSubmit={(event) => submitText(event)}>
      <input type={'text'} placeholder='title' name='title' value={newTextTitle} onChange={(e) => setNewTextTitle(e.target.value)}></input>
      <textarea name='text' placeholder='text body' value={newText} onChange={(e) => setNewText(e.target.value)}></textarea>
      <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

const UserTexts = function() {
  const [textList, setTextList] = useRecoilState(textlistState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loaded, setLoaded] = useState(false);
  const [newText, setNewText] = useState('');
  const [newTextTitle, setNewTextTitle] = useState('');
  const [currentUserLanguages, setCurrentUserLanguages] = useRecoilState(currentUserLanguagesState);

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
  }, []);


  function isCurrentUserLanguage(currentUserLangs: CurrentUserLanguages | null)
    : currentUserLangs is CurrentUserLanguages {
    return (currentUserLangs as CurrentUserLanguages)?.currentLearnLanguageId !== undefined;
  }

  const fetchUserTexts = async function() {
    if (isCurrentUserLanguage(currentUserLanguages)) {
      const languageId = currentUserLanguages.currentLearnLanguageId;
      console.log(languageId);
      const userTextsResponse = await textsService.getAllUserTextsByLanguage(languageId);
      setTextList(userTextsResponse);
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchUserTexts();
  }, []);

  useEffect(() => {
    fetchUserTexts();
  }, [currentUserLanguages]);

  const submitText = async function(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTextObj: Text = {
      languageId: currentUserLanguages?.currentLearnLanguageId || '',
      title: newTextTitle,
      body: newText,
    };
    console.log(newTextObj);
    const addTextResponse = await textsService.postNewText(newTextObj);
    const newUsersTexts = [...textList, addTextResponse];
    setTextList(newUsersTexts);
    setLoaded(true);
    setNewText('');
    setNewTextTitle('');
  };

  // if (!loaded) {
  //   return <div>Loading...</div>;
  // }

  return (
      <div>
        <Nav />
        {textList.length === 0 && <li>You have no texts, please add a text to begin.</li>}
        <NewTextForm submitText={submitText} newTextTitle={newTextTitle}
        newText={newText} setNewTextTitle={setNewTextTitle} setNewText={setNewText} />
        <ul className='textList'>
          {textList.map((text) => <IndividualText key={text.id} text={text} />)}
        </ul>
      </div>
  );
};

export default UserTexts;
