import * as THREE from 'three'

function ElipticOrbit({ xRadius = 1, zRadius = 1 }) {
  const points = []

  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = xRadius * Math.cos(angle)
    const z = zRadius * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, z))
  }

  points.push(points[0])

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <>
      <line geometry={lineGeometry}>
        <lineBasicMaterial attach="material" colore="#BFBBDA" linewidth={10} />
      </line>
    </>
  )
}

export default ElipticOrbit
