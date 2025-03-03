import { useEffect } from "react";

const WebSocketTest = () => {
  useEffect(() => {
    if (window.OverviewChannel) {
      console.log("OverviewChannel is ready:", window.OverviewChannel);
    } else {
      console.log("OverviewChannel is NOT available");
    }
  }, []);

  return <div>WebSocket Test Component</div>;
};

export default WebSocketTest;
