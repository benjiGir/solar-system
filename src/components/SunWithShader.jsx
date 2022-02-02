import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from "@react-three/fiber";

import * as THREE from 'three';

import {sunShaderFragment} from '../shaders/sunShader.fragment';
import {sunShaderVertex} from '../shaders/sunShader.vertex';
import {sunShaderTextureFragment} from '../shaders/sunShaderTexture.fragment';
import {sunShaderTextureVertex} from '../shaders/sunShaderTexture.vertex';

function Sun() {
  const [cubeRenderTarget] = useState(
    new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding,
  })
  );
  const [updated, setUpdated] = useState(false);

  const sunRef = useRef();
  const cameraRef = useRef();

  const uniforms = useMemo(() => ({
    time: { type: 'f', value: 0 },
    resolution: { type: 'v4', value: new THREE.Vector4() }
  }), []);

  let texture = null;

  useFrame(({ clock, gl, scene }) => {
    const t = clock.getElapsedTime();
    sunRef.current.material.uniforms.time.value = t;
    
    if (updated === false) {
      cameraRef.current.update(gl, scene);
      setUpdated(true);
    }
    texture = cubeRenderTarget.texture;
  });


  return (
    <>
      <cubeCamera ref={cameraRef} args={[0.1, 100, cubeRenderTarget]} />
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
      <SunObject texture={texture} />
    </>
  )
}

function SunObject({texture}) {
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
    meshRef.current.material.uniforms.uPerlin.value = texture;
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


export default Sun;