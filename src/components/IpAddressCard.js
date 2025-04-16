import { useEffect, useState } from 'react';
import MetricCard from './MetricCard';

function IpAddressCard({ version }) {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = '';

    if (version === 'v4') {
      url = 'https://api.ipify.org?format=json';
    } else if (version === 'v6') {
      url = 'https://api64.ipify.org?format=json';
    } else {
      setError('Invalid IP version');
      setLoading(false);
      return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setIp(data.ip);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch IP address');
        setLoading(false);
      });
  }, [version]);

  if (loading) return <MetricCard label={`IPv${version === 'v6' ? 6 : 4} Address`} value="Loading..." />;
  if (error) return <MetricCard label={`IPv${version === 'v6' ? 6 : 4} Address`} value={error} />;

  // Check if the IPv6 is identical to the IPv4 address
  if (version === 'v6' && ip === '137.59.230.240') { // Replace with actual IPv4 address to compare
    return <MetricCard label="IPv6 Address" value="IPv6 not available, showing IPv4 address" />;
  }

  return <MetricCard label={`IPv${version === 'v6' ? 6 : 4} Address`} value={ip} />;
}

export default IpAddressCard;
