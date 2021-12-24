/* eslint-disable max-len */
import {
  selector, useRecoilValue, useRecoilState, useSetRecoilState,
} from 'recoil';

import { Word, Phrase } from './Phrase-Word';

import { markedwordsState, userwordsState, currentwordState } from '../../states/recoil-states';

const phrasesState = selector({
  key: 'phrasesState',
  get: ({ get }) => Object.keys(get(markedwordsState)).filter((key) => key.split(' ').length > 1),
});


const Paragraph = function({ paragraph }: { paragraph: string }) {
  const phrases = useRecoilValue(phrasesState);

  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const tokens = paragraph.match(tokenRegExp);

  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);

  const handleWordClick = function(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const input = event.target as HTMLElement;
    const word2 = input.textContent || '';

    const wordObj = userWords.filter((arrWordObj) => arrWordObj.word.toLowerCase()
      === word2.toLowerCase());

    if (wordObj.length > 0) {
      const wordObject = wordObj[0];

      if (wordObject.status === undefined || wordObject.status === 'undefined') {
        wordObject.status = 'learning';
      }

      const updatedWords = [...userWords.filter((arrWordObj) => arrWordObj.word.toLowerCase()
        !== word2.toLowerCase()), wordObject];
      setUserWords(updatedWords);
      setCurrentWord(wordObject);
    } else {
      const newWordObj = {
        word: `${word2.toLowerCase()}`, status: 'learning', translations: [], contexts: [],
      };

      setCurrentWord(newWordObj);
      const updatedWords = [...userWords, newWordObj];
      setUserWords(updatedWords);
    }
  };

  return (
    <p>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token)) return <Phrase key={token + index} phrase={token} handleWordClick={handleWordClick} />;
          if (token.match(wordRegExp)) return <Word key={token + index} word={token} handleWordClick={handleWordClick} />;
          return <span key={token + index}>{token}</span>;
        })
      }
    </p>
  );
};


const TextBody = function ({ textBody }: { textBody: string }) {
  const paragraphs = textBody.split('\n');

  return (
    <>
      <div className="text-div">
        {paragraphs.map((paragraph, index) => <Paragraph key={index} paragraph={paragraph} />)}
      </div>
    </>
  );
};

export default TextBody;
