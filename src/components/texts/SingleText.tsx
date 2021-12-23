/* eslint-disable max-len */
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import Nav from '../Nav';
import TranslationInput from './TranslationInput';
import TextBody from './Body-Paragraph';

import wordsService from '../../services/words';
import { UserWord } from '../../types';


import { currenttextState } from '../Texts';
import { currentwordState } from './Phrase-Word';

export const userwordsState = atom<Array<UserWord>>({
  key: 'userwordsState',
  default: [],
});


const SingleText = function () {
  const currentText = useRecoilValue(currenttextState);
  const setUserWords = useSetRecoilState(userwordsState);
  const currentWord = useRecoilValue(currentwordState);

  useEffect(() => {
    const fetchUserwords = async function() {
      if (currentText) {
        const userWordsResponse = await wordsService.getUserwordsInText(Number(currentText.id), 'de');
        setUserWords(userWordsResponse);
      }
    };

    fetchUserwords();
  });

  if (currentText) {
    return (
      <div className='Text-page'>
        {/* <Nav /> */}
        <div className='text-div'>
          <h1>{currentText.title}</h1>
          <TextBody textBody={currentText.body} />
        </div>
        <TranslationInput word={currentWord}/>
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
