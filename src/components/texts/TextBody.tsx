/* eslint-disable max-len */
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentwordContextState,
  currentwordState,
  userwordsState,
} from '../../states/recoil-states';

import { Paragraph } from './Paragraph-Sentence-Phrase';

import { stripPunctuation } from '../../utils/punctuation';

const TextBody = function ({
  title,
  textBody,
}: {
  title: string;
  textBody: string;
}) {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const paragraphs = textBody.split('\n').filter(Boolean);

  const isElement = function (
    element: Element | EventTarget
  ): element is Element {
    return (element as Element).nodeName !== undefined;
  };

  const removeUnusedWordOrGetPhrase = function (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const { target }: { target: Element | EventTarget } = event;
    // if a user clicks empty space inside the text div, the current word is removed
    // if that word did not have a translation (or id) it is removed from userWords
    if (
      !window.getSelection()?.toString() &&
      isElement(target) &&
      target.nodeName !== 'SPAN'
    ) {
      setCurrentWord(null);

      const updatedWords = [
        ...userWords.filter((wordObj) => wordObj.id !== undefined),
      ];
      setUserWords(updatedWords);
      setCurrentWordContext(null);
    } else if (
      isElement(target) &&
      target.nodeName === 'SPAN' &&
      target?.textContent
    ) {
      const text = target?.textContent?.split(' ').filter(Boolean);

      // if user clicks on a span containing words and a space, it's a phrase
      if (text.length > 1) {
        const current = userWords.filter((wordObj) => {
          if (target.textContent) {
            return (
              stripPunctuation(wordObj.word) ===
              stripPunctuation(target.textContent?.toLowerCase())
            );
          }
          return false;
        });
        if (current.length > 0) {
          setCurrentWord(current[0]);
        }
      }
    }

    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <div
        onMouseUp={(event) => removeUnusedWordOrGetPhrase(event)}
        id="text-body-container"
        className={`container mx-auto prose max-w-none dark:prose-invert p-4 md:col-span-1 md:col-start-1 bg-tertiary px-4 py-5 shadow sm:rounded-lg sm:px-6 ${
          currentWord && window.innerWidth < 768
            ? 'blur-sm bg-gray-300 dark:bg-gray-600'
            : ''
        }`}
      >
        <h1 className="font-bold text-3xl mb-2">{title}</h1>
        {paragraphs.map((paragraph, index) => (
          <div key={index + paragraph.slice(0, 5)} className="mb-3">
            <Paragraph
              key={index + paragraph.slice(0, 5)}
              paragraph={paragraph}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TextBody;
