import React, { useEffect, useState } from 'react';

function Sextant() {
  const [ip, setIp] = useState('Loading...');
  const [latency, setLatency] = useState(null);

  useEffect(() => {
    const start = Date.now();

    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIp(data.ip);
        const end = Date.now();
        setLatency(end - start);
      })
      .catch(error => {
        setIp('Error fetching IP');
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Network Information</h2>
      <p>IP Address: {ip}</p>
      {latency !== null && <p>Latency: {latency} ms</p>}
      {latency === null && <p>Checking latency...</p>}
      <p>Status: {ip !== 'Error fetching IP' ? 'Online ✅' : 'Offline ❌'}</p>
    </div>
  );
}

export default Sextant;
