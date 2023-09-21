import UpgradeButton from "./UpgradeButton";

export default function Upgrades({ pps, passiveArray, setPassiveArray }) {
  /* const passive1Boost = {
    name: "Passive 1 Boost",
    desc: "50% boost to Passive 1",
    price: 25000,
    quant: 0,
    needed: 10,
  };

  const passive2Boost = {
    name: "Passive 2 Boost",
    desc: "50% boost to Passive 2",
    price: 50000,
    quant: 0,
    needed: 10,
  };

  const passive3Boost = {
    name: "Passive 3 Boost",
    desc: "50% boost to Passive 3",
    price: 100000,
    quant: 0,
    needed: 10,
  };

  const passive4Boost = {
    name: "Passive 4 Boost",
    desc: "50% boost to Passive 4",
    price: 200000,
    quant: 0,
    needed: 10,
  };

  const [upgradeArray, setUpgradeArray] = useState([
    passive1Boost,
    passive2Boost,
    passive3Boost,
    passive4Boost
  ]);*/

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
              boostPrice = {info.boostPrice}
              needed={info.needed}
              arr={arr}
              setPassiveArray={setPassiveArray}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
