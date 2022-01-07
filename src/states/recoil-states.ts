import { atom, selector } from 'recoil';
import {
  UserWord, StringHash, Text, Language, SanitizedUser, Webdictionary,
} from '../types';

import webdictionaries from '../services/webdictionaries';

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

export const mouseStartXState = atom<Number | null>({
  key: 'mouseStartXState',
  default: null,
});


export const markedwordsState = selector<StringHash>({
  key: 'markedwordsState',
  get: ({ get }) => {
    const markedWords: StringHash = {};

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

export const languageFlagsState = selector<StringHash>({
  key: 'languageFlagsState',
  get: ({ get }) => {
    const flags: StringHash = {};

    const languages = get(languagesState);
    languages.forEach((language) => {
      flags[language.id] = language.flag;
    });

    return flags;
  },
});

export const languageNamesState = selector<StringHash>({
  key: 'languageNamesState',
  get: ({ get }) => {
    const names: StringHash = {};

    const languages = get(languagesState);
    languages.forEach((language) => {
      names[language.id] = language.name;
    });

    return names;
  },
});


export const userState = atom<SanitizedUser | null>({
  key: 'userState',
  default: null,
});


export const currentdictionaryState = selector<Webdictionary | null>({
  key: 'currentdictionaryState',
  get: async ({ get }) => {
    const user = get(userState);
    if (user) {
      const dictionaries = await webdictionaries
        .getBySourceTarget(user?.learnLanguageId, user?.knownLanguageId);
      return dictionaries[0];
    }
    return null;
  },
});
