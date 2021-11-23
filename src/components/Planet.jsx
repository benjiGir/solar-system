import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { TextureLoader } from "three"

import ElipticOrbit from "./ElipticOrbit"

function Planet({ position, size, speed, spin, name }) {
  const planetRef = useRef()
  const normalMap = useLoader(TextureLoader, '/Assets/Earth/8k_earth_normal_map.png')
  const specularMap = useLoader(TextureLoader, '/Assets/Earth/8k_earth_specular_map.png')
  const colorMap = useLoader(TextureLoader, '/Assets/Earth/colorMap.jpg')


  useFrame(({clock}) => {
    const t = ((clock.getElapsedTime() * speed) / 20)
    const x = (position * 4) * Math.sin(t)
    const z = (position * 3) * Math.cos(t)
    planetRef.current.position.x = x
    planetRef.current.position.z = z
    planetRef.current.rotation.y += spin
  })

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhongMaterial map={colorMap} normalMap={normalMap} specularMap={specularMap}/>
      </mesh>
      <ElipticOrbit xRadius={position * 4} zRadius={position * 3} />
    </>
  )
}

export default Planet
