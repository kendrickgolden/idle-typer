import { useContext } from "react";
import { UserContext } from "App";

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
  let price = Math.trunc(props.info.price * Math.pow(1.5, upgrades[index]));
  let PPS = props.pps;

  function purchaseUpgrade() {
    if (points >= price) {
      setPoints((prev) => prev - price);
      let newUpgrades = [...upgrades];
      newUpgrades[props.index] = newUpgrades[props.index] + 1;
      setUpgrades(newUpgrades);
      let newPPS = 0;
      if(newUpgrades[1] > 0) {
        newPPS += newUpgrades[1] * 1;
      }
      if(newUpgrades[2] > 0) {
        newPPS += newUpgrades[2] * 5;
      }
      if(newUpgrades[3] > 0) {
        newPPS += newUpgrades[3] * 10;
      }
      if(newUpgrades[4] > 0) {
        newPPS += newUpgrades[4] * 20;
      }

      PPS.current = newPPS;

    }
  }

  return (
    <li className="purchase-btn-li">
      {upgrades[index] >= 0 ? (
        <button onClick={purchaseUpgrade} className='purchase-btn'>
          <span>Owned:{upgrades[props.index]}</span>
          <div>{name}</div> <div>{desc} </div>{" "}
          <div>{Math.floor(price / 10)} pts.</div>
        </button>
      ) : (
        <div className="locked"> LOCKED </div>
      )}
    </li>
  );
}
