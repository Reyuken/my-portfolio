

import React, { useRef, useState } from "react";
import {useFrame } from "@react-three/fiber";

export default function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.y += 0.003));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <mesh
        {...props}
        scale={active ? 1 : 0.5}
        // onClick={(event) => setActive(!active)}
        onPointerOver={(event) => (setHover(true), setActive(!active))}
        onPointerOut={(event) => (setHover(false), setActive(!active))}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    </group>
  );
}