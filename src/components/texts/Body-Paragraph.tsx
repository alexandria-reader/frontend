import {
  selector, useRecoilState, useRecoilValue, useSetRecoilState,
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

const Sentence = function({ sentence }: { sentence: string }) {
  const phrases = useRecoilValue(phrasesState);

  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const tokens = sentence.match(tokenRegExp);

  return (
    <span className='sentence'>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token)) {
            return <Phrase key={token + index} phrase={token} />;
          }

          if (token.match(wordRegExp)) {
            return <Word key={token + index} dataKey={token + index}
            word={token} />;
          }

          return token;
        })
      }
    </span>
  );
};


const Paragraph = function({ paragraph }: { paragraph: string }) {
  const sentences = paragraph.match(/[^\s]([^!?\\.]|\.{3})*["!?\\.\s]*/gmu) || [''];

  return (
    <p>
      {
        sentences.map((sentence, index) => <Sentence key={index} sentence={sentence} />)
      }
    </p>
  );
};


const TextBody = function ({ title, textBody }: { title: string, textBody: string }) {
  const setCurrentWord = useSetRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const paragraphs = textBody.split('\n');

  const isElement = function(element: Element | EventTarget): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const removeUnusedWord = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { target }: { target: Element | EventTarget } = event;

    // if a user clicks empty space inside the text div, the current word is removed
    // if that word did not have a translation (or id) it is removed from userWords
    if (isElement(target) && target.nodeName !== 'SPAN') {
      setCurrentWord(null);

      const updatedWords = [...userWords
        .filter((wordObj) => wordObj.id !== undefined)];
      setUserWords(updatedWords);
    }
  };

  return (
    <>
      <div onClick={(event) => removeUnusedWord(event)} className="flex flex-col container mx-auto p-4 m-4">
        <h1 className='font-bold text-xl mb-2'>{title}</h1>
        {paragraphs.map((paragraph, index) => <Paragraph key={index} paragraph={paragraph} />)}
      </div>
    </>
  );
};

export default TextBody;
