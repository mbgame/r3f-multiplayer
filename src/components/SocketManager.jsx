import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

// export const socket = io("https://r3f-multiplayer-server.onrender.com:10000");
export const socket = io("https://r3f-multiplayer-server-production.up.railway.app/:8080")
export const charactersAtom = atom([]);

export const SocketManager = () => {
  const [characters, setCharacters] = useAtom(charactersAtom);
  console.log("socket :", socket)

  useEffect(() => {
    function onConnection() {
      console.log("Connected to server");
    }

    function disconnect() {
      console.log("Disconnected from server");
    }

    function onMessage(message) {
      console.log("Received message:", message);
    }

    function onCharacters(values) {
      setCharacters(values);
    }

    socket.on("connect", onConnection);
    socket.on("disconnect", disconnect);
    socket.on("message", onMessage);
    socket.on("characters", onCharacters);

    return () => {
      socket.off("connect", onConnection);
      socket.off("disconnect", disconnect);
      socket.off("message", onMessage);
      socket.off("characters", onCharacters);
    };
  });
};
