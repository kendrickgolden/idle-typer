import {useContext, useEffect} from 'react'
import { UserContext } from '../../../App';
import UpgradeButton from './UpgradeButton';

export default function ActiveUpgradeMenu(props) {
    const UserContextValues = useContext(UserContext);
    const upgrades = UserContextValues.upgrades;
    const setPoints = UserContextValues.setPoints;

    const keyboardUpgrade = {name: "Keyboard Upgrade", desc: "+1 points per word typed", price: 1000};
    const PassiveUpgrade1 = {name: "Passive Upgrade 1", desc: "+.1 points per second", price: 2500};
    const PassiveUpgrade2 = {name: "Passive Upgrade 2", desc: "+.5 points per second", price: 5000};
    const PassiveUpgrade3 = {name: "Passive Upgrade 3", desc: "+1 points per second", price: 10000};
    const PassiveUpgrade4 = {name: "Passive Upgrade 4", desc: "+2 points per second", price: 20000};
    const upgradeArray = [keyboardUpgrade, PassiveUpgrade1, PassiveUpgrade2, PassiveUpgrade3, PassiveUpgrade4];

  return (
    <ul className='upgrade-menu-scene'>{upgradeArray.map((upgrade, index) => <UpgradeButton key={index} index={index} info={upgrade} pps={props.pps}/>)}</ul>
  )
}
