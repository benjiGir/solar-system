import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, useContextBridge } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import PlanetsContext from '../context/PlanetsContext'
const Scene = React.lazy(() => import('./Scene'))

function SolarSystem() {
  const ContextBridge = useContextBridge(PlanetsContext)

  return (
    <>
      <Canvas camera={{ position: [0, 100, 250], fov: 80, near: 0.1, far: 10000}} colorManagement shadowMap>
        <ContextBridge>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ContextBridge>
        <Perf />
      </Canvas>
    </>
  )
}

export default SolarSystem
