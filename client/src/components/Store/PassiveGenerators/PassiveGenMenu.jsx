import PurchaseButton from "./PurhaseButton";

export default function PassiveMenu({ passiveArray, setPassiveArray, points, setPoints }) {
  return (
    <ul className="menu-scene">
      {passiveArray.map((info, index, arr) => (
        <PurchaseButton
          key={index}
          index={index}
          name={info.name}
          pts={info.pts}
          price={info.price}
          quant={info.quant}
          arr={arr}
          setPassives={setPassiveArray}
          points={points}
          setPoints={setPoints}
        />
      ))}
    </ul>
  );
}
