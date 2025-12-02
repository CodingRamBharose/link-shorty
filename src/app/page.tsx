'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!url) return;
    setLoading(true);
    
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      
      const data = await res.json();
      setShortCode(data.shortCode);
    } catch (err) {
      alert('Failed to shorten link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Link Shortener
      </h1>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="url"
          placeholder="Paste long link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '12px', fontSize: '16px', width: '300px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }}
        />
        <button
          onClick={shortenUrl}
          disabled={loading}
          style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {loading ? '...' : 'Shorten'}
        </button>
      </div>

      {shortCode && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>Success! Your short link:</p>
          <a
            href={`http://localhost:3000/${shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0070f3', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none' }}
          >
            http://localhost:3000/{shortCode}
          </a>
        </div>
      )}
    </main>
  );
}