import React, { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import Sun from './components/Sun'
import Lights from './components/Lights'
import Planet from './components/Planet'

import './App.css'
import PlanetsContext from './context/PlanetsContext'

function App() {
  const { planets } = useContext(PlanetsContext)

  return (
    <>
      {planets && 
        <div className="solarSystem">
          <Canvas camera={{ position: [0, 20, 25], fov: 45}}>
            <Suspense fallback={null}>
              <Sun />
              {planets.map(planet => 
                  <Planet position={Math.floor(planet.semimajorAxis / 10000000)} size={Math.floor(planet.equaRadius / 1000)} key={planet.englishName}/>
                )
              }
              <Lights />
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>}
    </>
  )
}

export default App
