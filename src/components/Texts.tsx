import { atom, useRecoilValue } from 'recoil';
import { Text } from '../types';
import SingleText from './texts/SingleText';
import UserTexts from './texts/UserTexts';


export const textlistState = atom<Array<Text>>({
  key: 'textlistState',
  default: [],
});

export const currenttextState = atom<Text | null>({
  key: 'currenttextState',
  default: null,
});


const TextsPage = function() {
  const currentText = useRecoilValue(currenttextState);

  if (currentText) {
    return (
      <SingleText />
    );
  }

  return (
    <UserTexts />
  );
};

export default TextsPage;
