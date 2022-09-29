import { useContext } from "react";
import { UserContext } from "../../App";

export default function LevelButton(props) {
  const UserContextValues = useContext(UserContext);
  const levels = UserContextValues.levels;
  const setLevels = UserContextValues.setLevels;
  const upgrades = UserContextValues.upgrades;
  const setUpgrades =UserContextValues.setUpgrades;
  const points = UserContextValues.points;
  const setPoints = UserContextValues.setPoints;
  const index = props.index;
  const name = props.info.name;
  let price = props.info.price;

  function purchaseLevel() {
    if (levels[index] === 0 && points >= price) {
      setPoints((prev) => prev - price);
      let newLevels = [...levels];
      newLevels[props.index] = 1;
      if(props.index < levels.length - 1) {
        newLevels[props.index + 1] = 0;
        let newUpgrades = [...upgrades];
        newUpgrades[props.index + 1] = 0;
        setUpgrades(newUpgrades);
      }
      setLevels(newLevels);
    }
  }

  return (
    <li className="purchase-btn">
      {levels[index] >=0 ? (
        <button onClick={purchaseLevel}>
          <span>Unlocked:{levels[index] === 1 ? "yes" : "no"}</span>
          <div>{name}</div> <div> </div>{" "}
          <div>{Math.floor(price / 10)} pts.</div>
        </button>
      ) : (
        <div className="locked"> LOCKED </div>
      )}
    </li>
  );
}
