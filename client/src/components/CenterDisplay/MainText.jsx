import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import TextInput from "./TextInput";
import CountdownTimer from "./CountdownTimer";

export default function MainText() {
  const UserContextValues = useContext(UserContext);
  const text = UserContextValues.text;

  //set current paragraph
  const [curPar, setCurPar] = useState(text[0].trim());
  const [parIndex, setParIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState((curPar.length / 250) * 60);

  useEffect(() => {
    setCurPar(text[parIndex % text.length].trim());
  }, [parIndex, text]);

  return (
    <>
      <CountdownTimer
        curPar={curPar}
        timeLeft = {timeLeft}
        setTimeLeft = {setTimeLeft}
      />

      <div id="main-text">
        <TextInput curPar={curPar} setParIndex={setParIndex} timeLeft={timeLeft} />
      </div>
    </>
  );
}
