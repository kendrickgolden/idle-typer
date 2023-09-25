import React from "react";
import PassiveGenMenu from "./PassiveGenMenu";

export default function PassiveStore({
  passiveArray,
  setPassiveArray,
  points,
  setPoints,
}) {
  return (
    <div id="passive-store" className="store">
      STORE
      <PassiveGenMenu
        passiveArray={passiveArray}
        setPassiveArray={setPassiveArray}
        points={points}
        setPoints={setPoints}
      />
    </div>
  );
}
