export type UserWord = {
  id?: number,
  word: string,
  status?: Status,
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
  flag: string,
  eachCharIsWord: boolean,
  isRightToLeft: boolean,
};


export type User = {
  id?: number,
  username: string,
  password: string,
  email: string,
  knows: string | Language,
  learns: string | Language,
};

export type SanitizedUser = Omit<User, 'password'>;

export type LoggedInUser = SanitizedUser & { token: string };


export type Translation = {
  id?: number,
  wordId?: number,
  translation: string,
  targetLanguageId: string,
  context: string,
};


export type LoginDetails = {
  email: string,
  password: string
};


// the ones below need to go

export type CurrentUserLanguages = {
  currentKnownLanguageId: string,
  currentLearnLanguageId: string,
};

// export type User = {
//   id?: number,
//   username: string,
//   password: string,
//   email: string,
//   currentKnownLanguageId: string,
//   currentLearnLanguageId: string,
// };

export type TokenObj = {
  id: number,
  username: string,
  token: string,
  email: string,
  currentKnownLanguageId: string,
  currentLearnLanguageId: string,
};

export type LocalStorageUser = {
  currentKnownLanguageId?: string,
  currentLearnLanguageId?: string,
  email: string,
  token: string,
  username: string,
};

// export type SanitizedUser = Omit<User, 'passwordHash'>;
