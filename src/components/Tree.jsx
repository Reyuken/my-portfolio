// Tree.jsx
"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Tree({ position = [0, 0, 0], scale = 1, hovered = false, onClick, onPointerOver, onPointerOut }) {
  const { scene } = useGLTF("/models/tree_3d_model_linden_tree.glb");

  return (
    <primitive
      object={scene}
      position={position}
      scale={hovered ? scale * 1 : scale}
      onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}
      onPointerOver={(e) => {  if (onPointerOver) onPointerOver(); }}
      onPointerOut={(e) => {  if (onPointerOut) onPointerOut(); }}
    />
  );
}
