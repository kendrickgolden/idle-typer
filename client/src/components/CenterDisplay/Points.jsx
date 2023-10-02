
export default function Points({points}) {
  /*Points are multiplied by 10 during calculations*/

  return (
    <span id="point-display">{Math.floor(points /10)} pts</span>
  )
}
