import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';



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

    <div className="flex flex-wrap justify-center">
  <MetricCard label="IP Address" value={ipAddress} />
  <MetricCard label="Latency" value={latency} />
  <MetricCard label="Status" value={latency ? '✅ Online' : '❌ Offline'} />
</div>

    </div>
  </div>
);


 
}

export default App;
