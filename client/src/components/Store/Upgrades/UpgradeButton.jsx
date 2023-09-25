export default function UpgradeButton({
  index,
  name,
  quant,
  boosts,
  boostPrice,
  needed,
  arr,
  setPassiveArray,
  points,
  setPoints,
}) {
  function purchaseUpgrade() {
    if (points >= boostPrice) {
      setPoints((prev) => prev - boostPrice);
      const newUpgrades = arr.map((upgrade, arrIndex) => {
        if (arrIndex === index) {
          return {
            ...upgrade,
            boosts: upgrade.boosts + 1,
            boostPrice: upgrade.boostPrice * 2,
            needed: upgrade.needed * 2,
          };
        } else {
          return upgrade;
        }
      });
      setPassiveArray(newUpgrades);
    }
  }

  return (
    <li className="purchase-btn-li">
      <div className="purchase-btn">
        {quant >= needed ? (
          <button onClick={purchaseUpgrade} className="purchase-btn">
            {" "}
            <span>Upgrades: {boosts}</span>
            <div>{name} Upgrade</div> <div>50% boost</div>{" "}
            <div>{Math.floor(boostPrice / 10)} pts.</div>
          </button>
        ) : (
          <div>
            LOCKED
            <div>
              {" "}
              {quant} / {needed}
              <br /> {name}{" "}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
