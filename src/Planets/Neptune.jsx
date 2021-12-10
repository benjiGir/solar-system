import React from 'react'
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext, useState, useEffect } from "react"
import { TextureLoader } from "three"
import PlanetsContext from "../context/PlanetsContext"

import ElipticOrbit from "../components/ElipticOrbit"

function Neptune() {
  const neptuneRef = useRef()
  const { planetData } = useContext(PlanetsContext)
  const [ planet, setPlanet ] = useState()

  useEffect(() => {
    setPlanet(planetData[7])
  }, [])
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 20)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      neptuneRef.current.position.x = x
      neptuneRef.current.position.z = z
      neptuneRef.current.rotation.y += planet.spinSpeed
    }
  })

  return (
    planet ? <>
      <mesh ref={neptuneRef}>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
      </mesh>
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Neptune
