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
  const [currentKnownId, setCurrentKnownId] = useState('');
  const [currentLearnId, setCurrentLearnId] = useState('');

  const getLanguageListFromServer = async function() {
    const dbLanguages = await languageService.getAllLanguages();
    setLanguages(dbLanguages);
  };

  const getLanguagesFromLocalStorage = async function() {
    const user = await JSON.parse(localStorage.user);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownId: user.current_known_language_id,
      currentLearnId: user.current_learn_language_id,
    };

    if (!currentUserLanguages) {
      setCurrentUserLanguages(currentUserLangs);
    }

    if (!currentKnownId) {
      setCurrentKnownId(`${currentUserLanguages?.currentKnownId || currentUserLangs.currentKnownId}`);
    }

    if (!currentLearnId) {
      setCurrentLearnId(`${currentUserLanguages?.currentLearnId || currentUserLangs.currentLearnId}`);
    }
  };

  const setUserLanguagesOnServer = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownId,
      currentLearnId,
    };

    if (currentKnownId && currentLearnId) {
      if (currentKnownId === currentLearnId) {
        // eslint-disable-next-line no-alert
        alert('Leaning language cannot be the same as known language');
      } else {
        setCurrentUserLanguages(currentUserLangs);
        // todo: change server side to stop password hash from being returned
        const localStorageUser: LocalStorageUser = await JSON.parse(localStorage.user);
        const updatedUser: User = await userService.setUserLanguages(currentUserLangs);

        const newLocalStorageUser: LocalStorageUser = {
          current_known_language_id: updatedUser.current_known_language_id,
          current_learn_language_id: updatedUser.current_learn_language_id,
          email: localStorageUser.email,
          token: localStorageUser.token,
          username: localStorageUser.username,
        };

        // updates the languages on user in local storage
        localStorage.setItem('user', JSON.stringify(newLocalStorageUser));
        setShowLanguages(false);
        setCurrentKnownId(currentUserLangs.currentKnownId);
        setCurrentLearnId(currentUserLangs.currentLearnId);
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
      <p>I know:</p>
      {currentKnownId && <select value={currentKnownId} onChange={(event) => setCurrentKnownId(event.target.value)} name="" id="">
        {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
      </select>}
      <p>I'm learning:</p>
      {currentLearnId && <select value={currentLearnId} onChange={(event) => setCurrentLearnId(event.target.value)} name="" id="">
        {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
      </select>}
      <button type='submit'>Save</button>
    </form>
  );
}
