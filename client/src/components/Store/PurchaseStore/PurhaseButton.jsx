export default function PurchaseButton({
  index,
  name,
  desc,
  pts,
  price,
  quant,
  arr,
  setPurchases,
  points,
  setPoints,
}) {
  function purchaseUpgrade() {
    if (points >= price) {
      setPoints((prev) => prev - price);
      const newPurchases = arr.map((purchase, arrIndex) => {
        if (arrIndex === index) {
          return {
            ...purchase,
            quant: purchase.quant + 1,
            price: purchase.price * 1.1,
          };
        } else {
          return purchase;
        }
      });
      setPurchases(newPurchases);
    }
  }

  return (
    <li className="purchase-btn-li">
      <button onClick={purchaseUpgrade} className="purchase-btn">
        <span>Owned: {quant}</span>
        <div>{name}</div>
        <div>
           {/*Autofills passive descriptions */}
          {desc
            ? desc
            : "+" + pts / 10 + " pt" + (pts !== 10 ? "." : "s.") + " per second"}
        </div>
        <div>{Math.floor(price / 10)} pts.</div>
      </button>
    </li>
  );
}
