import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { Mesh, TextureLoader } from "three"
import { usePlanetsDataStore } from "../../Store/planetDataStore"
import { Planet } from "./Planets.type"

import ElipticOrbit from "../ElipticOrbit"
import Ring from "../Ring"

function Saturn(): JSX.Element {
  const saturnRef = useRef<Mesh>(null)
  const planetsData = usePlanetsDataStore((state) => state.planetsData)
  const [ planet, setPlanet ] = useState<Planet>()

  useEffect(() => {
    setPlanet(planetsData[5])
  }, [])
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      saturnRef.current!.position.x = x
      saturnRef.current!.position.z = z
      saturnRef.current!.rotation.y += planet.spinSpeed
    }
  })
  return (
    planet ? <>
      <mesh ref={saturnRef} receiveShadow castShadow>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
      </mesh>
      <Ring planetRef={saturnRef} />
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Saturn
