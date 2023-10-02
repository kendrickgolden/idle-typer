import UpgradeButton from "./UpgradeButton";

export default function UpgradeStore({
  storeArray,
  setStoreArray,
  points,
  setPoints,
}) {
  return (
    <div id="upgrade-store" className="store">
      UPGRADES
      <ul className="menu-scene">
        {storeArray.map((info, index, arr) => (
          <UpgradeButton
            key={index}
            index={index}
            name={info.name}
            quant={info.quant}
            upgrades={info.upgrades}
            upgradePrice={info.upgradePrice}
            needed={info.needed}
            arr={arr}
            setStoreArray={setStoreArray}
            points={points}
            setPoints={setPoints}
          />
        ))}
      </ul>
    </div>
  );
}
