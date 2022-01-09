/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TranslationInput from './TranslationInput';
import TextBody from './Body-Paragraph';
import wordsService from '../../services/words';
import textsService from '../../services/texts';
import {
  userwordsState,
  currenttextState,
  currentwordState,
  userState,
} from '../../states/recoil-states';
import getToken from '../../utils/getToken';
import NotFound from '../NotFound';

const SingleText = function () {
  const [currentText, setCurrentText] = useRecoilState(currenttextState);
  const [currentWord] = useRecoilState(currentwordState);
  const setUserWords = useSetRecoilState(userwordsState);
  const user = useRecoilValue(userState);
  const params = useParams();
  const [error, setError] = useState('');

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
    } else {
      fetchTextAndUserwords();
    }
  }, [currentText, user]);

  if (currentText && Number(currentText.id) === Number(params.textId)) {
    return (
      <div key={`text-id:${currentText.id}outer`} className='bg-gray-100 mx-auto max-w-7xl lg:px-8'>
        {/* <div className='grid grid-cols-1 md:grid-cols-3 md:gap-4 md:my-4'> */}
        <div className='grid grid-cols-1 md:grid-cols-[1fr, 400px] md:gap-8 my-8 lg:grid-flow-col-dense'>
        {/* Check if title ends with a dot, if not add one */}
          <TextBody key={`text-id:${currentText.id}unique`} title={currentText.title} textBody={`${currentText.title}. \n${currentText.body}`} />
          <TranslationInput word={currentWord}/>
        </div>
      </div>
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
