import { selector, useRecoilValue } from 'recoil';
import { markedwordsState } from '../../states/recoil-states';

import Word from './Word';

import { stripPunctuation } from '../../utils/punctuation';
import { wordRegExp, parseText } from '../../utils/textParser';

const phrasesState = selector({
  key: 'phrasesState',
  get: ({ get }) =>
    Object.keys(get(markedwordsState)).filter((key) => key.match(/\S\s+\S/)),
});

export const Phrase = function ({
  phrase,
  context,
}: {
  phrase: string;
  context: string;
}) {
  const markedWords = useRecoilValue(markedwordsState);
  const phraseStatus = markedWords[stripPunctuation(phrase.toLowerCase())];

  let wordClass = '';
  if (phraseStatus === 'learning') {
    wordClass = 'bg-fuchsia-500/40 dark:bg-fuchsia-500/40';
  } else if (phraseStatus === 'familiar') {
    wordClass = 'bg-sky-400/40 dark:bg-sky-600/40';
  }

  const tokens = parseText(phrase);

  return (
    <>
      <div className="inline text-xl md:text-lg">
        <span
          className={`${wordClass} cursor-pointer m-[-1px] border border-transparent betterhover:hover:border-zinc-500 hover:py-2.5 md:py-1.5 py-2 rounded-md`}
          data-type={'phrase'}
        >
          {tokens?.map((token, index) => {
            if (token.match(wordRegExp)) {
              return (
                <Word
                  key={index + token}
                  dataKey={index + token}
                  word={token}
                  context={context}
                />
              );
            }

            return token;
          })}
        </span>
      </div>
    </>
  );
};

export const Sentence = function ({ sentence }: { sentence: string }) {
  const phrases = useRecoilValue(phrasesState);
  const tokens = parseText(sentence, phrases);

  return (
    <>
      {tokens?.map((token, index) => {
        if (token.match(/\S\s+\S/)) {
          return (
            <Phrase key={index + token} phrase={token} context={sentence} />
          );
        }

        if (token.match(wordRegExp)) {
          return (
            <Word
              key={index + token}
              dataKey={index + token}
              word={token}
              context={sentence}
            />
          );
        }

        return (
          <div
            key={index + token}
            className="inline text-xl md:text-lg my-2 md:my-1.5"
          >
            {token}
          </div>
        );
      })}
    </>
  );
};

export const Paragraph = function ({ paragraph }: { paragraph: string }) {
  const sentences = paragraph.match(/[^\s]([^!?.]|\.{3})*["!?.:;\s]*/gmu) || [
    '',
  ];

  return (
    <>
      {sentences.map((sentence, index) => (
        <div key={index + sentence.slice(1, 9)} className="inline">
          <Sentence sentence={sentence} />
        </div>
      ))}
    </>
  );
};
