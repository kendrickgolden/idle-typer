import React from 'react'

export default function PassivePoints({storeArray}) {

  return (
    <div id="passive-points-display"> Passive Points: {"+ " + storeArray.reduce((acc, cur) => acc + cur.quant * cur.pts * (1 + cur.upgrades *.5) , 0) / 10 +"/s"}</div>
  )
}
