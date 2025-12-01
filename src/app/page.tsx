"use client"; 

import Scene from "@/components/Scene";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Scene />
      <div className="overlay">
        <h1>Hi, I'm Ray</h1>
        <p>Frontend Developer & 3D Enthusiast</p>
      </div>
      <style jsx>{`
        .overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
