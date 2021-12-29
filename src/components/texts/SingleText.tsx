import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav';
import TranslationInput from './TranslationInput';
import TextBody from './Body-Paragraph';
import wordsService from '../../services/words';
import textsService from '../../services/texts';
import { userwordsState, currenttextState, currentwordState } from '../../states/recoil-states';

const SingleText = function () {
  const [currentText, setCurrentText] = useRecoilState(currenttextState);
  const currentWord = useRecoilValue(currentwordState);
  const setUserWords = useSetRecoilState(userwordsState);
  const params = useParams();

  const fetchUserwords = async function() {
    if (currentText) {
      const userWordsResponse = await wordsService
        .getUserwordsInText(String(currentText.id), currentText.languageId);
      setUserWords(userWordsResponse);
    }
  };

  const getTextById = async function() {
    if (params.textId) {
      const text = await textsService.getTextById(params.textId);
      setCurrentText(text);
    }
  };

  useEffect(() => {
    if (currentText) {
      fetchUserwords();
    } else {
      getTextById();
    }
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
        <h1>No text found. (This sometimes appears when a text is being loaded from the server,
          it will be replaced later by a placeholder)</h1>
      </div>
    </div>
  );
};

export default SingleText;
