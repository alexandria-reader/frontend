export type UserWord = {
  id?: number,
  word: string,
  status?: Status,
  translations: Array<UserTranslation>,
  languageId?: string
};


export type StringHash = {
  [id: string]: string,
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
  flag: string,
  eachCharIsWord: boolean,
  isRightToLeft: boolean,
};


export type User = {
  id?: number,
  username: string,
  password: string,
  email: string,
  knownLanguageId: string,
  learnLanguageId: string,
  verified?: boolean
};

export type SanitizedUser = Omit<User, 'password'>;

export type LoggedInUser = SanitizedUser & { token: string };


export type Translation = {
  id?: number,
  wordId?: number,
  translation: string,
  targetLanguageId: string,
};

export type UserTranslation = Translation & { context: string };


export type LoginDetails = {
  email: string,
  password: string
};


export type Webdictionary = {
  id?: number,
  sourceLanguageId: string,
  targetLanguageId: string,
  name: string,
  url: string
};
