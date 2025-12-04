"use client";

import React, { useRef, useState } from "react";
import {useFrame } from "@react-three/fiber";

export function Box(props) {
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
        onPointerOver={(event) => (event.stopPropagation(), setHover(true), setActive(!active))}
        onPointerOut={(event) => (event.stopPropagation(), setHover(false), setActive(!active))}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    </group>
  );
}

export default function Cube(){
  const positions = [
  //front
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1],
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1],
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1],
  //back
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1],
  //left
  [-1, -1, 0],
  [-1, 0, 0],
  [-1, 1, 0],
  //right
  [1, -1, 0],
  [1, 0, 0],
  [1, 1, 0],
  //bottom
  [0, -1, 0],
  //top
  [0, 1, 0],
  ];

  return (
    <group position={[0, -2, 0]}>
      {positions.map((pos, i) => (
        <Box key={i} position={pos} />
      ))}
    </group>
  );
}
