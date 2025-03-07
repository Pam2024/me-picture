import { io } from "socket.io-client";

let socket;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(); // Connect to the server

    if (userId) {
      socket.emit("authenticate", userId);
    }
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = undefined;
  }
};
