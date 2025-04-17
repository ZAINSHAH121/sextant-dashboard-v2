import { useState, useEffect } from 'react';

const LatencyCard = () => {
  const [latency, setLatency] = useState('Waiting for data...');
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:55455');  // Connect to WebSocket server

    socket.onopen = () => {
      setConnectionStatus('Connected to WebSocket');
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const receivedTimestamp = parseInt(event.data, 10);
      const currentTimestamp = Date.now();
      const latencyValue = currentTimestamp - receivedTimestamp;
      setLatency(`${latencyValue} ms`);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
      setConnectionStatus('WebSocket connection closed');
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="metric-card">
      <h3 className="text-white">{connectionStatus}</h3>
      <p className="text-lg text-white">Latency: {latency}</p>
    </div>
  );
};

export default LatencyCard;
