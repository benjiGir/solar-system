import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber'
import { DoubleSide, Mesh, TextureLoader } from 'three';

function EarthClouds(): JSX.Element {
  const cloudRef = useRef<Mesh>(null);
  const cloudTexture = useLoader(TextureLoader, 'assets/Earth/8k_earth_clouds.jpg');

  useFrame(() => {
    cloudRef.current!.rotation.y += 0.0008;
  });


  return (
    <mesh ref={cloudRef}>
     <sphereGeometry attach='geometry' args={[1.008, 64, 64]} />
     <meshPhongMaterial alphaMap={cloudTexture}  transparent side={DoubleSide} />
    </mesh>
  );
}

export default EarthClouds;
