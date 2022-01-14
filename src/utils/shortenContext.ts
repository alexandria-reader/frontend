const shortenContext = function(word: string, context: string) {
  const regex = new RegExp(`(\\S+[ \\b]){0,5}\\b${word}\\b([ \\b]*\\S+[ \\b]*){0,5}`, 'gui');
  console.log(regex);
  const match = context.match(regex);
  console.log(!!match);
  const shortenedContext = match?.[0] || context;
  return shortenedContext;
};

export default shortenContext;
