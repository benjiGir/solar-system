import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Sun from './components/Sun'
import Lights from './components/Lights'
import Planet from './components/Planet'

import './App.css'

function App() {

  return (
    <div className="solarSystem">
      <Canvas camera={{ position: [0, 20, 25], fov: 45}}>
        <Sun />
        <Planet />
        <Lights />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
