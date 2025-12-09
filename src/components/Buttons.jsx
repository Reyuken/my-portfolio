"use client";
import React, { useState } from "react";
import { useThree } from "@react-three/fiber";

export default function RotationDropdown({ groupRef,camera, step = 0.1, zoomStep = 2, style }) {
  const [open, setOpen] = useState(false);

  const rotateX = (delta) => {
    if (groupRef?.current) groupRef.current.rotation.x += delta;
  };

  const rotateY = (delta) => {
    if (groupRef?.current) groupRef.current.rotation.y += delta;
  };

  const resetRotation = () => {
    if (groupRef?.current) {
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
    }
  };

  const zoomIn = () => { if(camera) camera.position.z -= zoomStep; };
  const zoomOut = () => { if(camera) camera.position.z += zoomStep; };
  
  const dropdownStyle = {
    position: "absolute",
    top: 20,
    left: 20,
    background: "#2c3e50",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    ...style,
  };

  const buttonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#3498db",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "5px",
  };

  return (
    <div style={dropdownStyle}>
      <button style={buttonStyle} onClick={() => setOpen(!open)}>
        {open ? "Hide Controls" : "Show Controls"}
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "5px" }}>
          <button style={buttonStyle} onClick={() => rotateX(step)}>Rotate Down</button>
          <button style={buttonStyle} onClick={() => rotateX(-step)}>Rotate Up</button>
          <button style={buttonStyle} onClick={() => rotateY(step)}>Rotate Right</button>
          <button style={buttonStyle} onClick={() => rotateY(-step)}>Rotate Left</button>
          <button style={buttonStyle} onClick={resetRotation}>Reset Rotation</button>
          <button style={buttonStyle} onClick={zoomIn}>Zoom In</button>
          <button style={buttonStyle} onClick={zoomOut}>Zoom Out</button>
        </div>
      )}
    </div>
  );
}
