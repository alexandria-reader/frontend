/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  selector, useRecoilState, useRecoilValue, useSetRecoilState,
} from 'recoil';
import { Word, Phrase } from './Phrase-Word';
import {
  currentwordContextState,
  currentwordState,
  markedwordsState,
  userwordsState,
} from '../../states/recoil-states';
import { UserWord } from '../../types';

const phrasesState = selector({
  key: 'phrasesState',
  get: ({ get }) => Object.keys(get(markedwordsState)).filter((key) => key.split(' ').length > 1),
});

const Sentence = function({ sentence }: { sentence: string }) {
  const phrases = useRecoilValue(phrasesState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWord = useSetRecoilState(currentwordState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);

  const phraseFinder = phrases.length === 0 ? '' : `(${phrases.join('|')})|`;
  const wordFinder = '(?<words>[\\p{Letter}\\p{Mark}\'-]+)';
  const noWordFinder = '(?<nowords>[^\\p{Letter}\\p{Mark}\'-]+)';

  const wordRegExp = new RegExp(wordFinder, 'gui');
  const tokenRegExp = new RegExp(`${phraseFinder}${wordFinder}|${noWordFinder}`, 'gui');

  const mouseMoveEventHandler = function(event: { buttons: number; }) {
    // const selection = window.getSelection();
    // if (selection !== null && event.buttons > 0) {


    // if (selection !== null && event.buttons > 0) {
    //   console.log(event.target);
    //   const selectedString = selection.toString();
    //   const stringArray = selectedString.split(' ');
    //   // console.log(selectedString);
    //   const startNode = selection.anchorNode;
    //   const endNode = selection.focusNode;

    //   // ensures the first and last words are whole words
    //   let startWord = '';
    //   let endWord = '';

    //   if (startNode && startNode.textContent) {
    //     startWord = startNode.textContent;
    //     stringArray[0] = startWord;
    //   }

    //   if (endNode && endNode.textContent) {
    //     endWord = endNode.textContent;
    //     if (stringArray[stringArray.length - 1] && endWord) {
    //       stringArray[stringArray.length - 1] = endWord;
    //     }
    //   }
    //   console.log(endWord);
    //   const newPhrase = stringArray.join(' ').trim().split('.')[0];
    //   // console.log(newPhrase);
    //   const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase);
    //   let newWordObject: UserWord | undefined;

    //   if (existingWord[0]) {
    //     // eslint-disable-next-line prefer-destructuring
    //     newWordObject = existingWord[0];

    //     setCurrentWord(newWordObject);
    //     setCurrentWordContext(context);
    //   } else {
    //     newWordObject = {
    //       word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
    //     };

    //     setCurrentWord(newWordObject);
    //     setCurrentWordContext(context);
    //   }

    //   console.log(newWordObject);

    //   if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
    //     === newWordObject?.word.toLowerCase()).length === 0) {
    //     // removes any words without an id, meaning that they also have no translation
    //     const updatedWords = [...userWords
    //       .filter((wordObj) => wordObj.id !== undefined), newWordObject];
    //     setUserWords(updatedWords);
    //   }
    // }

    const selection = window.getSelection();

    if (selection !== null && event.buttons > 0) {
    //   console.log(event);

      //   const range = document.createRange();

      //   const sNode = selection.anchorNode?.parentElement?.parentElement;
      //   let eNode;
      //   if (selection.focusNode?.parentElement?.parentElement?.nodeName === 'DIV') {
      //     eNode = selection.focusNode?.parentElement?.parentElement;
      //   }

      //   // const sNode = selection.anchorNode?.parentElement?.parentElement;
      //   // const eNode = selection.focusNode?.parentElement?.parentElement;
      //   if (sNode) {
      //     range.setStart(sNode, 0);
      //   }
      //   // console.log(sNode);
      //   // console.log(eNode);
      //   if (eNode) {
      //     range.setEnd(eNode, 0);
      //   }
      //   // currentSelection, setCurrentSelection
      //   // if (eNode && eNode.textContent) {
      //   //   const length = eNode.textContent?.length || 0;
      //   //   if (eNode && length) {
      //   //     range.setEnd(eNode, length);
      //   //   }
      //   // }

      //   console.log(range.cloneContents().children);

      // const newParent = document.createElement('span');
      // newParent.className = 'bg-gray-900';
      // range.surroundContents(newParent);
      // console.log(newParent);
      // selection.removeAllRanges();
      // const range = document.createRange();

      // if (selection.anchorNode) {
      //   range.selectNode(selection.anchorNode);
      // }
      // selection.addRange(range);
      // console.log(selection);
      // selection.createRange();

      // console.log(selection.getRangeAt(0).surroundContents(newParent));
      // console.log(selection.getRangeAt(0).parentElement());
      // const range = selection.getRangeAt(0);
      // range.selectNode()


      // Working version
      const selectedString = selection.toString();
      // console.log(selection);
      const startNode = selection.anchorNode;
      const endNode = selection.focusNode;
      const stringArray = selectedString.split(' ');

      // ensures the first and last words are whole words
      let startWord = '';
      let endWord = '';
      console.log(startNode?.nodeName);
      if (startNode && startNode?.parentElement?.nodeName === 'SPAN' && startNode.textContent) {
        startWord = startNode.textContent;
        stringArray[0] = startWord;
      }

      if (endNode && endNode?.parentElement?.nodeName === 'SPAN' && endNode.textContent) {
        endWord = endNode.textContent;
        if (stringArray[stringArray.length - 1] && endWord) {
          stringArray[stringArray.length - 1] = endWord;
        }
      }

      const newPhrase = stringArray.join(' ').trim().split('.')[0];

      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase);
      let newWordObject: UserWord | undefined;

      if (existingWord[0]) {
        // eslint-disable-next-line prefer-destructuring
        newWordObject = existingWord[0];

        setCurrentWord(newWordObject);
        setCurrentWordContext(sentence);
      } else {
        newWordObject = {
          word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObject);
        setCurrentWordContext(sentence);
      }

      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObject?.word.toLowerCase()).length === 0) {
        // removes any words without an id, meaning that they also have no translation
        const updatedWords = [...userWords
          .filter((wordObj) => wordObj.id !== undefined), newWordObject];
        setUserWords(updatedWords);
      }
    }

    //   if (event?.buttons > 0 && window.getSelection()) {
    //     // console.log(event.target);
    //     // let elements: string[] = [];
    //     // if (!currentSelection.includes(event.currentTarget.innerText)) {
    //     //   console.log(currentSelection);
    //     //   console.log(event.currentTarget.innerText);
    //     //   const newCurrentSelection = [...currentSelection, event.currentTarget.innerText];
    //     //   console.log(newCurrentSelection);
    //     //   setCurrentSelection(newCurrentSelection);
    //     // }
    //     // const selection = window.getSelection();
    //     // console.log(selection?.toString());
    //     // const range = document.createRange();
    //     // console.log();
    //     // const sNode = selection?.anchorNode?.parentElement;
    //     // console.log(sNode);
    //     // const eNode = selection?.focusNode;
    //     // if (sNode) {
    //     //   console.log(sNode);
    //     //   range.setStart(sNode, 0);
    //     // }

    //     // if (eNode) {
    //     //   let length = 0;
    //     //   if (eNode?.textContent && eNode.nodeName === 'SPAN') {
    //     //     length = eNode.textContent.length - 1;
    //     //   }
    //     //   range.setEnd(eNode, length);
    //     // } else if (sNode) {
    //     //   let length = 0;
    //     //   if (sNode?.textContent && sNode.nodeName === 'SPAN') {
    //     //     length = sNode.textContent.length - 1;
    //     //   }
    //     //   range.setEnd(sNode, length);
    //     // }

    //     // // console.log(range.cloneContents().children);

  //     // // eslint-disable-next-line prefer-destructuring
  //     // const children = range.cloneContents().children;
  //     // console.log(children);
  //     // [...children].forEach((child) => {
  //     //   if (child.textContent && !currentSelection.includes(child.textContent)) {
  //     //     const newCurrentSelection = [...currentSelection, child.textContent];
  //     //     console.log(newCurrentSelection);
  //     //     setCurrentSelection(newCurrentSelection);
  //     //   }
  //     // });
  //   }
  };

  const tokens = sentence.match(tokenRegExp);
  // console.log(tokens);
  return (
    // <span className='sentence'>
    <>
      {
        tokens?.map((token, index) => {
          if (phrases.includes(token.toLowerCase())) {
            return <Phrase mouseMoveEventHandler={mouseMoveEventHandler} key={token + index} phrase={token} context={sentence} />;
          }

          if (token.match(wordRegExp)) {
            return <Word mouseMoveEventHandler={mouseMoveEventHandler} key={token + index} dataKey={token + index}
            word={token} context={sentence} />;
          }

          return token;
        })
      }
    </>
  );
};


const Paragraph = function({ paragraph }: { paragraph: string }) {
  const sentences = paragraph.match(/[^\s]([^!?\\.]|\.{3})*["!?\\.\s]*/gmu) || [''];

  return (
    <>
      {
        sentences.map((sentence, index) => <Sentence key={index} sentence={sentence} />)
      }
    </>
  );
};


const TextBody = function ({ title, textBody }: { title: string, textBody: string }) {
  const [currentWord, setCurrentWord] = useRecoilState(currentwordState);
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
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
      setCurrentWordContext(null);
    }
  };

  return (
    <>
      <div onClick={(event) => removeUnusedWord(event)} className={`container mx-auto p-4 m-4 md:col-span-2 md:col-start-1 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 ${currentWord && window.innerWidth < 760 ? 'blur-sm bg-gray-300' : ''}`}>
        <h1 className='font-bold text-3xl mb-2'>{title}</h1>
          {paragraphs.map((paragraph, index) => <Paragraph key={index} paragraph={paragraph} />)}
      </div>
    </>
  );
};

export default TextBody;
