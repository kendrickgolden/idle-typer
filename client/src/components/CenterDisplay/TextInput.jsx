import React, { useRef, useState, useEffect } from "react";
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

  //const [untypedParagraph, setUntypedParagraph] = useState(curPar);
  //const [correctParagraph, setCorrectParagraph] = useState("");
 // const [incorrectParagraph, setIncorrectParagraph] = useState("");

  const [incorrectText, setIncorrectText] = useState("");

  /*useEffect(() => {
    setUntypedParagraph(curPar);
  }, [curPar]);*/

  function focusInput() {
    inputRef.current.focus();
  }

  function verifyText(event) {
    const input = event.target.value;
    const lastCharInput = input.slice(-1);
    const currentWord = textInputRef.current.children[wordIndex];
    const currentChar = currentWord.children[charIndex];

    console.log(charIndex);

    if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (charIndex > 0) {
        charIndex--;
        currentWord.children[charIndex].style.color= 'black';
      }
      if(incorrect > 0) {
        incorrect--;
      }
    }
    else if(lastCharInput === " ") {
      if(charIndex === currentWord.childElementCount && incorrect === 0) {
        wordIndex++;
        charIndex = 0;
        const wordBonus =
          storeArray[0].quant * (1 + storeArray[0].upgrades * 0.5);
        //award points upon word completion
        setPoints((prev) => prev + 10 + wordBonus);
      } else {
       // event.target.value = input.slice(0, -1);
      }
    }
    else if(charIndex < currentWord.childElementCount && lastCharInput == currentChar.textContent) {
      
      if(incorrect > 0) {
        currentChar.style.color = "red";
        charIndex++;
        incorrect++;
        return;
      }

      currentChar.style.color = "green";
      charIndex++;
      if(wordIndex === currentPargraph.length  && charIndex === currentWord.childElementCount) {
        charIndex = 0;
        wordIndex = 1;
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
      currentChar.style.color = 'red';
      charIndex++;
      incorrect++;

    }

   /* if (event.nativeEvent.inputType === "deleteContentBackward") {
      if (incorrectParagraph.length > 0) {
        setIncorrectParagraph(incorrectParagraph.slice(0, -1));
      } else if (charIndex > 0 && correctParagraph[charIndex - 1] !== " ") {
        //charIndex--;
        setCorrectParagraph(correctParagraph.slice(0, -1));
        setUntypedParagraph(curPar.substring(charIndex));
      }
    } else if (lastCharInput === " ") {
      if (" " === curPar[charIndex]) {
        charIndex = 0;
        wordIndex++;
        // charIndex++;
        const wordBonus =
          storeArray[0].quant * (1 + storeArray[0].upgrades * 0.5);
        //award points upon word completion
        setPoints((prev) => prev + 10 + wordBonus);

      //  setCorrectParagraph(correctParagraph.concat(lastCharInput));
       // setUntypedParagraph(curPar.substring(charIndex));
      } else {
        event.target.value = input.slice(0, -1);
      }
    } else if (lastCharInput === curPar[charIndex]) {
      currentChar.style.color = "green";
      charIndex++;

      if (charIndex === curPar.length) {
        // charIndex = 0;
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
        //  setCorrectParagraph(correctParagraph.concat(lastCharInput));
        // setUntypedParagraph(curPar.substring(charIndex));
      }
    } else {
      setIncorrectParagraph(incorrectParagraph.concat(lastCharInput));
    }*/
  }

  return (
    <div id="text-input-container" onClick={focusInput} ref={textInputRef}>
      {/*{correctParagraph.split("").map((char, index) => {
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
      })}*/}
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
