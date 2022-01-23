import React from 'react'
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext, useState, useEffect } from "react"
import { TextureLoader } from "three"
import PlanetsContext from "../../context/PlanetsContext"

import ElipticOrbit from "../../components/ElipticOrbit"

let moonPositionIndex = 0

function Moon({earthRef}) {
  const moonRef = useRef()
  const { planetData } = useContext(PlanetsContext)
  const [ moon, setMoon ] = useState()


  useEffect(() => {
    setMoon(planetData[2].moon)
  }, [])

  useFrame(({clock}) => {
    if (moon) {
      const t = ((clock.getElapsedTime() * moon.orbitalSpeed) / 1000 )
      const x = (moon.distFromEarth) * Math.sin(t * (moonPositionIndex += 1))
      const z = 1.2 * (moon.distFromEarth) * Math.cos(t * moonPositionIndex)
      moonRef.current.position.x = x + earthRef.current.position.x
      moonRef.current.position.z = z + earthRef.current.position.z
      moonRef.current.rotation.y += moon.spinSpeed
    }
  })

  return (
    moon ? <>
      <mesh ref={moonRef}>
      <sphereGeometry attach="geometry" args={[moon.diameter, 64, 64]} />
      <meshPhongMaterial attach='material' map={useLoader(TextureLoader, moon.texture)}/>
      </mesh>
    </>
    : <></>
  )
}

export default Moon
