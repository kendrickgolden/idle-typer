import React, { useRef, useState, useEffect } from "react";
let charIndex = 0;

export default function TextInput({
  curPar,
  setParIndex,
  timeLeft,
  setPoints,
  storeArray,
}) {
  const inputRef = useRef();

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
        const wordBonus =
          storeArray[0].quant * (1 + storeArray[0].upgrades * 0.5);
        //award points upon word completion
        setPoints((prev) => prev + 10 + wordBonus);

        setCorrectParagraph(correctParagraph.concat(lastCharInput));
        setUntypedParagraph(curPar.substring(charIndex));
      } else {
        event.target.value = input.slice(0, -1);
      }
    } else if (lastCharInput === curPar[charIndex]) {
      charIndex++;

      if (charIndex === curPar.length) {
        charIndex = 0;
        const totalWordCount = curPar.length / 5;
        const totalTime = (curPar.length / 250) * 60;
        const wordBonus =
          storeArray[0].quant * (1 + storeArray[0].upgrades * 0.5);
        const speedBonus = totalWordCount * (timeLeft / totalTime);
        const finalBonus =
          speedBonus *
          (1 + (storeArray[1].quant / 10) * (1 + storeArray[1].upgrades * 0.5));
        //award speed-based bonus points
        setPoints((prev) => prev + 10 + wordBonus + finalBonus);
        setParIndex((parIndex) => parIndex + 1);
        setCorrectParagraph("");
        setIncorrectParagraph("");
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
        return (
          <span className="correct char" key={index}>
            {char}
          </span>
        );
      })}
      {incorrectParagraph.split("").map((char, index) => {
        return (
          <span className="incorrect char" key={index}>
            {char}
          </span>
        );
      })}
      <input id="main-input" type="text" ref={inputRef} onChange={verifyText} />
      {untypedParagraph.split(" ").map((word, index) => {
        return (
          <span key={index} className="word">
            {word.split("").map((char, index) => {
              return <span key={index} className="char">{char}</span>;
            })}{" "}
          </span>
        );
      })}
    </div>
  );
}
