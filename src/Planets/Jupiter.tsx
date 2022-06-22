import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { Mesh, TextureLoader } from "three"

import ElipticOrbit from "../components/ElipticOrbit"
import { usePlanetsDataStore } from "../Store/planetDataStore"
import { Planet } from "./Planets.type"

function Jupiter(): JSX.Element {
  const jupiterRef = useRef<Mesh>(null)
  const planetsData = usePlanetsDataStore((state) => state.planetsData)
  const [ planet, setPlanet ] = useState<Planet>()

  useEffect(() => {
    setPlanet(planetsData[4])
  }, [])
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      jupiterRef.current!.position.x = x
      jupiterRef.current!.position.z = z
      jupiterRef.current!.rotation.y += planet.spinSpeed
    }
  })

  return (
    planet ? <>
      <mesh ref={jupiterRef}>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
      </mesh>
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Jupiter
