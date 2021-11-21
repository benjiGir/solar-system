import ElipticOrbit from "./ElipticOrbit"

function Planet() {
  return (
    <>
      <mesh position={[8, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color='#78D481' />
      </mesh>
      <ElipticOrbit xRadius={8} zRadius={4} />
    </>
  )
}

export default Planet
