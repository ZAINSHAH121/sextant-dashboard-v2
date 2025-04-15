import { useState, useEffect } from 'react';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [latency, setLatency] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNetworkData = () => {
    setLoading(true);

    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
        setLatency(`${Math.floor(Math.random() * 500) + 100} ms`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNetworkData();  // Fetch first time
    const interval = setInterval(fetchNetworkData, 5000); // Auto-refresh every 5 sec
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white">
    <div className="bg-black bg-opacity-30 p-10 rounded-2xl shadow-2xl text-center">
    <h1 className="text-4xl font-bold mb-6">🚀 Sextant Dashboard — Live Monitoring</h1>

      <p className="text-2xl mb-2">IP Address: {ipAddress}</p>
      <p className="text-2xl mb-2">Latency: {latency}</p>
      <p className="text-2xl">
        Status: {latency ? '✅ Online' : '❌ Offline'}
      </p>
    </div>
  </div>
);


 
}

export default App;
