/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Fragment, MouseEvent, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import {
  markedwordsState, userwordsState, currentwordState, currentwordContextState, currentSelectionState,
} from '../../states/recoil-states';
import { UserWord } from '../../types';


export const Word = function ({ word, dataKey, context }:
{ word: string, dataKey:string, context: string }) {
  const [userWords, setUserWords] = useRecoilState(userwordsState);
  const [currentSelection, setCurrentSelection] = useRecoilState(currentSelectionState);
  const setCurrentWordContext = useSetRecoilState(currentwordContextState);
  const setCurrentWord = useSetRecoilState(currentwordState);

  const getWordOrPhrase = function(_event: unknown) {
    // fix bug where if a user selects backwards, first and last words are swapped
    const selection = window.getSelection();

    if (selection !== null) {
      // const range = document.createRange();

      // const sNode = selection.anchorNode;
      // const eNode = selection.focusNode;
      // if (sNode) {
      //   range.setStart(sNode, 0);
      // }

      // if (eNode) {
      //   range.setEnd(eNode, 0);
      // }

      // console.log(range.cloneContents().children);

      // const newParent = document.createElement('span');
      // newParent.className = 'bg-gray-900';
      // range.surroundContents(newParent);
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

      // let range;
      // // let sel;
      // // let container;
      // const sel = window.getSelection();
      // console.log(sel?.getRangeAt);
      // if (sel?.getRangeAt && sel.focusNode && sel.anchorNode) {
      //   if (sel.rangeCount > 0) {
      //     range = sel.getRangeAt(0);
      //   }
      //   range?.setEnd(sel.focusNode, sel.focusOffset);

      //   if (range && range?.collapsed !== sel?.isCollapsed) {
      //     range.setStart(sel.focusNode, sel.focusOffset);
      //     range.setEnd(sel.anchorNode, sel.anchorOffset);
      //   }
      // }
      // if (range) {
      //   console.log(range);
      //   //  container = range[isStart ? "startContainer" : "endContainer"];
      //   // Check if the container is a text node and return its parent if so
      //   //  return container.nodeType === 3 ? container.parentNode : container;
      // }

      // console.log(selection.);
      const selectedString = selection.toString();
      // console.log(selection);
      const startNode = selection.anchorNode;
      const endNode = selection.focusNode;
      const stringArray = selectedString.split(' ');

      // ensures the first and last words are whole words
      let startWord = '';
      let endWord = '';

      if (startNode && startNode.textContent) {
        startWord = startNode.textContent;
        stringArray[0] = startWord;
      }

      if (endNode && endNode.textContent) {
        endWord = endNode.textContent;
        if (stringArray[stringArray.length - 1] && endWord) {
          stringArray[stringArray.length - 1] = endWord;
        }
      }

      const newPhrase = stringArray.join(' ').trim().split('.')[0];
      // console.log(newPhrase);
      // console.log(startNode, endNode);
      // console.log(selection);
      // console.log(context);
      const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase);
      let newWordObject: UserWord | undefined;

      if (existingWord[0]) {
        // eslint-disable-next-line prefer-destructuring
        newWordObject = existingWord[0];

        setCurrentWord(newWordObject);
        setCurrentWordContext(context);
      } else {
        newWordObject = {
          word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObject);
        setCurrentWordContext(context);
      }

      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObject?.word.toLowerCase()).length === 0) {
        // removes any words without an id, meaning that they also have no translation
        const updatedWords = [...userWords
          .filter((wordObj) => wordObj.id !== undefined), newWordObject];
        setUserWords(updatedWords);
      }
    }
  };

  // const isElement = function(element: Element | EventTarget): element is Element {
  //   return (element as Element).nodeName !== undefined;
  // };

  // eslint-disable-next-line max-len
  const mouseMoveEventHandler = function(event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) {
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
      // const range = document.createRange();

      // const sNode = selection.anchorNode;
      // const eNode = selection.focusNode;
      // if (sNode) {
      //   range.setStart(sNode, 0);
      // }

      // if (eNode) {
      //   range.setEnd(eNode, 0);
      // }

      // console.log(range.cloneContents().children);

      // const newParent = document.createElement('span');
      // newParent.className = 'bg-gray-900';
      // range.surroundContents(newParent);
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

      // let range;
      // // let sel;
      // // let container;
      // const sel = window.getSelection();
      // console.log(sel?.getRangeAt);
      // if (sel?.getRangeAt && sel.focusNode && sel.anchorNode) {
      //   if (sel.rangeCount > 0) {
      //     range = sel.getRangeAt(0);
      //   }
      //   range?.setEnd(sel.focusNode, sel.focusOffset);

      //   if (range && range?.collapsed !== sel?.isCollapsed) {
      //     range.setStart(sel.focusNode, sel.focusOffset);
      //     range.setEnd(sel.anchorNode, sel.anchorOffset);
      //   }
      // }
      // if (range) {
      //   console.log(range);
      //   //  container = range[isStart ? "startContainer" : "endContainer"];
      //   // Check if the container is a text node and return its parent if so
      //   //  return container.nodeType === 3 ? container.parentNode : container;
      // }

      // console.log(selection.);
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
        setCurrentWordContext(context);
      } else {
        newWordObject = {
          word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
        };

        setCurrentWord(newWordObject);
        setCurrentWordContext(context);
      }

      if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
        === newWordObject?.word.toLowerCase()).length === 0) {
        // removes any words without an id, meaning that they also have no translation
        const updatedWords = [...userWords
          .filter((wordObj) => wordObj.id !== undefined), newWordObject];
        setUserWords(updatedWords);
      }
    }

    if (event.buttons > 0 && window.getSelection()) {
      // console.log(event.target);
      // let elements: string[] = [];
      // if (!currentSelection.includes(event.currentTarget.innerText)) {
      //   console.log(currentSelection);
      //   console.log(event.currentTarget.innerText);
      //   const newCurrentSelection = [...currentSelection, event.currentTarget.innerText];
      //   console.log(newCurrentSelection);
      //   setCurrentSelection(newCurrentSelection);
      // }
      // const selection = window.getSelection();
      // console.log(selection?.toString());
      // const range = document.createRange();
      // console.log();
      // const sNode = selection?.anchorNode?.parentElement;
      // console.log(sNode);
      // const eNode = selection?.focusNode;
      // if (sNode) {
      //   console.log(sNode);
      //   range.setStart(sNode, 0);
      // }

      // if (eNode) {
      //   let length = 0;
      //   if (eNode?.textContent && eNode.nodeName === 'SPAN') {
      //     length = eNode.textContent.length - 1;
      //   }
      //   range.setEnd(eNode, length);
      // } else if (sNode) {
      //   let length = 0;
      //   if (sNode?.textContent && sNode.nodeName === 'SPAN') {
      //     length = sNode.textContent.length - 1;
      //   }
      //   range.setEnd(sNode, length);
      // }

      // // console.log(range.cloneContents().children);

      // // eslint-disable-next-line prefer-destructuring
      // const children = range.cloneContents().children;
      // console.log(children);
      // [...children].forEach((child) => {
      //   if (child.textContent && !currentSelection.includes(child.textContent)) {
      //     const newCurrentSelection = [...currentSelection, child.textContent];
      //     console.log(newCurrentSelection);
      //     setCurrentSelection(newCurrentSelection);
      //   }
      // });
      // ensures the first and last words are whole words
      // let startWord = '';
      // let endWord = '';
      // const newPhrase = currentSelection.join(' ');
      // console.log(newPhrase);
      // const existingWord = userWords.filter((wordObj) => wordObj.word === newPhrase);
      // let newWordObject: UserWord | undefined;

      // if (existingWord[0]) {
      //   // eslint-disable-next-line prefer-destructuring
      //   newWordObject = existingWord[0];

      //   setCurrentWord(newWordObject);
      //   setCurrentWordContext(context);
      // } else {
      //   newWordObject = {
      //     word: `${newPhrase.toLowerCase()}`, status: 'learning', translations: [],
      //   };

      //   setCurrentWord(newWordObject);
      //   setCurrentWordContext(context);
      // }

      // console.log(newWordObject);

      // if (userWords.filter((wordObj) => wordObj.word.toLowerCase()
      //   === newWordObject?.word.toLowerCase()).length === 0) {
      //   // removes any words without an id, meaning that they also have no translation
      //   const updatedWords = [...userWords
      //     .filter((wordObj) => wordObj.id !== undefined), newWordObject];
      //   setUserWords(updatedWords);
      // }
    }
  };

  const markedWords = useRecoilValue(markedwordsState);
  const wordStatus = markedWords[word.toLowerCase()];

  let wordClass = '';

  if (wordStatus === 'learning') {
    wordClass = 'bg-amber-500';
  } else if (wordStatus === 'familiar') {
    wordClass = 'bg-yellow-500';
  } else if (wordStatus === 'learned') {
    wordClass = 'bg-gray-200';
  }

  return (
    <div className='inline my-1'>
      <span onMouseMove={(event) => mouseMoveEventHandler(event)}
        // onMouseUp={(event) => getWordOrPhrase(event)}
        onMouseUp={() => setCurrentSelection([])}
        className={`${wordClass} cursor-pointer border border-transparent hover:border-blue-500 hover:border py-1 p-px rounded-md`}
        data-key={dataKey}>
        {word}
      </span>
    </div>
  );
};


export const Phrase = function ({ phrase, context }: { phrase: string, context: string }) {
  const markedWords = useRecoilValue(markedwordsState);
  const phraseStatus = markedWords[phrase.toLowerCase()];

  let wordClass = '';

  if (phraseStatus === 'learning') {
    wordClass = 'bg-amber-500';
  } else if (phraseStatus === 'familiar') {
    wordClass = 'bg-yellow-500';
  } else if (phraseStatus === 'learned') {
    wordClass = 'bg-gray-200';
  }

  const parts = phrase.split(' ');

  return (
    <div className='inline my-1'>
      <span className={`${wordClass} cursor-pointer border border-transparent hover:border-blue-500 hover:border py-2 p-1 rounded-md`}>
        {
          parts.map((word, index, array) => <Fragment>
            <Word key={word + index} dataKey={word + index} word={word} context={context} />
            <>{index === array.length - 1 ? '' : ' '}</>
            </Fragment>)
        }
      </span>
    </div>
  );
};
