import UpgradeButton from "./UpgradeButton";

export default function Upgrades({ passiveArray, setPassiveArray, points, setPoints }) {
  return (
    <div id="upgrade-container" className="container">
      <div>
        UPGRADES
        <ul className="menu-scene">
          {passiveArray.map((info, index, arr) => (
            <UpgradeButton
              key={index}
              index={index}
              name={info.name}
              quant={info.quant}
              boosts={info.boosts}
              boostPrice={info.boostPrice}
              needed={info.needed}
              arr={arr}
              setPassiveArray={setPassiveArray}
              points={points}
              setPoints={setPoints}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
