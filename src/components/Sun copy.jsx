import { useLoader } from "@react-three/fiber";
import { AdditiveBlending, TextureLoader } from "three";

const SunShine = () => {
  const texture = useLoader(TextureLoader, '/Assets/Sun/glow.png')

  return (
    <sprite scale={[200,200,1]}>
      <spriteMaterial
        attach="material"
        map={texture}
        depthWrite={false}
        blending={AdditiveBlending}
        color="#F5EAB9"
        transparent
      />
    </sprite>
  )
}

const Sun = () => {
  const colorMap = useLoader(TextureLoader, '/Assets/Sun/8k_sun.jpg')

  return (
    <>
      <mesh receiveShadow castShadow>
        <sphereGeometry attach="geometry" args={[50, 128, 128]} />
        <meshBasicMaterial attach="material" map={colorMap}/>
      </mesh> 
      <SunShine />
    </>
  )
}

export default Sun;
