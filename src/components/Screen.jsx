"use client";

import { Text, useTexture } from "@react-three/drei";

export default function PreviewOverlay3D({ previewLink, setPreviewLink, position = [0, 0, 0], scale = 1 }) {
  if (!previewLink) return null;
    
    const previewTexture = useTexture(previewLink.image);
    console.log(previewLink);
    // console.log(previewImgage);
  return ( 
    <group position={position} scale={[scale, scale, scale]}>
      <group position={[0.04, -0.02, 0.01]}>
        <mesh >
          <planeGeometry args={[6.0, 4.66]} />
          <meshStandardMaterial color="white"   emissive="white" emissiveIntensity={0.5} side={2} />
        </mesh>
        
        <mesh position={[-0.9, 1, 0.01]}>
          <planeGeometry args={[3.6, 2]} />
          <meshBasicMaterial map={previewTexture} />
        </mesh>

        <Text
        position={[-2.7, 0, 0.01]}
        fontSize={0.15}
        color="black"
        anchorX="left"
        anchorY="top"
        maxWidth={5}
        lineHeight={1.2}
        >
        {`Description:\n${previewLink.description}\n\nTech Stack:\n${previewLink.techStack.join(" • ")}\n\nFeatures:\n${previewLink.features.join(", ")}`}
        </Text>

        <Text
          position={[-2.7, -2, 0.01]}
          fontSize={0.15}
          color="blue"
          anchorX="left"
          anchorY="middle"
          onClick={() => window.open(previewLink.site, "_blank")}
        >
          {previewLink.site}
        </Text>

        <Text
          position={[2.3, -1.9, 0.01]}
          fontSize={0.3}
          color="red"
          anchorX="center"
          anchorY="middle"
          onClick={() => setPreviewLink(null)}
        >
          Close
        </Text>
      </group>
      
    </group>
  );
}
