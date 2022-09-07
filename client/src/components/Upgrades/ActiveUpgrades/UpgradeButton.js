import React from 'react'

export default function UpgradeButton(props) {
  return (
    <li className='upgrade-btn'><btn><div>{props.info.name}</div> <div>{props.info.desc} </div> <div>{props.info.price}</div></btn></li>
  )
}
