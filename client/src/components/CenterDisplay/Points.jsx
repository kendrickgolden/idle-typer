import {useContext} from 'react'
import { UserContext } from '../../App';

export default function Points({points}) {


  return (
    <span id="point-display">{Math.floor(points /10)}</span>
  )
}
