/* eslint-disable max-len */
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import Nav from '../Nav';
import TranslationInput from './TranslationInput';
import TextBody from './Body-Paragraph';

import wordsService from '../../services/words';

import { userwordsState, currenttextState, currentwordState } from '../../states/recoil-states';

const SingleText = function () {
  const currentText = useRecoilValue(currenttextState);
  const currentWord = useRecoilValue(currentwordState);
  const setUserWords = useSetRecoilState(userwordsState);

  useEffect(() => {
    const fetchUserwords = async function() {
      if (currentText) {
        const userWordsResponse = await wordsService.getUserwordsInText(String(currentText.id), currentText.languageId);
        setUserWords(userWordsResponse);
      }
    };

    fetchUserwords();
  }, [currentText]);

  if (currentText) {
    return (
      <div className='Text-page'>
        <Nav />
        <div className='single-text-page'>
          <div className='text-div'>
            <h1>{currentText.title}</h1>
            <TextBody textBody={currentText.body} />
          </div>
          <TranslationInput word={currentWord}/>
        </div>
      </div>
    );
  }

  return (
    <div className='Text-page'>
      <Nav />
      <div className='text-div'>
        <h1>No text found.</h1>
      </div>
    </div>
  );
};

export default SingleText;
