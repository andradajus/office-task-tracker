import { createContext, useContext, useEffect, useState } from "react";
import OverviewChannel from "@/channels/overview_channel";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    OverviewChannel.received = (message) => {
      console.log("New message:", message);
      setData(message);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ data }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
