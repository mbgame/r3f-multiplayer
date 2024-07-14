import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";

function App() {
  return (
    <>
      <SocketManager />
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
