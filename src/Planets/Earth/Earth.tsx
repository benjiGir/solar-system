import React from 'react'
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext, useState, useEffect } from "react"
import * as THREE from "three"
import PlanetsContext from "../../context/PlanetsContext"

import ElipticOrbit from "../../components/ElipticOrbit"
import Moon from '../Moon/Moon'
import EarthClouds from './EarthClouds'

import EarthDayMap from '/Assets/Earth/colorMap.jpg'
import EarthNormalMap from '/Assets/Earth/8k_earth_normal_map.png'
import EarthSpecularMap from '/Assets/Earth/8k_earth_specular_map.png'

function Earth() {
  const earthRef = useRef()
  const { planetData } = useContext(PlanetsContext)
  const [ planet, setPlanet ] = useState()

  useEffect(() => {
    setPlanet(planetData[2])
  }, [])

  const [colorMap, normalMap, specularMap] = useLoader(
    THREE.TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap]
  )
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      earthRef.current.position.x = x 
      earthRef.current.position.z = z
      earthRef.current.rotation.y += planet.spinSpeed
    }
  })


  return (
    planet ? <>
      <mesh ref={earthRef} receiveShadow castShadow>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' specularMap={specularMap} />
        <meshStandardMaterial attach='material' map={colorMap} normalMap={normalMap} />
        <EarthClouds />
      </mesh>
      <Moon earthRef={earthRef}/>
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Earth
