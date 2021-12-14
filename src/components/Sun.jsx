import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sun = () => {
  const colorMap = useLoader(TextureLoader, '/Assets/Sun/8k_sun.jpg')

  return (
    <mesh receiveShadow castShadow>
      <sphereGeometry args={[50, 32, 32]} />
      <meshPhongMaterial map={colorMap}/>
    </mesh> 
  )
}

export default Sun;
