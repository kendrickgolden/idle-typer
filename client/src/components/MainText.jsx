import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import TextInput from "./TextInput";
import CountdownTimer from "./CountdownTimer";

export default function MainText() {
  const UserContextValues = useContext(UserContext);
  //const text = UserContextValues.text;
  const text = ["test 1", "test 2", "test 3 test 3 "];

  //set current paragraph
  const [curPar, setCurPar] = useState(text[0].trim());
  const [parIndex, setParIndex] = useState(0);

  useEffect(() => {
    setCurPar(text[parIndex % text.length].trim());
  }, [parIndex]);

  /* const [parLength, setParLength] = useState(
    text[paragraphIndex].trim().length
  );*/

  return (
    <>
      <CountdownTimer /*parLength={parLength}*/ />

      <div id="main-text">
        {console.log("Index: " + parIndex)}
        <TextInput
          curPar={curPar}
          setParIndex={setParIndex} /* setParLength={setParLength}*/
        />
      </div>
    </>
  );
}
