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

export type User = {
  id?: number,
  username?: string | null,
  email: string,
  password: string,
  sourceLang: string,
  targetLang: string,
};
