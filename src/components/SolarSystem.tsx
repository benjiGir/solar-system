import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

const Scene = React.lazy(() => import('./Scene'))

function SolarSystem(): JSX.Element {

  return (
    <>
      <Canvas camera={{ position: [0, 100, 250], fov: 80, near: 0.1, far: 10000}}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}

export default SolarSystem
