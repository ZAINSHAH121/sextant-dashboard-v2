import { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [latency, setLatency] = useState('');
  const [downloadSpeed, setDownloadSpeed] = useState('');
  const [uploadSpeed, setUploadSpeed] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchNetworkData = () => {
    setLoading(true);
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
        setLatency(`${Math.floor(Math.random() * 500) + 100} ms`);
        const randomDownload = `${Math.floor(Math.random() * 900) + 100} Mbps`;
const randomUpload = `${Math.floor(Math.random() * 90) + 10} Mbps`;

setDownloadSpeed(randomDownload);
setUploadSpeed(randomUpload);

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNetworkData();  // Fetch at start
    const interval = setInterval(fetchNetworkData, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl text-white font-bold mb-8">🌐 Sextant Network Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        <MetricCard label="IP Address" value={ipAddress} />
        <MetricCard label="Latency" value={latency} />
        <MetricCard label="Status" value={latency ? '✅ Online' : '❌ Offline'} />
        
        {/* Add these two lines */}
        <MetricCard label="Download Speed" value={downloadSpeed} />
        <MetricCard label="Upload Speed" value={uploadSpeed} /> 

      </div>
    </div>
  );
}

export default App;
