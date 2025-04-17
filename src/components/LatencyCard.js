import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';

function LatencyCard() {
  const [latency, setLatency] = useState('Connecting...');

  useEffect(() => {
    // Replace this URL once your instructor shares the real one!
    const socket = new WebSocket('wss://your-pylon-server-url-here');

    socket.onopen = () => {
      console.log("✅ WebSocket connected to Pylon server.");
    };

    socket.onmessage = (event) => {
      try {
        const packet = JSON.parse(event.data);
        const sentTime = packet.timestamp;
        const currentTime = Date.now();
        const latencyMs = currentTime - sentTime;
        setLatency(`${latencyMs} ms`);
      } catch (error) {
        console.error("⚠️ Failed to parse latency packet:", error);
        setLatency('Invalid data');
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      setLatency('Error fetching latency');
    };

    socket.onclose = () => {
      console.warn("⚠️ WebSocket closed");
      setLatency('Disconnected');
    };

    return () => {
      socket.close(); // Cleanly close the socket when unmounting
    };
  }, []);

  return <MetricCard label="Latency" value={latency} />;
}

export default LatencyCard;
