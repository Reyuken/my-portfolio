"use client";

import React, { useRef, useState, useEffect, useMemo} from "react";
import {useFrame } from "@react-three/fiber";
import {  useTexture } from "@react-three/drei";
import PreviewOverlay3D from "@/components/Screen";
import * as THREE from "three";
import Object from "@/components/Object";


export function Box({ position, link, index, setPreviewLink }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  const baseTexture = useTexture(
    link
      ? "/images/rocky_terrain_02_diff_4k.jpg"
      : "/images/dry_ground_rocks_diff_4k.jpg"
  );
  const texture = useMemo(() => {
    const tex = baseTexture.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.offset.set(Math.random(), Math.random());
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.random() * Math.PI * 2;
    tex.repeat.set(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5);
    return tex;
  }, [baseTexture]);


  const handleClick = () => {
    console.log("Clicked box number:", index);
    if (link?.site) {
      // console.log("Box link:", link);
      setPreviewLink(link);
    } else {
      console.log("No link assigned");
    }
  };
  useFrame(() => {
    if (!meshRef.current) return;

    const target = hovered ? 1.2 : 1;        // scale when hovered
    const current = meshRef.current.scale.x; // current scale

    const lerpSpeed = 0.1;                   // smoothness (0–1)
    const newScale = THREE.MathUtils.lerp(current, target, lerpSpeed);

    meshRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group ref={meshRef} position={position} >
      <mesh
        scale={0.5}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (link) setHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial
            color={link ? (hovered ? "hotpink" : "blue") : "orange"}
          />
        )}
      </mesh>
      {link?.object && (
        <Object
          url={link.object}
          position={[0, 0.5, 0]}     // height above the cube
          scale={link.objectScale || 1} 
          hovered={hovered}
          onClick={handleClick}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        />
      )}

    </group>
  );
}


