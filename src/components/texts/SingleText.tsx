import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TranslationInput from './TranslationInput';
import TextBody from './Body-Paragraph';
import wordsService from '../../services/words';
import textsService from '../../services/texts';
import { userwordsState, currenttextState, currentwordState } from '../../states/recoil-states';

const SingleText = function () {
  const [currentText, setCurrentText] = useRecoilState(currenttextState);
  const [currentWord] = useRecoilState(currentwordState);
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
      <div className='bg-gray-100'>
        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-4 my-4'>
          <TextBody title={currentText.title} textBody={`${currentText.title}\n${currentText.body}`} />
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
