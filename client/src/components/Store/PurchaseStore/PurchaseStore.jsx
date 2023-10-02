import React from "react";
import PurchaseButton from "./PurhaseButton";

export default function PassiveStore({
  storeArray,
  setStoreArray,
  points,
  setPoints,
}) {
  return (
    <div id="passive-store" className="store">
      STORE
      <ul className="menu-scene">
      {storeArray.map((info, index, arr) => (
        <PurchaseButton
          key={index}
          index={index}
          name={info.name}
          desc={info.desc}
          pts={info.pts}
          price={info.price}
          quant={info.quant}
          arr={arr}
          setPurchases={setStoreArray}
          points={points}
          setPoints={setPoints}
        />
      ))}
    </ul>
    </div>
  );
}
