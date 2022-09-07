import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
let chapterIndex = 0;
let paragraphIndex = 0;
let charIndex = 0;

export default function TextInput() {
  const UserContextValues = useContext(UserContext);
  const inputRef = useRef();
  const setPoints = UserContextValues.setPoints;
  const text = UserContextValues.text;
  const chapters = text.chapters;
  /*const [currentChapterTitle, setCurrentChapterTitle] = useState(
    chapters[chapterIndex].title
  );*/
  const [currentChapter, setCurrentChapter] = useState(
    chapters[chapterIndex].paragraphs
  );
  const [currentParagraph, setCurrentParagraph] = useState(
    currentChapter[paragraphIndex].trim()
  );
  const [untypedParagraph, setUntypedParagraph] = useState(currentParagraph);
  const [correctParagraph, setCorrectParagraph] = useState("");
  const [incorrectParagraph, setIncorrectParagraph] = useState("");

  function focusInput() {
    inputRef.current.focus();
  }

  function verifyText(event) {
    const input = event.target.value;
    console.log(currentParagraph.length);
    console.log(charIndex);
    const lastCharInput = input.slice(-1);
    if (incorrectParagraph.length > 0) {
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        setIncorrectParagraph((prevVal) => prevVal.slice(0, -1));
      } else {
        setIncorrectParagraph((prevVal) => prevVal.concat(lastCharInput));
      }
    } else if (event.nativeEvent.inputType === "deleteContentBackward") {
      charIndex--;
      setCorrectParagraph((prevVal) => prevVal.slice(0, -1));
      setUntypedParagraph(currentParagraph.substring(charIndex));
    }
    else if (
      lastCharInput === currentParagraph[charIndex]
    ) {
      charIndex++;
      if (charIndex < currentParagraph.length) {
        if (lastCharInput === " ") {
          event.target.value = "";
          setPoints(prev => prev +1);
        } 
        setCorrectParagraph((prevVal) => prevVal.concat(lastCharInput));
        setUntypedParagraph(currentParagraph.substring(charIndex));
      } else {
        setPoints(prev => prev +1);
        const newParagraph = currentChapter[++paragraphIndex].trim();
        console.log(newParagraph);
        setCurrentParagraph(newParagraph);
        setCorrectParagraph("");
        setIncorrectParagraph("");
        setUntypedParagraph(newParagraph);
        event.target.value = "";
        charIndex = 0;
      }

    } else {
      setIncorrectParagraph(lastCharInput);
    }
  }

  return (
    <div id='text-input-container' onClick={focusInput}>
        {" "}
        {correctParagraph.split("").map((char, index) => {
          return <span className="correct">{char}</span>;
        })}
        {incorrectParagraph.split("").map((char, index) => {
          return <span className="incorrect">{char}</span>;
        })}
        <input id="main-input" type="text" ref={inputRef} onChange={verifyText} />
        {untypedParagraph.split("").map((char, index) => {
          return <span>{char}</span>;
        })}
    </div>
  );
}
