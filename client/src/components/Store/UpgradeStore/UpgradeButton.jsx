export default function UpgradeButton({
  index,
  name,
  quant,
  upgrades,
  upgradePrice,
  needed,
  arr,
  setStoreArray,
  points,
  setPoints,
}) {
  function purchaseUpgrade() {
    if (points >= upgradePrice) {
      setPoints((prev) => prev - upgradePrice);
      const newUpgrades = arr.map((upgrade, arrIndex) => {
        if (arrIndex === index) {
          return {
            ...upgrade,
            upgrades: upgrade.upgrades + 1,
            upgradePrice: upgrade.upgradePrice * 2,
            needed: upgrade.needed * 2,
          };
        } else {
          return upgrade;
        }
      });
      setStoreArray(newUpgrades);
    }
  }

  return (
    <li className="purchase-btn-li">
      <div className="purchase-btn">
        {quant >= needed ? (
          <button onClick={purchaseUpgrade} className="purchase-btn">
            {" "}
            <span>Upgrades: {upgrades}</span>
            <div>{name} Boost</div> <div>50% boost</div>{" "}
            <div>{Math.floor(upgradePrice / 10)} pts.</div>
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
