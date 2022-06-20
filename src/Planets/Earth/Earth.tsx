import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { Mesh, Texture, TextureLoader } from "three"
import { usePlanetsDataStore } from "../../Store/planetDataStore"
import { Earth } from "../Planets.type"

import ElipticOrbit from "../../components/ElipticOrbit"
import Moon from '../Moon/Moon'
import EarthClouds from './EarthClouds'

function Earth() {
  const earthRef = useRef<Mesh>(null)
  const planetsData = usePlanetsDataStore((state) => state.planetsData)
  const [ planet, setPlanet ] = useState<Earth>()
  let colorMap, 
      normalMap,
      specularMap;

  useEffect(() => {
    setPlanet(planetsData[2])
  }, [])

  if (planet) {
    [colorMap, normalMap, specularMap] = useLoader(
      TextureLoader,
      [planet?.texture.colorMap, planet?.texture.normalMap, planet?.texture.specularMap]
    )
  }
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      earthRef.current!.position.x = x 
      earthRef.current!.position.z = z
      earthRef.current!.rotation.y += planet.spinSpeed
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
