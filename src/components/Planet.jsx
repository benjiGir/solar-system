import ElipticOrbit from "./ElipticOrbit"

function Planet({ position, size }) {
  return (
    <>
      <mesh position={[position * 4, 0, 0]}>
        <sphereGeometry args={[size / 2, 32, 32]} />
        <meshStandardMaterial color='#78D481' />
      </mesh>
      <ElipticOrbit xRadius={position * 4} zRadius={position * 2} />
    </>
  )
}

export default Planet
