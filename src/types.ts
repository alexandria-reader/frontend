export type UserWord = {
  id?: number,
  word: string,
  status?: string,
  translations: Array<Translation>,
  languageId?: string
};

export type MarkedWords = {
  [word: string]: string,
};

export type Status = 'learning' | 'familiar' | 'learned' | undefined;

export type Text = {
  id?: number,
  userId?: number,
  languageId: string,
  title: string,
  author?: string | null,
  body: string,
  sourceURL?: string | null,
  sourceType?: string | null,
  uploadTime?: Date,
  isPublic?: boolean,
};

export type Language = {
  id: string,
  name: string,
  eachCharIsWord: boolean,
  isRightToLeft: boolean,
};

export type CurrentUserLanguages = {
  currentKnownLanguageId: string,
  currentLearnLanguageId: string,
};

export type User = {
  id?: number,
  username: string,
  password: string,
  email: string,
  currentKnownLanguageId?: string,
  currentLearnLanguageId?: string,
};

export type LocalStorageUser = {
  currentKnownLanguageId?: string,
  currentLearnLanguageId?: string,
  email: string,
  token: string,
  username: string,
};

export type SanitizedUser = Omit<User, 'passwordHash'>;

export type Translation = {
  id?: number,
  wordId?: number,
  translation: string,
  targetLanguageId: string,
  context: string,
};
