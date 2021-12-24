/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import textsService from '../../services/texts';
import Nav from '../Nav';
import { Text } from '../../types';

import { textlistState, currenttextState } from '../../states/recoil-states';


const IndividualText = function({ text }: { text: Text }) {
  const setCurrentText = useSetRecoilState(currenttextState);

  return (
    <li>
      <h2><a href='#' onClick={(_event) => setCurrentText(text)}>{text.title}</a></h2>
      <p>{text.body.slice(0, 297).padEnd(300, '.')}</p>
    </li>
  );
};


const UserTexts = function() {
  const [textList, setTextList] = useRecoilState(textlistState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUserTexts = async function() {
      const userTextsResponse = await textsService.getAllUserTexts();

      setTextList(userTextsResponse);
      setLoaded(true);
    };

    fetchUserTexts();
  }, []);


  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
      <div>
        <Nav />
        <ul>
          {textList.map((text) => <IndividualText key={text.id} text={text} />)}
        </ul>
      </div>
  );
};

export default UserTexts;
