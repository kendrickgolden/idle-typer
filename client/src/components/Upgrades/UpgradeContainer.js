import React from "react";
import ActiveUpgradeMenu from "./ActiveUpgrades/ActiveUpgradeMenu";

export default function UpgradeMenu(props) {
  return (
    <span id="upgrade-container" className="container">
      UPGRADES
      <div id ="upgrade-types">
        {/*<btn className="upgrade-type">Active</btn> <btn className="upgrade-type">Passive</btn>*/}
      </div>
      {/*TODO: Either merge into one Upgrade Menu or add Passive Upgrade Menu */}
      <ActiveUpgradeMenu pps={props.pps}/>
    </span>
  );
}
