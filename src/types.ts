export type UserWord = {
  id?: number,
  word: string,
  status?: string,
  translations: Array<string>,
  contexts: Array<string>
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
  currentKnownId: string,
  currentLearnId: string,
};

export type User = {
  id: number,
  username: string,
  password_hash: string,
  email: string,
  current_known_language_id?: string,
  current_learn_language_id?: string,
};

export type LocalStorageUser = {
  current_known_language_id?: string,
  current_learn_language_id?: string,
  email: string,
  token: string,
  username: string,
};
