import { useContext } from "react";
import { UserContext } from "../../../App";

export default function UpgradeButton(props) {
  const UserContextValues = useContext(UserContext);
  const upgrades = UserContextValues.upgrades;
  const setUpgrades = UserContextValues.setUpgrades;
  const points = UserContextValues.points;
  const setPoints = UserContextValues.setPoints;
  const setPPS = UserContextValues.setPPS;
  const index = props.index;
  const name = props.info.name;
  const desc = props.info.desc;
  let price = Math.trunc(props.info.price * Math.pow(1.5,(upgrades[index])));
  let PPS = props.pps;

  function purchaseUpgrade() {
    if (points >= price) {
      setPoints((prev) => prev - price);
      let newUpgrades = [...upgrades];
      newUpgrades[props.index] = newUpgrades[props.index] + 1;
      setUpgrades(newUpgrades);
      //setPPS(newUpgrades[1] * .1 + newUpgrades[2] * .5 + newUpgrades[3] * 1 + upgrades[4] * 2 )
      PPS.current = newUpgrades[1] * 1 + newUpgrades[2] * 5 + newUpgrades[3] * 10 + newUpgrades[4] * 20 ;
      {console.log(PPS.current)}
    }
  }

  return (
    <li className="upgrade-btn">
      <button onClick={purchaseUpgrade}>
        <span>Owned:{upgrades[props.index]}</span>
        <div>{name}</div> <div>{desc} </div>{" "}
        <div>{Math.floor(price /10)} pts.</div>
      </button>
    </li>
  );
}
