import { atom, selector } from 'recoil';
import {
  UserWord, MarkedWords, Text, Language, LoggedInUser,
} from '../types';


export const textlistState = atom<Array<Text>>({
  key: 'textlistState',
  default: [],
});


export const currenttextState = atom<Text | null>({
  key: 'currenttextState',
  default: null,
});


export const userwordsState = atom<Array<UserWord>>({
  key: 'userwordsState',
  default: [],
});


export const markedwordsState = selector({
  key: 'markedwordsState',
  get: ({ get }) => {
    const markedWords: MarkedWords = {};

    const userWords = get(userwordsState);
    userWords.forEach((userWord) => {
      if (userWord.status) markedWords[userWord.word] = userWord.status;
    });

    return markedWords;
  },
});


export const currentwordState = atom<UserWord | null>({
  key: 'currentwordState',
  default: null,
});

export const currentwordContextState = atom<string | null>({
  key: 'currentwordContextState',
  default: 'null',
});


export const languagesState = atom<Array<Language>>({
  key: 'languagesState',
  default: [],
});


export const userState = atom<LoggedInUser | null>({
  key: 'userState',
  default: null,
});


export const userlangidsState = selector({
  key: 'userlangidsState',
  get: ({ get }) => {
    const user = get(userState);
    if (user && typeof user.knows === 'string' && typeof user.learns === 'string') {
      return {
        known: user.knows,
        learn: user.learns,
      };
    }

    if (user && typeof user.knows !== 'string' && typeof user.learns !== 'string') {
      return {
        known: user.knows.id,
        learn: user.learns.id,
      };
    }

    return null;
  },
});
