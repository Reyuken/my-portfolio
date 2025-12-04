"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import RotatableCube from "@/components/cube";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        {/* <OrbitControls 
            minPolarAngle={Math.PI / 4}     // lower tilt limit
            maxPolarAngle={Math.PI / 2}     // upper tilt limit
            minAzimuthAngle={-Math.PI / 4}  // left limit
            maxAzimuthAngle={Math.PI / 4}   // right limit
            minDistance={3}                 // how close the camera can zoom
            maxDistance={10}
            enablePan={false}               // disable pan
        /> */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Stars />
        <RotatableCube />

    </Canvas>
  );
}
