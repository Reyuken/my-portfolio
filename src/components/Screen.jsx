"use client";

import React from "react";
import { Text } from "@react-three/drei";

export default function PreviewOverlay3D({ previewLink, setPreviewLink, position = [0, 0, 0], scale = 1 }) {
  if (!previewLink) return null;

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh>
        <planeGeometry args={[5.6, 4.3]} />
        <meshStandardMaterial color="white" side={2} />
      </mesh>

      <Text position={[-1.8, 0.4, 0.01]} fontSize={0.3} color="black" anchorX="left" anchorY="middle">
        Preview:
      </Text>

      <Text
        position={[-1.8, 0, 0.01]}
        fontSize={0.25}
        color="blue"
        anchorX="left"
        anchorY="middle"
        onClick={() => window.open(previewLink, "_blank")}
      >
        {previewLink}
      </Text>

      <Text
        position={[1.5, -0.5, 0.01]}
        fontSize={0.3}
        color="red"
        anchorX="center"
        anchorY="middle"
        onClick={() => setPreviewLink(null)}
      >
        Close
      </Text>
    </group>
  );
}
