import React from "react";
import PassiveGenMenu from "./PassiveGenMenu";

export default function PassiveContainer({ passiveArray, setPassiveArray, points, setPoints }) {
  return (
    <span id="passive-container" className="container">
      STORE
      <div id="passive-types"></div>
      <PassiveGenMenu
        passiveArray={passiveArray}
        setPassiveArray={setPassiveArray}
        points={points}
        setPoints={setPoints}
      />
    </span>
  );
}
