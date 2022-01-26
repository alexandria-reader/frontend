import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { userwordsState, currenttextState, userState } from '../../states/recoil-states';

import TranslationInput from './TranslationInput';
import TextBody from './TextBody';

import wordsService from '../../services/words';
import textsService from '../../services/texts';

import getToken from '../../utils/getToken';
import NotFound from '../NotFound';

import demoText from '../../utils/demoText';
import demoUserWords from '../../utils/demoWords';


const SingleText = function () {
  const [currentText, setCurrentText] = useRecoilState(currenttextState);
  const setUserWords = useSetRecoilState(userwordsState);
  const user = useRecoilValue(userState);
  const params = useParams();
  const [error, setError] = useState('');
  const location = useLocation();

  const fetchUserwords = async function() {
    if (currentText && user) {
      const userWordsResponse = await wordsService
        .getUserwordsInText(String(currentText.id), user.knownLanguageId);
      setUserWords(userWordsResponse);
    }
  };

  const fetchTextAndUserwords = async function() {
    if (params.textId && getToken()) {
      try {
        const text = await textsService.getTextById(params.textId);
        setCurrentText(text);
        fetchUserwords();
      } catch (e) {
        setError('error');
      }
    }
  };

  useEffect(() => {
    if (currentText) {
      fetchUserwords();
    } else if (location.pathname === '/demo') {
      setUserWords(demoUserWords);
    } else {
      fetchTextAndUserwords();
    }
  }, [currentText, user]);

  if (currentText && Number(currentText.id) === Number(params.textId)) {
    return (
      <div key={`text-id:${currentText.id}outer`} className='bg-secondary mx-auto max-w-7xl lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr, 400px] md:gap-8 my-8 lg:grid-flow-col-dense'>
          <TextBody key={`text-id:${currentText.id}unique`} title={currentText.title} textBody={`${currentText.title}. \n${currentText.body}`} />
          <TranslationInput />
        </div>
      </div>
    );
  }

  if (location.pathname === '/demo') {
    return (
      <main className='container mx-auto mb-auto'>
        <div className='bg-secondary mx-auto max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-[1fr, 400px] md:gap-8 my-8 lg:grid-flow-col-dense'>
            <TextBody title={demoText.title} textBody={`${demoText.title}. \n${demoText.body}`} />
            <TranslationInput />
          </div>
        </div>
        </main>
    );
  }

  if (error === 'error') {
    return (
      <div className='Text-page'>
        <NotFound />
      </div>
    );
  }

  return (
    <div className='Text-page'>
    </div>
  );
};

export default SingleText;
