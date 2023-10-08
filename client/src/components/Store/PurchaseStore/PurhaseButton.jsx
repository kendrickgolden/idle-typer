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
  const priceColor = points >= price ? "black" : "red";

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
      <button onClick={purchaseUpgrade} className="purchase-btn" type="button">
        <div className="purchase-btn-text">
          <div className="btn-name">{name}</div>
          <div className="btn-desc">
            {/*Autofills passive descriptions */}
            {desc
              ? desc
              : "+" +
                pts / 10 +
                " pt" +
                (pts !== 10 ? "." : "s.") +
                " per second"}
          </div>
          <span className="btn-price" style={{ color: priceColor }}>
            {Math.floor(price / 10)} pts.
          </span>
          <span className="btn-owned">Owned: {quant}</span>
        </div>
      </button>
    </li>
  );
}
