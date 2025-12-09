"use client";
import React, { useState } from "react";
import { dropdownStyle, buttonStyle } from "./ButtonStyle";

export default function RotationDropdown({ showCube, setShowCube, groupRef, camera, step = 0.1, zoomStep = 2, style }) {
  const [open, setOpen] = useState(false);
  const toggleCube = () => setShowCube(!showCube);

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

  const resetCamera = () => {
    if(camera){ 
      camera.position.x = 0;
      camera.position.y = 1;
      camera.position.z = 10;
    }
   };

  const zoomIn = () => { if(camera) camera.position.z -= zoomStep; };
  const zoomOut = () => { if(camera) camera.position.z += zoomStep; };

  return (
    <div style={dropdownStyle(style)}>
      <button style={buttonStyle} onClick={() => setOpen(!open)}>
        {open ? "Hide Controls" : "Show Controls"}
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "5px" }}>
          <button style={buttonStyle} onClick={() => rotateX(-step)}>Rotate Up</button>
          <button style={buttonStyle} onClick={() => rotateX(step)}>Rotate Down</button>
          <button style={buttonStyle} onClick={() => rotateY(step)}>Rotate Right</button>
          <button style={buttonStyle} onClick={() => rotateY(-step)}>Rotate Left</button>
          <button style={buttonStyle} onClick={zoomIn}>Zoom In</button>
          <button style={buttonStyle} onClick={zoomOut}>Zoom Out</button>
          <button style={buttonStyle} onClick={resetRotation}>Reset Rotation</button>
          <button style={buttonStyle} onClick={resetCamera}>Reset Camera</button>
          <button style={buttonStyle} onClick={toggleCube}>
            {showCube ? "Hide Cube" : "Show Cube"}
          </button>
        </div>
      )}

    </div>
  );
}
