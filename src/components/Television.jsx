"use client";

import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { Text } from "@react-three/drei";
import TvScreenStatic from "@/components/Static";

export default function TvGLB({
  url = "/models/tv.glb",
  scale = 0.2,
  position = [0, 0, 0]
}) {
  // Load the GLB/GLTF model
  const gltf = useLoader(GLTFLoader, url);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* The TV model */}
      <primitive object={gltf.scene} />
      <TvScreenStatic
        position={[-0.064, 0.26, 0.1924]}
        scale={0.1}
        width={4}
        height={3.1}
        overlayText="No Signal..."
      />

    </group>
  );
}
