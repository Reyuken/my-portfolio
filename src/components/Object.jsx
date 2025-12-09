"use client";
import { useGLTF } from "@react-three/drei";

export default function Object({
  url,                               
  position = [0, 0, 0],
  scale = 1,
  hovered = false,
  onClick,
  onPointerOver,
  onPointerOut,
}) {

  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene} 
      position={position}
      scale={hovered ? scale * 1 : scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        console.log("clicked")
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver?.();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut?.();
      }}
    />
  );
}

// Optional Preloader
export function preloadObject(url) {
  useGLTF.preload(url);
}
