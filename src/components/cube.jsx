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

export function Cube(){
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
    <group position={[0, 0, 0]}>
      {positions.map((pos, i) => (
        <Box key={i} position={pos} />
      ))}
    </group>
  );
}

export default function RotatableCube() {
  const groupRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);
  return (
    <group
      ref={groupRef}
      position={[0, -2, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDragging(true);
        setLastMouseX(e.clientX);
        setLastMouseY(e.clientY);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerMove={(e) => {
        if (dragging && groupRef.current) {
          const deltaX = e.clientX - lastMouseX;
          const deltaY = e.clientY - lastMouseY;

          groupRef.current.rotation.y += deltaX * 0.01;
          groupRef.current.rotation.x += deltaY * 0.01;

          setLastMouseX(e.clientX);
          setLastMouseY(e.clientY);
        }
      }}
    >
      <mesh position={[0,0,0]} visible={true}>
        <boxGeometry  args={[3, 3, 3]} /> {/* size big enough to cover all cubes */}
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <group>
        <Cube />
      </group>
      
    </group>
  );
}