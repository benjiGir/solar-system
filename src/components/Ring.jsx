import React, { useRef } from 'react'
import { extend, useFrame, useLoader } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei';
import { TextureLoader } from 'three';
import glsl from 'glslify'
import * as THREE from 'three';
 
const RingShaderMaterial = shaderMaterial(
  {
    utexture: { 
      type: "t",
      value: undefined
    },
    innerRadius: { value: undefined },
    outerRadius: { value: undefined }
  },
  glsl `
    varying vec3 vPos;
    
    void main() {
      vPos = position;
      vec3 viewPosition = (modelViewMatrix * vec4(position, 1.)).xyz;
      gl_Position = projectionMatrix * vec4(viewPosition, 1.);
    }
  `,
  glsl `
    uniform sampler2D utexture;
    uniform float innerRadius;
    uniform float outerRadius;

    varying vec3 vPos;

    vec4 color() {
      vec2 uv = vec2(0);
      uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
      if (uv.x < 0.0 || uv.x > 1.0) {
        discard;
      }
      
      vec4 pixel = texture2D(utexture, uv);
      return pixel;
    }

    void main() {
      gl_FragColor = color();
    }
  `,
)

extend({ RingShaderMaterial })

function Ring({ planetRef }) {
  const mesh = useRef();
  const ringTexture = useLoader(TextureLoader, "/Assets/Saturn/8k_saturn_ring_alpha.png")
  const ringUniforms = {
    utexture: { 
      type: "t",
      value: ringTexture
    },
    innerRadius: { value: 13 },
    outerRadius: { value: 17 }
  }

  useFrame(() => {
    mesh.current.position.x = planetRef.current.position.x
    mesh.current.position.z = planetRef.current.position.z
  })

  return (
    <mesh visible ref={mesh} rotation={[2.21,.09,0]} castShadow={true} >
      <ringBufferGeometry attach="geometry" args={[13, 17, 64]} />
      <ringShaderMaterial attach="material" uniforms={ringUniforms} side={THREE.DoubleSide}/>
      {/* <meshPhongMaterial attach="material"  map={useLoader(TextureLoader, ringTexture)} side={THREE.DoubleSide} /> */}
    </mesh>
  )
}

export default Ring