export function Cube({ setPreviewLink }){
  const positions = [
  //front
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1],
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1],
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1],
  //back
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1],
  //left
  [-1, -1, 0],
  [-1, 0, 0],
  [-1, 1, 0],
  //right
  [1, -1, 0],
  [1, 0, 0],
  [1, 1, 0],
  //bottom
  [0, -1, 0],
  //top
  [0, 1, 0],
  ];
  
  const links = [
    {
      site: "#",
      image: "/sites/businesswebsite.jpg",
      description: "Full-featured business website with user roles, job management, and integrated contact system. (Site currently under development)",
      techStack: ["Next.js", "Node.js", "MySQL 8.0", "Tailwind CSS"],
      features: [
        "Developed a full-stack company website with user authentication and role-based access",
        "Implemented end-to-end job application workflow for guests and admin management of postings",
        "Built REST API routes and integrated database operations",
        "Designed responsive and modular front-end interface with Tailwind CSS",
        "Guests can send messages via the contact page"
      ],
      object: "/models/businesswebsiteLinkPlant.glb",
      objectScale: 0.4,
    },
    {
      site: "https://reyuken.github.io/project-admin-dashboard/",
      image: "/sites/admindashboard.jpg",
      description: "Static admin dashboard featuring widgets and a sidebar. A design project built as part of The Odin Project CSS course.",
      techStack: ["HTML", "CSS"],
      features: [
        "Static UI layout",
        "Non-clickable widgets",
        "Styled sidebar and cards"
      ]
    },//1
    {
      site: "https://reyuken.github.io/project-sign-up-form/",
      image: "/sites/signupform.jpg",
      description: "Modern sign-up form with built-in validation for user registration. This project is a demonstration of concepts learned from the Intermediate HTML and CSS course of The Odin Project.",
      techStack: ["HTML", "CSS"],
      features: [
        "Styled and responsive form UI",
        "Native browser validation using required fields",
        "Purely front-end design", 
      ]
    },//2
    {
      site: "https://reyuken.github.io/project-restaurant-page/",
      image: "/sites/restaurantpage.jpg",
      description: "Single-page restaurant website structured using ES6 modules and bundled with Webpack. This project primarily demonstrates the use of Webpack for module bundling, while also applying previously learned HTML, CSS, and JavaScript concepts.",
      techStack: ["HTML", "CSS", "JavaScript (ES6 Modules)", "Webpack"],
      features: [
        "Functional tab navigation",
        "Modular JavaScript architecture",
        "Bundled and optimized using Webpack",
      ]
    },//3
    "",//4
    "",//5
    "",//6
    "",//7
    "",//8
    "",//9
    "", //10
    "", //11
    {
      site: "https://reyuken.github.io/project-calculator/",
      image: "/sites/calculator.jpg",
      description: "Responsive calculator for basic arithmetic operations.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Add, subtract, multiply, divide",
        "Clear and backspace functions",
        "Keyboard support"
      ],
    },//12
    {
      site: "https://reyuken.github.io/project-etch-a-sketch/",
      image: "/sites/etchsketch.jpg",
      description: "Interactive hover-based drawing grid, a project from The Odin Project to practice DOM manipulation.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Adjustable grid size",
        "Color and erase modes",
        "Interactive drawing"
      ]
    },//13
    {
      site: "https://reyuken.github.io/project-tic-tac-toe/",
      image: "/sites/tictactoe.jpg",
      description: "Classic 3x3 Tic Tac Toe game playable against another player.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "2-player mode",
        "Win detection",
        "Reset game"
      ]
    },//14
    "", //15
    "", //16
    "", //17
    "", //18
    "", //19
    {
      site: "https://reyuken.github.io/project-weather-app/",
      image: "/sites/weatherapp.jpg",
      description: "Weather app project from The Odin Project Fullstack course, demonstrating API usage to display real-time city weather data.",
      techStack: ["HTML", "CSS", "JavaScript", "Weather API"],
      features: [
        "Current temperature and conditions",
        "Search by city",
        "Responsive UI"
      ]
    },//20
    "", //21
    "", //22
    {
      site: "https://reyuken.github.io/project-library/",
      image: "/sites/library.jpg",
      description: "Digital library project from The Odin Project, demonstrating the use of objects and constructors to manage book collections.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Add, remove, and edit books",
        "Mark books as read/unread",
        "Store data locally"
      ]
    },//23
    "", //24
    {
      site: "NA",
      image: "/images/newspaper.png",
      imagePosition: [-0.064, -0.12, 0.1924],
      imageSize: [4, 4.4],
      object: "/models/newspaperLinkTree.glb",
      objectScale: 0.2,
    },//25
    "", //26
  ];
  useEffect(() => {
    links.forEach(link => {
      if (link.image) useTexture.preload(link.image);
    });
  }, []);
  return (
    <>
    <group position={[0, 0, 0]}>
      {positions.map((pos, i) => (
        <Box key={i} position={pos} link={links[i]} index={i} setPreviewLink={setPreviewLink} />
      ))}
    </group>

    </>
  );
}

export default function RotatableCube({groupRef, visible = true}) {
  const [dragging, setDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);
  const [previewLink, setPreviewLink] = useState(null);

  const DRAG_DURATION = 1000; // milliseconds

    useFrame(() => {
    if (!dragging && groupRef.current) {
      // Auto-rotate when not dragging
      // groupRef.current.rotation.y += 0.002; // horizontal rotation speed
      // groupRef.current.rotation.x += 0.002; // vertical rotation speed
    }
  });
  return (
    <>
    <group
      ref={groupRef}
      visible={visible}
      position={[0, 2, 0]}
      rotation={[Math.PI / 6, Math.PI / 4, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDragging(true);
        setLastMouseX(e.clientX);
        setLastMouseY(e.clientY);
        setTimeout(() => {
          setDragging(false);
        }, DRAG_DURATION);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerMove={(e) => {
        if (dragging && groupRef.current) {
          const deltaX = e.clientX - lastMouseX;
          const deltaY = e.clientY - lastMouseY;

          groupRef.current.rotation.y += deltaX * 0.003;
          groupRef.current.rotation.x += deltaY * 0.003;

          setLastMouseX(e.clientX);
          setLastMouseY(e.clientY);
        }
      }}
    >
      <mesh position={[0,0,0]} visible={true}>
        <boxGeometry  args={[5, 5, 5]} /> {/* size big enough to cover all cubes */}
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
        <Cube setPreviewLink={setPreviewLink} />
            {/* 3D overlay */}

    </group>
      {previewLink && (
        <PreviewOverlay3D
          previewLink={previewLink}
          setPreviewLink={setPreviewLink}
          position={[-6, 19.5, -22.687]} // adjust position of preview screen here
          scale={6}
        />
      )}
    </>
  );
}