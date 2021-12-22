import { MarkedWords, Text, UserWord } from "../types";

const Word = function ({ word, status, cycleState, getSelection }: { word: string, status: string, cycleState: Function, getSelection: Function }) {
  return <span onMouseUp={(event) => getSelection(event)} onClick={(event) => cycleState(event)} className={status + ' word'}>{word}</span>
};

const Phrase = function ({ phrase, status, markedWords, cycleState, getSelection }: { phrase: string, status: string, markedWords: MarkedWords, cycleState: Function, getSelection: Function }) {
  const parts = phrase.split(' ');

  return (
    <span onClick={(event) => cycleState(event)} className={status + ' phrase'}>
      {
        parts.map((word, index, array) => <><Word cycleState={cycleState} getSelection={getSelection} key={word + index} word={word} status={markedWords[word.toLowerCase()]} />{index === array.length - 1 ? '' : ' '}</>)
      }
    </span>
  )
};

const Paragraph = function({ paragraph, words, cycleState, getSelection }: { paragraph: string, words: UserWord[], cycleState: Function, getSelection: Function }) {
  const markedWords: MarkedWords = {};
  words.forEach(obj => markedWords[obj.word] = obj.state);

  const phraseFinder = `(${Object.keys(markedWords).filter(key => key.split(' ').length > 1).join('|')})`;
  const wordFinder = `(?<words>[\\p{Letter}\\p{Mark}'-]+)`;
  const noWordFinder = `(?<nowords>[^\\p{Letter}\\p{Mark}'-]+)`;
  
  const phraseRegExp = new RegExp(phraseFinder, 'gui');
  const wordRegExp = new RegExp(wordFinder, 'gui');
  let tokenRegExp;  

  if (words.length === 0) {
    tokenRegExp = new RegExp(`${wordFinder}|${noWordFinder}`, 'gui'); 
  } else {
    tokenRegExp = new RegExp(`${phraseFinder}|${wordFinder}|${noWordFinder}`, 'gui');  
  }

  const tokens: string[] = paragraph.match(tokenRegExp) || [];

  return (
    <p>
      {
        tokens.map((token, index) => {
          if (words.length > 0 && token.match(phraseRegExp)) return <Phrase getSelection={getSelection} cycleState={cycleState} key={token + index} phrase={token} markedWords={markedWords} status={markedWords[token.toLowerCase()]} />;
          if (token.match(wordRegExp)) return <Word getSelection={getSelection} cycleState={cycleState} key={token + index} word={token} status={markedWords[token.toLowerCase()]} />;
          return <span key={token + index}>{token}</span>;
        })
      }
    </p>
  );  
}

const TextBody = function ({ text, words, cycleState, getSelection }: { text: Text, words: UserWord[], cycleState: Function, getSelection: Function }) {
  const textBody = text.body;
  const paragraphs = textBody?.split('\n');

  return (
    <div>
      {
        paragraphs.map((paragraph, index) => <Paragraph getSelection={getSelection} cycleState={cycleState} key={index} paragraph={paragraph} words={words} />)
      }
    </div>
  );
};

export default TextBody;