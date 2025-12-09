"use client";

import { Text, useTexture } from "@react-three/drei";

export default function PreviewOverlay3D({ previewLink, setPreviewLink, position = [0, 0, 0], scale = 1 }) {
  if (!previewLink) return null;
    
    const previewTexture = useTexture(previewLink.image);
    // console.log(previewLink);
    // console.log(previewImgage);
    const consistentFontSize=0.11;
  return ( 
    <group position={position} scale={[scale, scale, scale]}>
      <group position={[0.04, -0.02, 0.016]}>
        <mesh >
          <planeGeometry args={[6.0, 4.66]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} side={2} />
        </mesh>
        
        <mesh position={previewLink.imagePosition ? [...previewLink.imagePosition] : [0, 1, 0.01]}>
          <planeGeometry args={previewLink.imageSize ? [...previewLink.imageSize] :[3.6, 2]} />
          <meshBasicMaterial map={previewTexture} />
        </mesh>

        {(previewLink.description || previewLink.techStack || previewLink.features) && (
          <Text
            position={[-2.7, -0.1, 0.01]}
            fontSize={consistentFontSize}
            color="black"
            anchorX="left"
            anchorY="top"
            maxWidth={5.2}
            lineHeight={1.2}
          >
            {previewLink.title ? `Title: ${previewLink.title}\n\n` : ""}
            {previewLink.description ? `Description:\n${previewLink.description}\n\n` : ""}
            {previewLink.techStack?.length ? `Tech Stack:\n${previewLink.techStack.join(" • ")}\n\n` : ""}
            {previewLink.features?.length 
              ? `Features:\n${previewLink.features.map(f => `• ${f}`).join("\n")}` : ""}
          </Text>
        )}

        {previewLink.site && previewLink.site !== "NA" && (
          <Text
            position={[-2.7, -2.2, 0.01]}
            fontSize={consistentFontSize}
            color="blue"
            anchorX="left"
            anchorY="middle"
            onClick={() => window.open(previewLink.site, "_blank")}
          >
            {previewLink.site}
          </Text>
        )}

        <Text
          position={[2.7, -2.16, 0.01]}
          fontSize={0.18}
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
