import { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';
import Banner from './components/Banner';
import Exhibit from './components/Exhibit';
import IpAddressCard from './components/IpAddressCard';
import LatencyCard from './components/LatencyCard';


function App() {
  const [latency, setLatency] = useState('');
  const [downloadSpeed, setDownloadSpeed] = useState('');
  const [uploadSpeed, setUploadSpeed] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNetworkData = () => {
    setLoading(true);
    setLatency(`${Math.floor(Math.random() * 500) + 100} ms`);
    const randomDownload = `${Math.floor(Math.random() * 900) + 100} Mbps`;
    const randomUpload = `${Math.floor(Math.random() * 90) + 10} Mbps`;
    setDownloadSpeed(randomDownload);
    setUploadSpeed(randomUpload);
    setLoading(false);
  };

  useEffect(() => {
    fetchNetworkData();
    const interval = setInterval(fetchNetworkData, 5000);
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

      <Exhibit heading="IP Addresses">
        <IpAddressCard version="v4" />
        <IpAddressCard version="v6" />
      </Exhibit>

      <Exhibit heading="Network Information">
      <LatencyCard />

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
