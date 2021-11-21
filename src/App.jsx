import React from 'react'
import { Canvas } from '@react-three/fiber'

import Sun from './components/Sun'

import './App.css'

function App() {

  return (
    <div className="solarSystem">
      <Canvas>
        <ambientLight />
        <pointLight position={[0, 0, 0]} />
        <Sun />
      </Canvas>
    </div>
  )
}

export default App
