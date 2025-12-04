import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";

export default function Tv({ url = "/models/tv.obj", scale = 0.01 }) {
  const obj = useLoader(OBJLoader, url);

  return (
    <primitive object={obj} scale={scale} />
  );
}