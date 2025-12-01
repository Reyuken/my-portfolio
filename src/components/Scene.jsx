"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Box from "@/components/cube";


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
export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Stars />
        {positions.map((pos, i) => (
            <Box key={i} position={pos} />
        ))}

    </Canvas>
  );
}
