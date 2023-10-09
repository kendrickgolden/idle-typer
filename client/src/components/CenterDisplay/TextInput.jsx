import React, { useEffect, useRef, useState } from "react";
let charIndex = 0;
//wordIndex is 1 because input element is at index 0
let wordIndex = 1;
let incorrect = 0;

export default function TextInput({
  curPar,
  setParIndex,
  timeLeft,
  setPoints,
  storeArray,
}) {
  const inputRef = useRef();
  const textInputRef = useRef();
  const currentPargraph = curPar.split(" ");
  const [lineCounter, setLineCounter] = useState(0);

  useEffect(() => {
    if (lineCounter === 0) {
      textInputRef.current.style.transform = "translateY(0px)";
    } else if (lineCounter >= 4) {
      textInputRef.current.style.transform =
        "translateY(-" + (lineCounter - 3) * 48 + "px)";
    }
  }, [lineCounter]);

  function focusInput() {
    inputRef.current.focus();
  }

  function verifyText(event) {
    const input = event.target.value;
    const lastCharInput = input.slice(-1);
    const currentWord = textInputRef.current.children[wordIndex];
    const currentChar = currentWord.children[charIndex];

    if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (charIndex > 0) {
        charIndex--;
        currentWord.children[charIndex].style.color = "black";
      }
      if (incorrect > 0) {
        incorrect--;
      }
    } else if (lastCharInput === " ") {
      if (charIndex === currentWord.childElementCount && incorrect === 0) {
        //  console.log(currentWord.getBoundingClientRect().y);
        if (
          currentWord.getBoundingClientRect().y !==
          textInputRef.current.children[wordIndex + 1].getBoundingClientRect().y
        ) {
          setLineCounter(lineCounter + 1);
        }
        wordIndex++;
        charIndex = 0;
        const wordBonus =
          storeArray[0].quant * (1 + storeArray[0].upgrades * 0.5);
        //award points upon word completion
        setPoints((prev) => prev + 10 + wordBonus);
      }
    } else if (
      charIndex < currentWord.childElementCount &&
      lastCharInput === currentChar.textContent
    ) {
      if (incorrect > 0) {
        currentChar.style.color = "red";
        charIndex++;
        incorrect++;
        return;
      }

      currentChar.style.color = "green";
      charIndex++;
      if (
        wordIndex === currentPargraph.length &&
        charIndex === currentWord.childElementCount
      ) {
        charIndex = 0;
        wordIndex = 1;
        setLineCounter(0);
        const totalWordCount = currentPargraph.length / 5;
        const totalTime = (currentPargraph.length / 250) * 60;
        const wordBonus =
          storeArray[0].quant * (1 + storeArray[0].upgrades * 0.5);
        const speedBonus = totalWordCount * (timeLeft / totalTime);
        const finalBonus =
          speedBonus *
          (1 + (storeArray[1].quant / 10) * (1 + storeArray[1].upgrades * 0.5));
        //award speed-based bonus points
        setPoints((prev) => prev + 10 + wordBonus + finalBonus);
        setParIndex((parIndex) => parIndex + 1);
      }
    } else {
      currentChar.style.color = "red";
      charIndex++;
      incorrect++;
    }
  }

  return (
    <div id="text-input-container" onClick={focusInput} ref={textInputRef}>
      <input id="main-input" type="text" ref={inputRef} onChange={verifyText} />
      {currentPargraph.map((word, index) => {
        return (
          <span key={index + curPar} className="word">
            {word.split("").map((char, index) => {
              return (
                <span key={index} className="char">
                  {char}
                </span>
              );
            })}{" "}
          </span>
        );
      })}
    </div>
  );
}
