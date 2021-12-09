import React, { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'

import Scene from './components/Scene'

import './App.css'
import PlanetsContext from './context/PlanetsContext'
import { useContextBridge } from '@react-three/drei'

function App() {
  const ContextBridge = useContextBridge(PlanetsContext)

  return (
    <>
        <div className="solarSystem">
          <Canvas camera={{ position: [0, 100, 250], fov: 90, near: 0.1, far: 10000}} >
            <ContextBridge>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </ContextBridge>
          </Canvas>
        </div>
    </>
  )
}

export default App
