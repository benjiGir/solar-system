import ElipticOrbit from "./ElipticOrbit"

function Planet({ position, size }) {
  console.log(position, size);
  return (
    <>
      <mesh position={[position, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color='#78D481' />
      </mesh>
      <ElipticOrbit xRadius={position * 4} zRadius={position * 2} />
    </>
  )
}

export default Planet
