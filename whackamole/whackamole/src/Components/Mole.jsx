import React, { Component } from 'react'
import './Mole.css'
import MoleIcon from './Mole.svg'

function Mole(props) {
  const {index, den, onMoleWhacked} = props
  console.log(den.isMoleVisible)

  return (
    <div className="den" onClick={den.isMoleVisible ? onMoleWhacked : ''}>
      <img src={ den.isMoleVisible ? MoleIcon : ''} className="Mole" alt=""/>
    </div>
  )
}

export default Mole