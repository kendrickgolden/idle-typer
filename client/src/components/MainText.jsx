import { useRef } from "react";
import TextInput from "./TextInput";
import CountdownTimer from "./CountdownTimer";
export default function MainText() {
  function focusInput() {}
  return (
    <>
      <CountdownTimer />
      <div id="main-text" onClick={focusInput}>
        <TextInput />
      </div>
    </>
  );
}
