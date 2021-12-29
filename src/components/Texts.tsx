/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilValue } from 'recoil';

import SingleText from './texts/SingleText';
import UserTexts from './texts/UserTexts';

import { currenttextState } from '../states/recoil-states';

const TextsPage = function() {
  const currentText = useRecoilValue(currenttextState);

  // if (currentText) {
  //   return (
  //     <SingleText />
  //   );
  // }

  return (
    <UserTexts />
  );
};

export default TextsPage;
