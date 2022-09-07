import React from "react";
import ActiveUpgradeMenu from "./ActiveUpgrades/ActiveUpgradeMenu";

export default function UpgradeMenu() {
  return (
    <span id="upgrade-menu">
      UPGRADES
      <div id ="upgrade-types">
        <btn className="upgrade-type">Active</btn> <btn className="upgrade-type">Passive</btn>
      </div>
      <ActiveUpgradeMenu/>
    </span>
  );
}
