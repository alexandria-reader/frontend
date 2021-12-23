import { selector, useRecoilValue } from 'recoil';

import { Word, Phrase } from './Phrase-Word';

import { MarkedWords } from '../../types';

import { userwordsState } from './SingleText';

export const markedwordsState = selector({
  key: 'markedwordsState',
  get: ({ get }) => {
    const markedWords: MarkedWords = {};

    const userWords = get(userwordsState);
    userWords.forEach((userWord) => {
      if (userWord.status) markedWords[userWord.word] = userWord.status;
    });

    return markedWords;
  },
});


const phrasesState = selector({
  key: 'phrasesState',
  get: ({ get }) => Object.keys(get(markedwordsState)).filter((key) => key.split(' ').length > 1),
});


const Paragraph = function({ paragraph }: { paragraph: string }) {
  const phrases = useRecoilValue(phrasesState);

  console.log('\n== phrases ==\n', phrases, '\n');

  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const tokens = paragraph.match(tokenRegExp);

  return (
    <p>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token)) return <Phrase key={token + index} phrase={token} />;
          if (token.match(wordRegExp)) return <Word key={token + index} word={token} />;
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
