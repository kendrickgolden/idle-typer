import React from 'react'
import UpgradeMenu from '../UpgradeMenu';
import UpgradeButton from './UpgradeButton';

export default function ActiveUpgradeMenu() {
    const keyboardUpgrade = {name: "Keyboard Upgrade", desc: "+1 points per word typed", price: 100};
    const upgradeArray = [keyboardUpgrade];

  return (
    <ul className='upgrade-menu-scene'>{upgradeArray.map((upgrade) => <UpgradeButton info={upgrade}/>)}</ul>
  )
}
