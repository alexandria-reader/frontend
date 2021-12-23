import { useState } from 'react';
import { Text } from '../types';
import SingleTextBody from './SingleText';
import UserTexts from './UserTexts';

const TextsPageComponent = function() {
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);

  const openText = async function(_event: Event, textToOpen: Text) {
    setText(textToOpen);
  };

  if (text) {
    return (
      <div className="Text-page">
        <SingleTextBody text={text} />
      </div>
    );
  }
  return (
      <>
        <UserTexts openText={openText} />
      </>
  );
};

export default TextsPageComponent;
