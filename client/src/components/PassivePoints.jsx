import React from 'react'

export default function PassivePoints(props) {
    let PPS = props.pps;

  return (
    <div id="passive-points-display"> {PPS ? "+" + PPS.current / 10  +"/s": null}</div>
  )
}
