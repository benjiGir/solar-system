import { useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { DoubleSide, Mesh, TextureLoader } from 'three';
import { ringShaderVertex } from '../Shaders/ringShader.vertex';
import { ringShaderFragment } from '../Shaders/ringShader.fragment';
 
interface IRingProps {
  planetRef: React.RefObject<Mesh>
}

function Ring({ planetRef }: IRingProps): JSX.Element {
  const ref = useRef<Mesh>(null);
  const ringTexture = useLoader(TextureLoader, "/Assets/Saturn/8k_saturn_ring_alpha.png")

  const ringShaderData = useMemo(() => ({
    uniforms: {
      utexture: { 
        value: ringTexture
      },
      innerRadius: { value: 12 },
      outerRadius: { value: 20 }
    },
    ringShaderVertex,
    ringShaderFragment,
  }), [])

  useFrame(() => {
    ref.current!.position.x = planetRef.current!.position.x
    ref.current!.position.z = planetRef.current!.position.z
  })

  return (
    <mesh visible ref={ref} rotation={[Math.PI / 2, Math.PI / 8, 0]} receiveShadow castShadow>
      <ringBufferGeometry attach="geometry" args={[12, 20, 64]} />
      <shaderMaterial attach="material" {...ringShaderData} side={DoubleSide} transparent/>
    </mesh>
  )
}

export default Ring
