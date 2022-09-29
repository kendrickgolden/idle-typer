import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../App";
let chapterIndex = 0;
let paragraphIndex = 0;
let charIndex = 0;

export default function TextInput() {
  const UserContextValues = useContext(UserContext);
  const inputRef = useRef();
  const setPoints = UserContextValues.setPoints;
  const upgrades = UserContextValues.upgrades;

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
    const lastCharInput = input.slice(-1);
    let newCorrectParagraph = correctParagraph;
    let newIncorrectParagraph = incorrectParagraph;
    let newUntypedParagrpah = untypedParagraph;
    let newCurrentParagraph = currentParagraph;
    let newCurrentChapter = currentChapter;

    if (incorrectParagraph.length > 0) {
      if (lastCharInput === " ") {
        event.target.value = input.slice(0, -1);
        return;
      }
      if (event.nativeEvent.inputType === "deleteContentBackward") {
        newIncorrectParagraph = newIncorrectParagraph.slice(0, -1);
      } else {
        newIncorrectParagraph = newIncorrectParagraph.concat(lastCharInput);
      }
    } else if (event.nativeEvent.inputType === "deleteContentBackward") {
      charIndex--;
      newCorrectParagraph = newCorrectParagraph.slice(0, -1);
      newUntypedParagrpah = currentParagraph.substring(charIndex);
    } else if (lastCharInput === currentParagraph[charIndex]) {
      charIndex++;
      if (charIndex < currentParagraph.length) {
        if (lastCharInput === " ") {
          if (inputRef.current.offsetTop > 0) {
            newCorrectParagraph = newCorrectParagraph.substring(
              newCorrectParagraph.length - event.target.value.length,
              newCorrectParagraph.length
            );
          }
          event.target.value = "";
          setPoints((prev) => prev + (1 + 10 * upgrades[0]));
          console.log(inputRef.current.offsetTop);
        }
        newCorrectParagraph = newCorrectParagraph.concat(lastCharInput);
        newUntypedParagrpah = currentParagraph.substring(charIndex);
      } else {
        if(paragraphIndex === newCurrentChapter.length) {
          newCurrentChapter = chapters[++chapterIndex].paragraphs;
          paragraphIndex = 0;
        } else {
          paragraphIndex++;
        }

         setPoints((prev) => prev + (10 + 10 * upgrades[0]));
          //const newParagraph = newCurrentChapter[paragraphIndex].trim();
          //setCurrentParagraph(newParagraph);
          newCurrentParagraph = newCurrentChapter[paragraphIndex].trim();
          newCorrectParagraph = "";
          newIncorrectParagraph = "";
          newUntypedParagrpah = newCurrentParagraph;
          event.target.value = "";
          charIndex = 0;
        }
      } else {
      if (lastCharInput === " ") {
        event.target.value = input.slice(0, -1);
        return;
      }
      newIncorrectParagraph = lastCharInput;
    }

    setCorrectParagraph(newCorrectParagraph);
    setIncorrectParagraph(newIncorrectParagraph);
    setUntypedParagraph(newUntypedParagrpah);
    setCurrentParagraph(newCurrentParagraph);
    setCurrentChapter(newCurrentChapter);
  }

  return (
    <div id="text-input-container" onClick={focusInput}>
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
