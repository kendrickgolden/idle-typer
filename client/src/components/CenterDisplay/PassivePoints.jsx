import React from 'react'

export default function PassivePoints({passiveArray}) {

  return (
    <div id="passive-points-display"> {"+ " + passiveArray.reduce((acc, cur) => acc + cur.quant * cur.pts * (1 + cur.boosts *.5) , 0) / 10 +"/s"}</div>
  )
}
