import React, { useState, useEffect } from "react";
import textsService from '../services/userTexts'

const IndividualText = function({ text, openText }) {
  return (
    <li onClick={(event) => openText(event, text)}>
      <h2>{text.title}</h2>
      <p>{text.body.slice(0, 300)}</p>
    </li>
  )
}

const UserTexts = function({ openText }) {
  const [texts, setTexts] = useState([]);
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
      <ul>
        <div>Loaded</div>
        {texts.map(text => <IndividualText key={text.id} openText={openText} text={text} />)}
      </ul>
    )
  }
}

export default UserTexts;