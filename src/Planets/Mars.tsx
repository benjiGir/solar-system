import React from 'react'
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext, useState, useEffect } from "react"
import { TextureLoader } from "three"
import PlanetsContext from "../context/PlanetsContext"

import ElipticOrbit from "../components/ElipticOrbit"

function Mars() {
  const marsRef = useRef()
  const { planetData } = useContext(PlanetsContext)
  const [ planet, setPlanet ] = useState()

  useEffect(() => {
    setPlanet(planetData[3])
  }, [])
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      marsRef.current.position.x = x
      marsRef.current.position.z = z
      marsRef.current.rotation.y += planet.spinSpeed
    }
  })

  return (
    planet ? <>
      <mesh ref={marsRef}>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
      </mesh>
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Mars
