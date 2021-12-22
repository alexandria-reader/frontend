import { MarkedWords, Text, UserWord } from "../types";
import UserInput from "./UserInput";

const Word = function ({ word, status, handleWordClick, getSelection }: { word: string, status: string, handleWordClick: Function, getSelection: Function }) {
  return <span onMouseUp={(event) => getSelection(event)} onClick={(event) => handleWordClick(event)} className={status + ' word'}>{word}</span>
};

const Phrase = function ({ phrase, status, markedWords, handleWordClick, getSelection }: { phrase: string, status: string, markedWords: MarkedWords, handleWordClick: Function, getSelection: Function }) {
  const parts = phrase.split(' ');

  return (
    <span onClick={(event) => handleWordClick(event)} className={status + ' phrase'}>
      {
        parts.map((word, index, array) => <><Word handleWordClick={handleWordClick} getSelection={getSelection} key={word + index} word={word} status={markedWords[word.toLowerCase()]} />{index === array.length - 1 ? '' : ' '}</>)
      }
    </span>
  )
};

const Paragraph = function({ paragraph, words, handleWordClick, getSelection }: { paragraph: string, words: UserWord[], handleWordClick: Function, getSelection: Function }) {
  
  const markedWords: MarkedWords = {};
  words.forEach(obj => markedWords[obj.word] = obj.state);

  const phraseFinder = `(${Object.keys(markedWords).filter(key => key.split(' ').length > 1).join('|')})`;
  const wordFinder = `(?<words>[\\p{Letter}\\p{Mark}'-]+)`;
  const noWordFinder = `(?<nowords>[^\\p{Letter}\\p{Mark}'-]+)`;
  
  const phraseRegExp = new RegExp(phraseFinder, 'gui');
  const wordRegExp = new RegExp(wordFinder, 'gui');
  let tokenRegExp = new RegExp(`${wordFinder}|${noWordFinder}`, 'gui');

  if (phraseFinder !== '()') {
    tokenRegExp = new RegExp(`${phraseFinder}|${wordFinder}|${noWordFinder}`, 'gui');  
  }

  const tokens: string[] = paragraph.match(tokenRegExp) || [];

  return (
    <p>
      {
        tokens.map((token, index) => {
          if (phraseFinder !== '()' && token.match(phraseRegExp)) return <Phrase getSelection={getSelection} handleWordClick={handleWordClick} key={token + index} phrase={token} markedWords={markedWords} status={markedWords[token.toLowerCase()]} />;
          if (token.match(wordRegExp)) return <Word getSelection={getSelection} handleWordClick={handleWordClick} key={token + index} word={token} status={markedWords[token.toLowerCase()]} />;
          return <span key={token + index}>{token}</span>;
        })
      }
    </p>
  );  
}

const SingleTextBody = function ({ text, words, handleWordClick, getSelection }: { text: Text, words: UserWord[], handleWordClick: Function, getSelection: Function }) {
  const textBody = text.body;
  const paragraphs = textBody?.split('\n');

  return (
    <div className="text-div">
      {
        paragraphs.map((paragraph, index) => <Paragraph getSelection={getSelection} handleWordClick={handleWordClick} key={index} paragraph={paragraph} words={words} />)
      }
      {/* <UserInput /> */}
    </div>
  );
};

export default SingleTextBody;