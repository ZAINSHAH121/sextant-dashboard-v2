import React, { useState, useEffect } from 'react';

const LatencyDisplay = () => {
    const [latency, setLatency] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:55455');  // Must match your server.js

        socket.onopen = () => {
            setConnectionStatus('✅ Connected to WebSocket server');
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const receivedTimestamp = parseInt(event.data, 10);
            const currentTimestamp = Date.now();
            const latencyValue = currentTimestamp - receivedTimestamp;
            setLatency(latencyValue);
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setConnectionStatus('❌ WebSocket Error');
        };

        socket.onclose = () => {
            setConnectionStatus('🛑 WebSocket connection closed');
        };

        return () => socket.close();
    }, []);

    return (
        <div>
            <h2>WebSocket Latency</h2>
            <p>Status: {connectionStatus}</p>
            {latency !== null ? (
                <p>Packet Latency: {latency} ms</p>
            ) : (
                <p>Waiting for packets...</p>
            )}
        </div>
    );
};

export default LatencyDisplay;
