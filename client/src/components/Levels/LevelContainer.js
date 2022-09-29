import React from "react";
import LevelMenu from "./LevelMenu";

export default function LevelContainer(props) {
  return (
    <span id="level-container" className="container">
      LEVELS
      <div id ="upgrade-types">
        {/*<btn className="upgrade-type">Active</btn> <btn className="upgrade-type">Passive</btn>*/}
      </div>
      {/*TODO: Either merge into one Upgrade Menu or add Passive Upgrade Menu */}
      <LevelMenu />
    </span>
  );
}
