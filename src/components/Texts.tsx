import React, { useState, useEffect } from "react";
import textsService from '../services/userTexts'
import Nav from './Nav'
import { Text } from "../types";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
// export default function Texts() {
//   return (
//     <div>
//       <Nav />
//       Texts
//     </div>
//   )
// }

const IndividualText = function({ text, openText }: { text: Text, openText: Function }) {
  return (
    <li onClick={(event) => openText(event, text)}>
      <h2>{text.title}</h2>
      <p>{text.body.slice(0, 300)}</p>
    </li>
  )
}

const UserTexts = function({ openText }: { openText: Function }) {
  const [texts, setTexts] = useState<Text[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserTexts = function() {
    textsService.getAllUserTexts().then(texts => {
      setTexts(texts)
      setIsLoaded(true)
    })
  }

  useEffect(getUserTexts, [])

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Nav />
        <ul>
          {texts.map(text => <IndividualText key={text.id} openText={openText} text={text} />)}
        </ul>
      </div>
      
    )
  }
}

export default UserTexts;