import React, { useRef } from 'react';
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'

import earthcloud from '/Assets/Earth/8k_earth_clouds.jpg'

function EarthClouds() {
  const cloudTexture = useLoader(THREE.TextureLoader, earthcloud);
  const cloudRef = useRef();

  useFrame(() => {
    cloudRef.current.rotation.y += 0.0008;
  });


  return (
    <mesh ref={cloudRef}>
     <sphereGeometry attach='geometry' args={[1.008, 64, 64]} />
     <meshPhongMaterial alphaMap={cloudTexture}  transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

export default EarthClouds;
