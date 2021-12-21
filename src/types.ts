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