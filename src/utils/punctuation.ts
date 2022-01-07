export const stripPunctuation = function(string: string): string {
  const matches = string.match(/[\p{Letter}\p{Mark}\s'-]+/gui);
  if ((matches && matches.length === 0) || !matches) return string;
  return matches.join('');
};


export const isPunctuated = function(string: string): boolean {
  return /[^\p{Letter}\p{Mark}\s'-]/gui.test(string);
};
