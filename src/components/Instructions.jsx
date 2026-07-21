"use client";
import { useState, useEffect } from "react";
import { useProgress, Html } from "@react-three/drei";
import { buttonStyle } from "./ButtonStyle";

export default function Instructions() {
  const [isOpen, setIsOpen] = useState(true);
  const { active, progress } = useProgress(); // track all R3F assets

  const toggle = () => setIsOpen(false);

  // Button enabled only when all assets are loaded
  const buttonEnabled = progress === 100 && !active;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-[#3498db] text-white font-bold rounded-md shadow-lg"
        >
          Show Instructions
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white p-8">
          <p className="text-center text-yellow-400 font-medium mb-6">
            View my latest portfolio with updated projects.{" "}
            <a
              href="https://reyuken.github.io/unabiaray-webportfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300"
            >
              Click here to visit the updated portfolio.
            </a>
          </p>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Website Instructions
          </h1>

          <ul className="list-none space-y-3 text-lg max-w-2xl text-center mx-auto">
            <li>Hover your mouse pointer over the cube to see which parts are clickable.</li>
            <li>Click on a box or object to view its project details and information.</li>
            <li>Use your mouse to rotate and explore the 3D environment.</li>
            <li>Check out the control settings in the upper-left corner for additional options.</li>
            <li>These instructions can always be accessed from the upper-right corner of the site.</li>
            <li className="mt-4 text-sm text-gray-400">
              ⚠️ Works best on desktop browsers with a mouse.
            </li>
          </ul>

          <button
            onClick={toggle}
            style={buttonStyle}
            disabled={!buttonEnabled}
            className={`mt-8 ${buttonEnabled ? "" : "opacity-50 cursor-not-allowed"}`}
          >
            {buttonEnabled ? "Close" : `Loading ${Math.round(progress)}%`}
          </button>
        </div>
      )}
    </>
  );
}
