import React, { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { FlyControls, Stars } from '@react-three/drei'

import Sun from './components/Sun'
import Lights from './components/Lights'
import Planet from './components/Planet'

import './App.css'
import PlanetsContext from './context/PlanetsContext'

function App() {
  const { planets, planetData } = useContext(PlanetsContext)

  return (
    <>
      {planets && 
        <div className="solarSystem">

            <Canvas camera={{ position: [0, 100, 250], fov: 90, near: 0.1, far: 10000}} >
              <Sun />
                {planetData.map(planet => 
                    <Planet planetId={planet.id} key={planet.name} />
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
            </Canvas>
        </div>}
    </>
  )
}

export default App
