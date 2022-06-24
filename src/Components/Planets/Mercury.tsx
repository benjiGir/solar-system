import { useRef, useState, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Mesh, TextureLoader } from "three"
import { usePlanetsDataStore } from "../../Store/planetDataStore"
import { Planet } from "./Planets.type"

import ElipticOrbit from "../ElipticOrbit"

function Mercury(): JSX.Element {
  const mercuryRef = useRef<Mesh>(null)
  const planetsData = usePlanetsDataStore((state) => state.planetsData)
  const [ planet, setPlanet ] = useState<Planet>()

  useEffect(() => {
    setPlanet(planetsData[0])
  }, [])

  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      mercuryRef.current!.position.x = x
      mercuryRef.current!.position.z = z
      mercuryRef.current!.rotation.y += planet.spinSpeed
    }
  })

  return (
    planet ? <>
      <mesh ref={mercuryRef}>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
      </mesh >
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Mercury
