export const collapseSpaces = function (string: string): string {
  return string.replace(/\s+/g, ' ');
};

export const stripPunctuation = function(string: string): string {
  const matches = string.match(/[\p{Letter}\p{Mark}\s'-]+/gui);
  if ((matches && matches.length === 0) || !matches) return string;
  return collapseSpaces(matches.join(''));
};

export const stripPunctuationExceptEndOfLine = function(string: string): string {
  const matches = string.replaceAll(/[(),]/g, '').match(/[\p{Letter}\p{Mark}\s'-.?!\d]+/gui);
  if ((matches && matches.length === 0) || !matches) return string;
  return collapseSpaces(matches.join(''));
};


export const isPunctuated = function(string: string): boolean {
  return /[^\p{Letter}\p{Mark}\s'-]/gui.test(string);
};
