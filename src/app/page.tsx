'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortenUrl = async () => {
    if (!url) return;
    setLoading(true);
    setShortCode('');
    setCopied(false);
    
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

  const copyToClipboard = () => {
    const fullLink = `http://localhost:3000/${shortCode}`;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
        
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          Link Shorty 🚀
        </h1>
        <p className="text-white/80 mb-8">
          Make your long URLs short and manageable.
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 border border-white/10 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
          
          <button
            onClick={shortenUrl}
            disabled={loading || !url}
            className={`w-full p-4 rounded-xl font-bold transition shadow-lg ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transform duration-200'
            }`}
          >
            {loading ? 'Shortening...' : 'Shorten URL ✨'}
          </button>
        </div>

        {/* Result Section */}
        {shortCode && (
          <div className="mt-8 p-4 bg-black/30 rounded-xl border border-white/10 animate-fade-in">
            <p className="text-sm text-white/60 mb-2">Your Short Link:</p>
            <div className="flex items-center justify-between gap-2 bg-black/20 p-3 rounded-lg">
              <a
                href={`http://localhost:3000/${shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 truncate font-mono"
              >
                localhost:3000/{shortCode}
              </a>
              
              <button
                onClick={copyToClipboard}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition"
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
          </div>
        )}

      </div>

      <footer className="mt-12 text-white/40 text-sm">
        Built with Next.js, Docker & Terraform
      </footer>
    </main>
  );
}