import { useContext } from "react";
import { UserContext } from "../../../App";

export default function UpgradeButton({
  index,
  name,
  pts,
  price,
  quant,
  arr,
  setPassives,
  points,
  setPoints,
}) {

  function purchaseUpgrade() {
    if (points >= price) {
      setPoints((prev) => prev - price);
      const newPassives = arr.map((passive, arrIndex) => {
        if (arrIndex === index) {
          return {
            ...passive,
            quant: passive.quant + 1,
            price: passive.price * 1.1,
          };
        } else {
          return passive;
        }
      });
      setPassives(newPassives);
    }
  }

  return (
    <li className="purchase-btn-li">
      <button onClick={purchaseUpgrade} className="purchase-btn">
        <span>Owned: {quant}</span>
        <div>{name}</div>{" "}
        <div>
          {" "}
          + {pts / 10} pt{pts !== 10 && "s"} per second{" "}
        </div>{" "}
        <div>{Math.floor(price / 10)} pts.</div>
      </button>
    </li>
  );
}
