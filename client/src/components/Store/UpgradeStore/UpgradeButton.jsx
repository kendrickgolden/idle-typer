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
  const priceColor = points >= upgradePrice ? "black" : "red";

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
      {quant >= needed ? (
        <button
          onClick={purchaseUpgrade}
          className="purchase-btn"
          type="button"
        >
          <div className="purchase-btn-text">
            <div className="btn-name">{name.replace("Upgrade", "")} Boost</div>{" "}
            <div className="btn-desc">50% boost</div>
            <span className="btn-price" style={{ color: priceColor }}>
              {Math.floor(upgradePrice / 10)} pts.
            </span>
            <span className="btn-owned">Owned: {upgrades}</span>
          </div>
        </button>
      ) : (
        <div className="purchase-btn-text">
          <div className="btn-name"> {name.replace("Upgrade", "")} Boost</div>
          <span className="btn-locked">LOCKED</span>
          <span className="btn-needed">
            {quant} / {needed}
          </span>
        </div>
      )}
    </li>
  );
}
