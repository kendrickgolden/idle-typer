import {useContext} from 'react'
import { UserContext } from '../App';

export default function Points() {
    const UserContextValues = useContext(UserContext);
    const points = UserContextValues.points;
    const setPoints = UserContextValues.setPoints;

  return (
    <span id="point-display">{points}</span>
  )
}
