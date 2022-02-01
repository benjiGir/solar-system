import React, { useRef, useMemo } from 'react'
import { useFrame } from "@react-three/fiber";

import * as THREE from 'three'


import sunShaderFragment from '../shaders/sunShader.fragment.glsl';
import sunShaderVertex from '../shaders/sunShader.vertex.glsl';
import sunShaderTextureFragment from '../shaders/sunShaderTexture.fragment.glsl';
import sunShaderTextureVertex from '../shaders/sunShaderTexture.vertex.glsl';



function SunTexture() {
  const [cubeRenderTarget] = useState(
    new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
  })
  );
  const [updated, setUpdated] = useState(false);

  const sunRef = useRef();
  const cameraRef = useRef();

  const uniforms = useMemo(() => ({
    time: { type: 'f', value: 0 },
    resolution: { type: 'v4', value: new THREE.Vector4() }
  }), []);

  useFrame(({ clock, gl, scene }) => {
    const t = clock.getElapsedTime();
    sunRef.current.material.uniforms.time.value = t;
    
    if (!updated) {
      cameraRef.current.update(gl, scene);
      setUpdated(true);
    }
    this.texture = cubeRenderTarget.texture;
  });

  return (
    <>
      <cubeCamera ref={cameraRef} args={[0.1, 10, cubeRenderTarget]} />
      <mesh ref={sunRef} scale={[1, 1, 1]}>
        <sphereBufferGeometry attach='geometry' args={[50, 64, 64]} />
        <shaderMaterial
          attach='material'
          uniforms={uniforms}
          fragmentShader={sunShaderFragment}
          vertexShader={sunShaderVertex}
          envMap={cubeRenderTarget.texture}
          extensions="#extension GL_OES_standard_derivatives : enable"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

function SunObject() {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      time: { type: 'f', value: 0 },
      uPerlin: { value: null },
      resolution: { type: 'v4', value: new THREE.Vector4()}
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.material.uniforms.time.value = t;
    meshRef.current.material.uniforms.uPerlin.value = this.texture;
  });

  return (
    <mesh ref={meshRef}>
      <sphereBufferGeometry attach='geometry' args={[50, 64, 64]} />
      <shaderMaterial
        attach='material'
        uniforms={uniforms}
        fragmentShader={sunShaderTextureFragment}
        vertexShader={sunShaderTextureVertex}
      />
    </mesh>
  )
}

function Sun() {
  return (
    <>
      <SunObject />
      <SunTexture />
    </>
  )
}

export default Sun;
