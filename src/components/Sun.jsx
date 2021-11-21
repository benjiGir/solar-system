import React from "react";

const Sun = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#E1DC59" />
    </mesh> 
  )
}

export default Sun;
