import { stripPunctuation } from './punctuation';

const wordFinder = "(?<words>[\\p{Letter}\\p{Mark}'-]+)";
const noWordFinder = "(?<nowords>[^\\p{Letter}\\p{Mark}'-]+)";

export const wordRegExp = new RegExp(wordFinder, 'gui');

export const parseText = function(text: string, phrases: Array<string> = []) {
  const phraseRegExps = phrases.map((phrase) =>
    stripPunctuation(phrase).split(' ').join("[^\\p{Letter}\\p{Mark}'-]+")
  );
  const phraseFinder =
    phraseRegExps.length === 0 ? '' : `(${phraseRegExps.join('|')})|`;
  const tokenRegExp = new RegExp(
    `${phraseFinder}${wordFinder}|${noWordFinder}`,
    'gui'
  );
  return text.match(tokenRegExp);
};
