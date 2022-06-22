import { useRef, useMemo, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

import { sunShaderFragment } from '../Shaders/sunShader.fragment';
import {sunShaderVertex} from '../Shaders/sunShader.vertex';
import {sunShaderTextureFragment} from '../Shaders/sunShaderTexture.fragment';
import {sunShaderTextureVertex} from '../Shaders/sunShaderTexture.vertex';

interface ISunTexture {
  setTexture: (texture: THREE.Texture) => void;
}

interface ISunObject {
  texture: THREE.Texture | undefined;
}

function SunTexture({ setTexture }: ISunTexture): JSX.Element {
  const [cubeRenderTarget] = useState(
    new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding,
  })
  );

  const sunRef = useRef<THREE.ShaderMaterial>(null);
  const cameraRef = useRef<THREE.CubeCamera>(null);

  const uniforms = useMemo(() => ({
    time: { type: 'f', value: 0 },
    resolution: { type: 'v4', value: new THREE.Vector4() },
    envMap: { value: cubeRenderTarget.texture },
  }), []);

  useFrame(({ clock, gl, scene }) => {
    const t = clock.getElapsedTime();
    const texture = cubeRenderTarget.texture;

    sunRef.current!.uniforms.time.value = t ;
    cameraRef.current!.update(gl, scene);

    setTexture(texture)
  });


  return (
    <>
      <cubeCamera ref={cameraRef} args={[0.1, 10, cubeRenderTarget]} />
      <mesh scale={[1, 1, 1]}>
        <sphereBufferGeometry attach='geometry' args={[5, 64, 64]} />
        <shaderMaterial
          ref={sunRef}
          attach='material'
          uniforms={uniforms}
          fragmentShader={sunShaderFragment}
          vertexShader={sunShaderVertex}
          extensions={
            {
              derivatives: true,
              fragDepth: false,
              drawBuffers: false,
              shaderTextureLOD: false,
            }
          }
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

function SunObject({ texture }: ISunObject): JSX.Element {
  const meshRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { type: 'f', value: 0 },
      uPerlin: { value: null },
      resolution: { type: 'v4', value: new THREE.Vector4()},
      uvRate1: { value: new THREE.Vector2(1, 1) }
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current!.uniforms.time.value = t;
    meshRef.current!.uniforms.uPerlin.value = texture;
    
  });

  return (
    <mesh>
      <sphereBufferGeometry attach='geometry' args={[40, 64, 64]} />
      <shaderMaterial
        ref={meshRef}
        attach='material'
        uniforms={uniforms}
        fragmentShader={sunShaderTextureFragment}
        vertexShader={sunShaderTextureVertex}
        extensions={
          {
            derivatives: true,
            fragDepth: false,
            drawBuffers: false,
            shaderTextureLOD: false,
          }
        }
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Sun(): JSX.Element {
  const [texture, setTexture] = useState<THREE.Texture>();

  return (
    <>
      <SunTexture setTexture={setTexture} />
      <SunObject texture={texture} />
    </>
  )
}

export default Sun;
