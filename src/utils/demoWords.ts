import { UserWord } from '../types';

const demoUserWords: UserWord[] = [
  {
    id: 1,
    word: 'frío',
    status: 'learning',
    translations: [
      {
        id: 2,
        wordId: 1,
        translation: 'cold',
        targetLanguageId: 'en',
        context: '¡Qué frío hacía!',
      },
    ],
    languageId: 'es',
  },
  {
    id: 3,
    word: 'verdad',
    status: 'familiar',
    translations: [
      {
        id: 4,
        wordId: 3,
        translation: 'truth',
        targetLanguageId: 'en',
        context: 'Verdad es que al salir de su casa...',
      },
    ],
    languageId: 'es',
  },
  {
    id: 5,
    word: 'tan grandes',
    status: 'learning',
    translations: [
      {
        id: 6,
        wordId: 5,
        translation: 'so big',
        targetLanguageId: 'en',
        context: '...a la pequeña le venían tan grandes',
      },
    ],
    languageId: 'es',
  },
  {
    id: 7,
    word: 'niña',
    status: 'familiar',
    translations: [
      {
        id: 8,
        wordId: 7,
        translation: 'girl',
        targetLanguageId: 'en',
        context: 'pasaba por la calle una pobre niña',
      },
    ],
    languageId: 'es',
  },
];

export default demoUserWords;
