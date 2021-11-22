import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

import ElipticOrbit from "./ElipticOrbit"

function Planet({ position, size }) {
  const planetRef = useRef()

  useFrame(({clock}) => {
    const t = clock.getElapsedTime()
    const x = (position * 4) * Math.sin(t)
    const z = (position * 2) * Math.cos(t)
    planetRef.current.position.x = x
    planetRef.current.position.z = z
  })

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size / 2, 32, 32]} />
        <meshStandardMaterial color='#78D481' />
      </mesh>
      <ElipticOrbit xRadius={position * 4} zRadius={position * 2} />
    </>
  )
}

export default Planet
