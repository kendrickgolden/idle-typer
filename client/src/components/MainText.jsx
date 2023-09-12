import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import TextInput from "./TextInput";
import CountdownTimer from "./CountdownTimer";

export default function MainText() {
  const UserContextValues = useContext(UserContext);
  const text = UserContextValues.text;


  //set current paragraph
  const [curPar, setCurPar] = useState(text[0].trim());
  const [parIndex, setParIndex] = useState(0);

  useEffect(() => {
    setCurPar(text[parIndex % text.length].trim());
  }, [parIndex]);


  return (
    <>
      <CountdownTimer curPar={curPar} />

      <div id="main-text">
        {console.log("Index: " + parIndex)}
        <TextInput curPar={curPar} setParIndex={setParIndex} />
      </div>
    </>
  );
}
