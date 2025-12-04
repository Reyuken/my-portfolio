"use client";

import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { Text } from "@react-three/drei";

export default function TvGLB({
  url = "/models/tv.glb",
  scale = 0.2,
  screenText = "Hello 3D!",
  position = [0, 0, 0]
}) {
  // Load the GLB/GLTF model
  const gltf = useLoader(GLTFLoader, url);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* The TV model */}
      <primitive object={gltf.scene} />

      {/* Screen text */}
      <Text
        position={[-0.15,0.38,0.2]} // Adjust to your GLB screen position
        rotation={[0, 0, 0]}
        fontSize={0.0002 * scale}    // scale font with model
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {screenText}
      </Text>
    </group>
  );
}
