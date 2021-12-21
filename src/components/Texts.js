import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import highlightWords from 'highlight-words';

export default function Texts() {
  const [text, setText] = useState({
    title: "",
    body: ""
  });

  const manualText = "It was so terribly cold. Snow was falling, and it was almost dark. Evening came on, the last evening of the year. In the cold and gloom a poor little girl, bareheaded and barefoot, was walking through the streets. Of course when she had left her house she'd had slippers on, but what good had they been?\n\nThey were very big slippers, way too big for her, for they belonged to her mother. The little girl had lost them running across the road, where two carriages had rattled by terribly fast.\n\nOne slipper she'd not been able to find again, and a boy had run off with the other, saying he could use it very well as a cradle some day when he had children of his own. And so the little girl walked on her naked feet, which were quite red and blue with the cold. In an old apron she carried several packages of matches, and she held a box of them in her hand. No one had bought any from her all day long, and no one had given her a cent."

  // let manualWords = ['the', 'any from her', 'all day', 'feet', 'poor little girl']
  const [matchedWords, setMatchedWords] = useState([]);
  let wordsStr = '(' + matchedWords.map((word) => word.word).join('|') + ')';
  // let wordsStr = '(' + manualWords.join('|') + ')';
  let words = new RegExp(wordsStr);

  useEffect(() => {
    axios.get("http://localhost:3002/api/texts/1").then((res) => {
      setText(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3002/api/words/text/1/user/1").then((res) => {
      setMatchedWords(res.data);
    });
  }, []);


  const chunks = highlightWords({
    text: text.body,
    query: words,
    match: true,
  });


  return (
    <div>
      <h3>{text.title}</h3>
      <p>
      {console.log(words)}
      {chunks.map(({ text, match, key }) =>
        match ? (
          <span className="highlight" key={key}>
            {text}
          </span>
        ) : (
          <span key={key}>{text}</span>
        )
      )}
</p>
    </div>
  );
}
