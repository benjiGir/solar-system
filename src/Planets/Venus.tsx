import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext, useState, useEffect } from "react"
import { Mesh, Texture, TextureLoader } from "three"
import { usePlanetsDataStore } from "../Store/planetDataStore"

import ElipticOrbit from "../components/ElipticOrbit"

type Venus = {
  id: number,
  name: string,
  diameter: number,
  distFromSun: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: string,
}

function Venus(): JSX.Element {
  const venusRef = useRef<Mesh>(null)
  const planetsData = usePlanetsDataStore((state) => state.planetsData);
  const [ planet, setPlanet ] = useState<>()

  useEffect(() => {
    setPlanet(planetsData[1])
  }, [])
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet?.orbitalSpeed) / 80)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      venusRef.current!.position.x = x
      venusRef.current!.position.z = z
      venusRef.current!.rotation.y += planet.spinSpeed
    }
  })

  return (
    planet ? <>
      <mesh ref={venusRef}> 
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
      </mesh>
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Venus
