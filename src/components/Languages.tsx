import {
  FormEvent, useEffect, useState,
} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import languageService from '../services/languages';
import userService from '../services/users';
import { currentUserLanguagesState, languagesState } from '../states/recoil-states';
import { CurrentUserLanguages } from '../types';

export default function Languages({ setShowLanguages }: { setShowLanguages: Function }) {
  const [languages, setLanguages] = useRecoilState(languagesState);
  const setCurrentUserLanguages = useSetRecoilState(currentUserLanguagesState);
  const currentUserLanguages = useRecoilValue(currentUserLanguagesState);
  const [currentKnownId, setCurrentKnownId] = useState('');
  const [currentLearnId, setCurrentLearnId] = useState('');

  // check if currentUserLanguages is set, if not, get from backend

  const getLanguages = async function() {
    const dbLanguages = await languageService.getAllLanguages();
    setLanguages(dbLanguages);
  };

  if (!currentUserLanguages) {
    const user = JSON.parse(localStorage.user);

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownId: user.current_known_language_id,
      currentLearnId: user.current_learn_language_id,
    };

    setCurrentUserLanguages(currentUserLangs);
  }

  const setLanguagesState = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentUserLangs: CurrentUserLanguages = {
      currentKnownId,
      currentLearnId,
    };

    if (currentKnownId && currentLearnId) {
      setCurrentUserLanguages(currentUserLangs);
      await userService.setUserLanguages(currentUserLangs);
      setShowLanguages(false);
    } else {
      // eslint-disable-next-line no-alert
      alert('Select both options (defaults need to be set on signup and saved to recoil');
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <form className='langForm' onSubmit={(event) => setLanguagesState(event)}>
      <p>I know:</p>
      <select value={currentUserLanguages?.currentKnownId} onChange={(event) => setCurrentKnownId(event.target.value)} name="" id="">
        {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
      </select>
      <p>I'm learning:</p>
      <select value={currentUserLanguages?.currentLearnId} onChange={(event) => setCurrentLearnId(event.target.value)} name="" id="">
        {languages.map((lang) => <option key={lang.id} value={lang.id} >{lang.name}</option>)}
      </select>
      <button type='submit'>Save</button>
    </form>
  );
}
