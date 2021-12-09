import React, { Suspense, useContext } from 'react'
import { FlyControls, Stars } from '@react-three/drei'

import Sun from '../components/Sun'
import Lights from '../components/Lights'
import Planet from '../components/Planet'
import PlanetsContext from '../context/PlanetsContext'

function Scene() {
  const { planetData } = useContext(PlanetsContext)

  return (
    <>
      <Sun />
        <Suspense fallback={null}>
          {planetData.map(planet => 
              <Planet planetId={planet.id} key={planet.name} />
            )
          }
        </Suspense>
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
    </>
  )
}

export default Scene
