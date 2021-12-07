import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext } from "react"
import { TextureLoader } from "three"
import PlanetsContext from "../context/PlanetsContext"

import ElipticOrbit from "./ElipticOrbit"

function Planet({ planetId }) {
  const planetRef = useRef()
  const { planetData } = useContext(PlanetsContext)

  useFrame(({clock}) => {
    const t = ((clock.getElapsedTime() * planetData[planetId].orbitalSpeed) / 20)
    const x = (planetData[planetId].distFromSun * 4) * Math.sin(t)
    const z = (planetData[planetId].distFromSun * 3) * Math.cos(t)
    planetRef.current.position.x = x
    planetRef.current.position.z = z
    planetRef.current.rotation.y += planetData[planetId].spinSpeed
  })

  return (

    planetData[planetId] ? <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[planetData[planetId].diameter, 64, 64]} />
        {
          planetData[planetId].name === 'Earth' ?
            <meshPhongMaterial map={useLoader(TextureLoader, planetData[planetId].texture.colorMap)} normalMap={useLoader(TextureLoader, planetData[planetId].texture.normalMap)} specularMap={useLoader(TextureLoader, planetData[planetId].texture.specularMap)}/>
            :
            <meshPhongMaterial map={useLoader(TextureLoader, planetData[planetId].texture)} />
        }
      </mesh>
      <ElipticOrbit xRadius={planetData[planetId].distFromSun * 4} zRadius={planetData[planetId].distFromSun * 3} />
    </>
    : <></>
  )
}

export default Planet
