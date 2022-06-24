import { Line } from '@react-three/drei';
import * as THREE from 'three'

interface IElipticOrbitProps {
  xRadius: number;
  zRadius: number;
}

function ElipticOrbit({ xRadius = 1, zRadius = 1 }: IElipticOrbitProps): JSX.Element {
  const points = []

  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * 2 * Math.PI
    const x = xRadius * Math.cos(angle)
    const z = zRadius * Math.sin(angle)
    points.push(new THREE.Vector3(x, 0, z))
  }

  points.push(points[0])

  return <Line points={points} color="#BFBBDA" linewidth={0.5} />

}

export default ElipticOrbit
