import React, { Suspense, useContext } from 'react'
import { FlyControls, Stars } from '@react-three/drei'

import Sun from '../components/Sun'
import Mercury from '../Planets/Mercury'
import Venus from '../Planets/Venus'
import Earth from '../Planets/Earth'
import Mars from '../Planets/Mars'
import Jupiter from '../Planets/Jupiter'
import Saturn from '../Planets/Saturn'
import Uranus from '../Planets/Uranus'
import Neptune from '../Planets/Neptune'

import Lights from '../components/Lights'


function Scene() {

  return (
    <>
      <Suspense fallback={null} >
          <Suspense fallback={null}>
            <Lights />
            <Sun />
            <Mercury />
            <Venus />
            <Earth />
            <Mars />
            <Jupiter />
            <Saturn />
            <Uranus />
            <Neptune />
          </Suspense>
        <Stars 
          radius={700}
          depth={100}
          count={10000}
          factor={10}
          saturation={0}
          fade
        />
        <FlyControls autoForward={false} dragToLook={true} rollSpeed={.5} movementSpeed={50.0} rotation={[Math.PI, Math.PI, Math.PI]}/>
       </Suspense> 
    </>
  )
}

export default Scene
