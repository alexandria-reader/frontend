import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text } from '../types';
import SingleTextBody from './SingleText';
import UserTexts from './UserTexts';


const TextsPageComponent = function() {
  const [text, setText]: [text: null | Text, setText: Function] = useState(null);

  const openText = async function(_event: Event, textToOpen: Text) {
    setText(textToOpen);
  };
  const params = useParams();

  if (text) {
    return (
      <div className="Text-page">
        {JSON.stringify(params.textId)}
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
