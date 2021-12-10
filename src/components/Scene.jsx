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
      <Sun />
        <Suspense fallback={null}>
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
