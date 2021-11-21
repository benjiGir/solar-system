import React from 'react'
import { Canvas } from '@react-three/fiber'

import Sun from './components/Sun'
import Lights from './components/Lights'

import './App.css'

function App() {

  return (
    <div className="solarSystem">
      <Canvas>
        <Sun />
        <Lights />
      </Canvas>
    </div>
  )
}

export default App
