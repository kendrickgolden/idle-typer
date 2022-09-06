import {useRef} from "react";
import TextInput from "./TextInput";
export default function MainText() {


  function focusInput() {

  }
  return (
    <div id="main-text" onClick={focusInput} >
      <TextInput/>
    </div>
  );
}
