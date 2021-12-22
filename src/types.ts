export type Text = {
  id?: number,
  userId: number,
  languageId: string,
  title: string,
  author?: string | null,
  body: string,
  sourceURL?: string | null,
  sourceType?: string | null,
  uploadTime?: Date,
  isPublic?: boolean,
};

export const convertUserWordType = function(userWord: DbUserWord): UserWord {
  return {
    id: userWord.id,
    word: userWord.word,
    state: userWord.word_status,
    translations: userWord.translations,
    contexts: userWord.contexts
  };
}

export type DbUserWord = {
  id: number,
  word: string,
  word_status: string,
  translations: Array<string>,
  contexts: Array<string>
};

export type UserWord = {
  id: number,
  word: string,
  state: string,
  translations: Array<string>,
  contexts: Array<string>
};

export type MarkedWords = {
  [word: string]: string,
}