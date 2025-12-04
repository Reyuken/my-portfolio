"use client";

import * as THREE from "three";
import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Water } from "three-stdlib";
import RotatableCube from "@/components/cube";
import TvGLB from "@/components/Television";

extend({ Water });

function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));

  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}



export default function OceanScene() {
  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 55, near: 1, far: 20000 }}>
      <pointLight decay={0} position={[100, 100, 100]} />
      <pointLight decay={0.5} position={[-100, -100, -100]} />
      <Suspense fallback={null}>
        <Ocean />
        <RotatableCube/>
        <TvGLB
          url="/models/tv.glb"
          position={[0, -4, -40]}
          scale={90}
          screenText="Now Playing..."
        />

      </Suspense>
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <OrbitControls  
        // minPolarAngle={Math.PI / 4}   // lowest vertical angle (tilt up)
        // maxPolarAngle={Math.PI / 2}   // highest vertical angle (tilt down)
        // minAzimuthAngle={-Math.PI / 4} // left limit
        // maxAzimuthAngle={Math.PI / 4}  // right limit
        // enableZoom={true}             // allow zoom
        // enablePan={false}             // disable panning
        target={[0, 5, 0]}
        />
    </Canvas>
  );
}
