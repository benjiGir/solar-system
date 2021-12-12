import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, useContextBridge } from '@react-three/drei'

import PlanetsContext from '../context/PlanetsContext'
import Scene from './Scene'

function SolarSystem() {
  const ContextBridge = useContextBridge(PlanetsContext)

  return (
    <>
      <Canvas mode="concurrent" camera={{ position: [0, 100, 250], fov: 75, near: 0.1, far: 10000}} className="solarSystem">
        <ContextBridge>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ContextBridge>
      </Canvas>
      <Loader />
    </>
  )
}

export default SolarSystem
