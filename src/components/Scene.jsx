import React, {Suspense} from 'react'
import { FlyControls, Stars } from '@react-three/drei'

// import SunWithShader from './SunWithShader'
const Sun = React.lazy(() => import('../Sun/SunWithShader'))
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
      <Lights />
      <Suspense fallback={null}>
        <Sun />
      </Suspense>
      <Mercury />
      <Venus />
      <Earth />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
      <Stars 
        radius={700}
        depth={100}
        count={10000}
        factor={10}
        saturation={0}
        fade
      />
      <FlyControls autoForward={false} dragToLook={true} rollSpeed={.5} movementSpeed={50.0} rotation={[Math.PI, Math.PI, Math.PI]}/>
    </>
  )
}

export default Scene
