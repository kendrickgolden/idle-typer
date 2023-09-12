import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../App";
let charIndex = 0;

export default function TextInput({ curPar, setParIndex }) {
  const UserContextValues = useContext(UserContext);
  const inputRef = useRef();
  const setPoints = UserContextValues.setPoints;
  const upgrades = UserContextValues.upgrades;

  const [untypedParagraph, setUntypedParagraph] = useState(curPar);
  const [correctParagraph, setCorrectParagraph] = useState("");
  const [incorrectParagraph, setIncorrectParagraph] = useState("");

  useEffect(() => {
    setUntypedParagraph(curPar);
  }, [curPar]);

  function focusInput() {
    inputRef.current.focus();
  }

  function verifyText(event) {
    const input = event.target.value;
    const lastCharInput = input.slice(-1);

    if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (incorrectParagraph.length > 0) {
        setIncorrectParagraph(incorrectParagraph.slice(0, -1));
      } else if (charIndex > 0 && correctParagraph[charIndex - 1] !== " ") {
        charIndex--;
        setCorrectParagraph(correctParagraph.slice(0, -1));
        setUntypedParagraph(curPar.substring(charIndex));
      }
    } else if (lastCharInput === " ") {
      if (" " === curPar[charIndex]) {
        charIndex++;
        setCorrectParagraph(correctParagraph.concat(lastCharInput));
        setUntypedParagraph(curPar.substring(charIndex));
        setPoints((prev) => prev + (10 + 10 * upgrades[0]));
      } else {
        event.target.value = input.slice(0, -1);
      }
    } else if (lastCharInput === curPar[charIndex]) {
      charIndex++;

      if (charIndex === curPar.length) {
        charIndex = 0;
        setParIndex((parIndex) => parIndex + 1);
        setCorrectParagraph("");
        setIncorrectParagraph("");
        setPoints((prev) => prev + (10 + 10 * upgrades[0]));
      } else {
        setCorrectParagraph(correctParagraph.concat(lastCharInput));
        setUntypedParagraph(curPar.substring(charIndex));
      }
    } else {
      setIncorrectParagraph(incorrectParagraph.concat(lastCharInput));
    }
  }

  return (
    <div id="text-input-container" onClick={focusInput}>
      {correctParagraph.split("").map((char, index) => {
        return <span className="correct">{char}</span>;
      })}
      {incorrectParagraph.split("").map((char, index) => {
        return <span className="incorrect">{char}</span>;
      })}
      <input
        id="main-input"
        type="text"
        ref={inputRef}
        onChange={verifyText}
      />
      {untypedParagraph.split("").map((char, index) => {
        return <span>{char}</span>;
      })}
    </div>
  );
}
