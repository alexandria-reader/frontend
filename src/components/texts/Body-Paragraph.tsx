import {
  selector, useRecoilState, useRecoilValue,
} from 'recoil';

import { Word, Phrase } from './Phrase-Word';

import {
  currentwordState,
  markedwordsState,
  userwordsState,
} from '../../states/recoil-states';

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

  return (
    <p>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token)) {
            return <Phrase key={token + index} phrase={token} />;
          }

          if (token.match(wordRegExp)) {
            return <Word key={token + index} dataKey={token + index}
            word={token} />;
          }

          return <span key={token + index}>{token}</span>;
        })
      }
    </p>
  );
};

const isElement = function(element: Element | EventTarget): element is Element {
  return (element as Element).nodeName !== undefined;
};

const TextBody = function ({ title, textBody }: { title: string, textBody: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const paragraphs = textBody.split('\n');

  const removeUnusedWord = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { target }: { target: Element | EventTarget } = event;
    // if a user clicks empty space inside the text div, the current word is removed
    // if that word did not have a translation (or id) it is removed from userWords,
    // removing the highlight
    if (isElement(target) && target.nodeName !== 'SPAN') {
      setCurrentWord(null);

      const updatedWords = [...userWords
        .filter((wordObj) => wordObj.id !== undefined)];
      setUserWords(updatedWords);
    }
  };

  return (
    <>
      <div onClick={(event) => removeUnusedWord(event)} className="text-div">
        { // title needs to be mapped so users can click on words in it
        }
        <h1>{title}</h1>
        {paragraphs.map((paragraph, index) => <Paragraph key={index} paragraph={paragraph} />)}
      </div>
    </>
  );
};

export default TextBody;
