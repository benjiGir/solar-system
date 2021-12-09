import React from 'react'

function Ring() {
  return (
    <mesh>
      <ringBufferGeometry attach="geometry" args={[1, 4, 32]} />
      <meshPhongMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

export default Ring
