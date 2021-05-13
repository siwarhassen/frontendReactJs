import React, { createContext } from "react";
import io from "socket.io-client";

export const SocketIoContext = createContext();

const SocketContext = ({ children }) => {
  const socket = io.connect("ws://test.herokuapp.com/socket.io/?EIO=4&transport=websocket");
  console.log(socket);
  return (
    <SocketIoContext.Provider value={{ socket }}>
      {children}
    </SocketIoContext.Provider>
  );
};

export default SocketContext;
 
