import './App.css'
import React, { useEffect, useState } from 'react'
import Mole from './Components/Mole.jsx'

function App() {
  // states
  const [dens, setDens] = useState(getDensState())
  const [points, setPoints] = useState(0)

  // effects
  useEffect(() => {
    startGame()
  }, [])

  // helpers
  function startGame() {
    setInterval(() => {
      setDens(getDensState())
    }, 1500)
  }

  function getDensState() {
    return new Array(9).fill().map(() => {
      return { 
        isMoleVisible: [true,false][Math.round(Math.random())] 
      }
    })
  }

  function onMoleWhacked() {
    setPoints(points + 1)
  }

  // renders
  const denElements = dens.map((den, index) => {
    return (
      <Mole key={index} den={den} onMoleWhacked={onMoleWhacked}/>
    )
  })

  return (
    <div className="App">
      <h1>WHACK-A-MOLE!</h1>
      <h2>Points: { points }</h2>
      <div className="dens">
        { denElements }
        <div style={{clear: 'both'}}></div>
      </div>
    </div>
  )
}

export default App