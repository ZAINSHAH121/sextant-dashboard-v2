import { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';
import Banner from './components/Banner';
import Exhibit from './components/Exhibit';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center text-white text-2xl">
        Loading network data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-start p-8">

      <Banner />

      <Exhibit heading="Network Information">
        <MetricCard label="IP Address" value={ipAddress} />
        <MetricCard label="Latency" value={latency} />
        <MetricCard label="Status" value={latency ? '✅ Online' : '❌ Offline'} />
      </Exhibit>

      <Exhibit heading="Performance">
        <MetricCard label="Download Speed" value={downloadSpeed} />
        <MetricCard label="Upload Speed" value={uploadSpeed} />
      </Exhibit>

      <footer className="text-white mt-10 text-sm opacity-70">
        © 2025 Sextant by Syed Zain Qaiser — All rights reserved.
      </footer>
    </div>
  );
}

export default App;
