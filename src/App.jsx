import React, { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { FlyControls, Stars } from '@react-three/drei'

import Sun from './components/Sun'
import Lights from './components/Lights'
import Planet from './components/Planet'
import { planetsData } from './data/planetsData'

import './App.css'
import PlanetsContext from './context/PlanetsContext'

function App() {
  const { planets } = useContext(PlanetsContext)

  return (
    <>
      {planets && 
        <div className="solarSystem">
          <Canvas camera={{ position: [0, 100, 250], fov: 90, near: 0.1, far: 10000}} >
            <Suspense fallback={null}>
              <Sun />
              {planetsData.map(planet => 
                  <Planet position={planet.distFromSun + 25 } size={planet.diameter} speed={planet.orbitalSpeed} spin={planet.spinSpeed} name={planet.name} key={planet.name} />
                )
              }
              <Stars 
                radius={500}
                depth={100}
                count={10000}
                factor={10}
                saturation={0}
                fade
              />
              <Lights />
              <FlyControls autoForward={false} dragToLook={true} rollSpeed={.5} movementSpeed={50.0} rotation={[Math.PI, Math.PI, Math.PI]}/>
            </Suspense>
          </Canvas>
        </div>}
    </>
  )
}

export default App
