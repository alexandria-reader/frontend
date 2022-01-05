/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
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

const SingleText = function () {
  const [currentText, setCurrentText] = useRecoilState(currenttextState);
  const [currentWord] = useRecoilState(currentwordState);
  const setUserWords = useSetRecoilState(userwordsState);
  const user = useRecoilValue(userState);
  const params = useParams();

  const fetchUserwords = async function() {
    if (currentText && user) {
      const userWordsResponse = await wordsService
        .getUserwordsInText(String(currentText.id), user.knownLanguageId);
      setUserWords(userWordsResponse);
    }
  };

  const getTextById = async function() {
    if (params.textId && getToken()) {
      const text = await textsService.getTextById(params.textId);
      setCurrentText(text);
    }
  };

  useEffect(() => {
    if (currentText) {
      fetchUserwords();
    } else {
      getTextById();
      fetchUserwords();
    }
  }, [currentText, user]);

  if (currentText) {
    return (
      <div className='bg-gray-100 mx-auto max-w-7xl lg:px-8'>
        {/* <div className='grid grid-cols-1 md:grid-cols-3 md:gap-4 md:my-4'> */}
        <div className='grid grid-cols-1 md:grid-cols-[1fr, 400px] md:gap-8 my-8 lg:grid-flow-col-dense'>
        {/* Check if title ends with a dot, if not add one */}
          <TextBody title={currentText.title} textBody={`${currentText.title}. \n${currentText.body}`} />
          <TranslationInput word={currentWord}/>
        </div>
      </div>
    );
  }

  return (
    <div className='Text-page'>
      <div className='text-div'>
        <h1>No text found. (This sometimes appears when a text is being loaded from the server,
          it will be replaced later by a placeholder)</h1>
      </div>
    </div>
  );
};

export default SingleText;
