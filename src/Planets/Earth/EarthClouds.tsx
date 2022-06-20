import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber'
import { DoubleSide, Mesh, TextureLoader } from 'three';

interface IEarthCloudsProps { 
  clouds: string;
}

function EarthClouds({clouds}: IEarthCloudsProps): JSX.Element {
  const cloudTexture = useLoader(TextureLoader, clouds);
  const cloudRef = useRef<Mesh>(null);

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
