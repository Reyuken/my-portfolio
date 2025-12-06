"use client";

import React, { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

// 1. Define TV static shader
const StaticMaterial = shaderMaterial(
  {},
  /* vertex shader */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment shader */ `
    varying vec2 vUv;
    uniform float time;
    void main() {
      float noise = fract(sin(dot(vUv.xy * vec2(12.9898,78.233), vec2(43758.5453, 96321.123)) + time) * 43758.5453);
      gl_FragColor = vec4(vec3(noise), 1.0);
    }
  `
);

// 2. Register material
extend({ StaticMaterial });

// 3. Reusable TV screen component
export default function TvScreenStatic({
  position = [0, 0, 0],
  scale = 1,
  width = 4,
  height = 2.5,
  overlayText = null,
}) {
  const meshRef = useRef();

  // Animate shader: pass time uniform
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <staticMaterial attach="material" uniforms={{ time: { value: 0 } }} />
      </mesh>

      {overlayText && (
        <Text
          position={[-width / 2 + 0.2, height / 2 - 0.3, 0.01]}
          fontSize={0.3}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          {overlayText}
        </Text>
      )}
    </group>
  );
}
