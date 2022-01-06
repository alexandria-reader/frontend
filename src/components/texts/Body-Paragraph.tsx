/* eslint-disable max-len */
import {
  selector, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import { useState, useEffect } from 'react';
// import { textContent } from 'domutils';
import {
  currentwordContextState, currentwordState, markedwordsState, userwordsState,
} from '../../states/recoil-states';

import { Word, Phrase } from './Phrase-Word';

const phrasesState = selector({
  key: 'phrasesState',
  get: ({ get }) => Object.keys(get(markedwordsState)).filter((key) => key.split(' ').length > 1),
});

const Sentence = function({ sentence }: { sentence: string }) {
  const phrases = useRecoilValue(phrasesState);

  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const tokens = sentence.match(tokenRegExp);

  return (
    <>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token.toLowerCase())) {
            return <Phrase key={index + token} phrase={token} context={sentence} />;
          }

          if (token.match(wordRegExp)) {
            return <Word key={index + token} dataKey={index + token}
            word={token} context={sentence} />;
          }

          return <span key={index + token}>{token}</span>;
        })
      }
    </>
  );
};


const Paragraph = function({ paragraph }: { paragraph: string }) {
  const sentences = paragraph.match(/[^\s]([^!?\\.]|\.{3})*["!?\\.\s]*/gmu) || [''];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
    {
      sentences.map((sentence, index) => <div key={index + sentence.slice(1, 9)} className={`${isMobile ? 'inline' : 'inline-block'}`}>
          <Sentence key={index + sentence.slice(1, 9)} sentence={sentence} />
        </div>)
    }
    </>
  );
};


const TextBody = function ({ title, textBody }: { title: string, textBody: string }) {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const paragraphs = textBody.split('\n').filter(Boolean);

  const isElement = function(element: Element | EventTarget): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const removeUnusedWordOrGetPhrase = function(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const { target }: { target: Element | EventTarget } = event;
    // if a user clicks empty space inside the text div, the current word is removed
    // if that word did not have a translation (or id) it is removed from userWords
    if (!window.getSelection()?.toString() && isElement(target) && target.nodeName !== 'SPAN') {
      setCurrentWord(null);

      const updatedWords = [...userWords
        .filter((wordObj) => wordObj.id !== undefined)];
      setUserWords(updatedWords);
      setCurrentWordContext(null);
    }
    // else if (isElement(target) && target.nodeName === 'SPAN' && target?.textContent) {
    //   const text = target?.textContent?.split(' ').filter(Boolean);
    //   console.log(text);

    //   // if user clicks on a span containing words and a space, it's a phrase
    //   if (text.length > 1) {
    //     const current = userWords.filter((wordObj) => wordObj.word === target
    //       .textContent?.toLowerCase());
    //     if (current.length === 1) {
    //       setCurrentWord(current[0]);
    //     }
    //   }
    // }

    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <div onMouseUp={(event) => removeUnusedWordOrGetPhrase(event)} className={`container mx-auto p-4 md:col-span-1 md:col-start-1 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 ${currentWord && window.innerWidth < 760 ? 'blur-sm bg-gray-300' : ''}`}>
        <h1 className='font-bold text-3xl mb-2'>{title}</h1>
          {paragraphs.map((paragraph, index) => <div key={index + paragraph.slice(0, 5)} className='mb-3'><Paragraph key={index + paragraph.slice(0, 5)} paragraph={paragraph} /></div>)}
      </div>
    </>
  );
};

export default TextBody;
