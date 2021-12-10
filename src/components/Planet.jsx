import { useFrame, useLoader } from "@react-three/fiber"
import { useRef, useContext, useState, useEffect } from "react"
import { TextureLoader } from "three"
import PlanetsContext from "../context/PlanetsContext"

import ElipticOrbit from "./ElipticOrbit"
import Ring from "./Ring"

function Planet({ planetId }) {
  const planetRef = useRef()
  const { planetData } = useContext(PlanetsContext)
  const [ planet, setPlanet ] = useState()

  useEffect(() => {
    setPlanet(planetData[planetId - 1])
  }, [])
  
  useFrame(({clock}) => {
    if (planet) {
      const t = ((clock.getElapsedTime() * planet.orbitalSpeed) / 20)
      const x = (planet.distFromSun * 4) * Math.sin(t)
      const z = (planet.distFromSun * 3) * Math.cos(t)
      planetRef.current.position.x = x
      planetRef.current.position.z = z
      planetRef.current.rotation.y += planet.spinSpeed
    }
  })

  return (

    planet ? <>
      <mesh ref={planetRef}>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        {
          planet.name === 'Earth' ?
            <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture.colorMap)} normalMap={useLoader(TextureLoader, planet.texture.normalMap)} specularMap={useLoader(TextureLoader, planet.texture.specularMap)}/>
            :
            <meshPhongMaterial attach='material' map={useLoader(TextureLoader, planet.texture)} />
        }
      </mesh>
      {
        planet.name === 'Saturn' ?
        <Ring planetRef={planetRef} />
        : null
      }
      <ElipticOrbit xRadius={planet.distFromSun * 4} zRadius={planet.distFromSun * 3} />
    </>
    : <></>
  )
}

export default Planet
