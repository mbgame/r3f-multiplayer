import { useState } from "react";
import { ContactShadows, Environment, OrbitControls, useCursor } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { useAtom } from "jotai";
import { charactersAtom,socket } from "./SocketManager";
import * as THREE from 'three'

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  console.log(characters);
  // const [socket] = useSocket();
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor)
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blue={2} />
      <OrbitControls />
      <mesh rotation-x={-Math.PI/2} position-y={-0.001} onPointerDown={(e)=>socket.emit("move",[e.point.x,0,e.point.z])}
      onPointerEnter={()=>setOnFloor(true)}
      onPointerLeave={()=>setOnFloor(false)}
      >
        <planeGeometry args={[10,10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {characters.map((character, index) => {
        return (
          <AnimatedWoman
            key={index}
            position={new THREE.Vector3(character.position[0], 0, character.position[2])  }
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.bottomColor}
          />
        );
      })}
      {/* <AnimatedWoman />
      <AnimatedWoman position-x={-1} hairColor="blue" bottomColor="blue" topColor="red" />
      <AnimatedWoman position-x={1} hairColor="red" bottomColor="green" topColor="yellow" /> */}
    </>
  );
};
