import {
  FormEvent, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import languageService from '../services/languages';
import userService from '../services/users';
import { currentUserLanguagesState, languagesState } from '../states/recoil-states';
import { CurrentUserLanguages, User, LocalStorageUser } from '../types';

export default function Languages({ setShowLanguages }: { setShowLanguages: Function }) {
  const [languages, setLanguages] = useRecoilState(languagesState);
  const [currentUserLanguages, setCurrentUserLanguages] = useRecoilState(currentUserLanguagesState);
  const [currentKnownLanguageId, setCurrentKnownLanguageId] = useState('');
  const [currentLearnLanguageId, setCurrentLearnLanguageId] = useState('');

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageService.getAllLanguages();
    setLanguages(dbLanguages);
  };

  const getLanguagesFromLocalStorage = async function() {
    const user = await JSON.parse(localStorage.user);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownLanguageId: user.currentKnownLanguageId,
      currentLearnLanguageId: user.currentLearnLanguageId,
    };

    if (!currentUserLanguages) {
      setCurrentUserLanguages(currentUserLangs);
    }

    if (!currentKnownLanguageId) {
      setCurrentKnownLanguageId(`${currentUserLanguages?.currentKnownLanguageId || currentUserLangs.currentKnownLanguageId}`);
    }

    if (!currentLearnLanguageId) {
      setCurrentLearnLanguageId(`${currentUserLanguages?.currentLearnLanguageId || currentUserLangs.currentLearnLanguageId}`);
    }
  };

  const setUserLanguagesOnServer = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownLanguageId,
      currentLearnLanguageId,
    };


    if (currentKnownLanguageId && currentLearnLanguageId) {
      if (currentKnownLanguageId === currentLearnLanguageId) {
        // eslint-disable-next-line no-alert
        alert('Leaning language cannot be the same as known language');
      } else {
        setCurrentUserLanguages(currentUserLangs);

        const localStorageUser: LocalStorageUser = await JSON.parse(localStorage.user);
        const updatedUser: User = await userService.setUserLanguages(currentUserLangs);

        const newLocalStorageUser: LocalStorageUser = {
          currentKnownLanguageId: updatedUser.currentKnownLanguageId,
          currentLearnLanguageId: updatedUser.currentLearnLanguageId,
          email: localStorageUser.email,
          token: localStorageUser.token,
          username: localStorageUser.username,
        };

        // updates the languages on user in local storage
        localStorage.setItem('user', JSON.stringify(newLocalStorageUser));

        setShowLanguages(false);
        setCurrentKnownLanguageId(currentUserLangs.currentKnownLanguageId);
        setCurrentLearnLanguageId(currentUserLangs.currentLearnLanguageId);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Select both options (defaults need to be set on signup and saved to recoil');
    }
  };

  useEffect(() => {
    getLanguageListFromServer();
    getLanguagesFromLocalStorage();
  }, []);

  return (
    <form className='langForm' onSubmit={(event) => setUserLanguagesOnServer(event)}>
      <p onClick={() => setShowLanguages(false)}>X</p>
      <label>I know:</label>
      {currentKnownLanguageId && <select value={currentKnownLanguageId} onChange={(event) => setCurrentKnownLanguageId(event.target.value)} name="" id="">
        {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
      </select>}
      <label>I'm learning:</label>
      {currentLearnLanguageId && <select value={currentLearnLanguageId} onChange={(event) => setCurrentLearnLanguageId(event.target.value)} name="" id="">
        {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
      </select>}
      <button type='submit'>Save</button>
    </form>
  );
}
