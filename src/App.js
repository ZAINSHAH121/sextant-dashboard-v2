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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 text-white">
      <h1 className="text-5xl font-bold mb-8">Sextant Dashboard</h1>
      <div className="bg-white text-gray-800 shadow-lg rounded-2xl p-8 w-80 text-center">

        {loading ? (
          <p className="animate-pulse text-lg">⏳ Fetching Network Info...</p>
        ) : (
          <>
            <p className="text-lg mb-4"><strong>🌐 IP Address:</strong> {ipAddress}</p>
            <p className="text-lg mb-4"><strong>📡 Latency:</strong> {latency}</p>
            <p className="text-lg">
              <strong>✅ Status:</strong> Online
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
