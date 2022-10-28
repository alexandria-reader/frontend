import { stripPunctuationExceptEndOfLine } from './punctuation';

const selectedBackwards = function(selection: Selection): boolean {
  const range = document.createRange();

  if (selection.anchorNode && selection.focusNode) {
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.focusNode, selection.focusOffset);
  }

  const backwards = range.collapsed;
  range.detach();

  return backwards;
};

const phraseFromSelection = function(selection: Selection): string {
  const start = selection.anchorNode as Node;
  const end = selection.focusNode as Node;
  const backwards = selectedBackwards(selection);

  if (start.textContent && backwards) {
    selection.setBaseAndExtent(start, start.textContent.length, end, 0);
  } else if (end.textContent && !backwards) {
    selection.setBaseAndExtent(start, 0, end, end.textContent.length);
  }

  const selectedString =
    selection.getRangeAt(0).cloneContents().textContent || '';

  const filteredSelectedStringArray =
    stripPunctuationExceptEndOfLine(selectedString).split(/[.?!]/); // stops selection at end of sentence

  const first = filteredSelectedStringArray[0]
    .split(' ')
    .filter((_, index) => index < 10) // fewer than 10 words
    .join(' ')
    .trim();

  const last = filteredSelectedStringArray[
    filteredSelectedStringArray.length - 1
  ]
    .split(' ')
    .filter((_, index, array) => index > array.length - 11) // fewer than 10 words
    .join(' ')
    .trim();

  return backwards ? last : first;
};

export default phraseFromSelection;
