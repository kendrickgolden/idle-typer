import React from 'react'

export default function PassivePoints({passiveArray}) {

  return (
    <div id="passive-points-display"> {"+ " + passiveArray[0].quant  +"/s"}</div>
  )
}
