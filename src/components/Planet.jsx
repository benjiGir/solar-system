import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { TextureLoader } from "three"

import ElipticOrbit from "./ElipticOrbit"

function Planet({ position, size, speed, spin, name }) {
  const planetRef = useRef()
  const colorMap = useLoader(TextureLoader, '../Public/Assets/Earth/colorMap.jpg')

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
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={colorMap}  />
      </mesh>
      <ElipticOrbit xRadius={position * 4} zRadius={position * 3} />
    </>
  )
}

export default Planet
