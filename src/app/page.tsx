'use client';

import { useState } from 'react';
import { getAvatarUrl } from '@/lib/api';

export default function Home() {
  const [email, setEmail] = useState('');
  const [avatarSize, setAvatarSize] = useState(200);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Generate avatar URL - the backend will generate it
      const url = getAvatarUrl(email, avatarSize);
      setAvatarUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate avatar');
      setAvatarUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!avatarUrl) return;

    fetch(avatarUrl)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `avatar-${email.split('@')[0]}.svg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(err => {
        console.error('Download failed:', err);
        setError('Failed to download avatar');
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Avatar Generator
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Generate unique avatars from email addresses
          </p>
        </div>

        {/* Input Form */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Generate Avatar
          </h2>
          <form onSubmit={handleGenerateAvatar} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Avatar Size (px)
              </label>
              <input
                type="number"
                value={avatarSize}
                onChange={(e) => {
                  const size = parseInt(e.target.value);
                  if (size >= 50 && size <= 1000) {
                    setAvatarSize(size);
                  }
                }}
                min={50}
                max={1000}
                className="rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Size must be between 50 and 1000 pixels
              </p>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-zinc-900 dark:bg-zinc-100 px-6 py-2 text-white dark:text-black font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Avatar'}
            </button>
          </form>
        </div>

        {/* Avatar Display */}
        {avatarUrl && (
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
              Your Avatar
            </h2>
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900">
                <img
                  src={avatarUrl}
                  alt={`Avatar for ${email}`}
                  className="rounded-lg"
                  width={avatarSize}
                  height={avatarSize}
                />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Email: <span className="font-mono text-black dark:text-zinc-50">{email}</span>
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Size: <span className="font-mono text-black dark:text-zinc-50">{avatarSize}x{avatarSize}px</span>
                </p>
                <button
                  onClick={handleDownload}
                  className="rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition-colors mt-2"
                >
                  Download SVG
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-zinc-50">
            How it works
          </h3>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Enter an email address to generate a unique avatar</li>
            <li>Each email produces a deterministic avatar (same email = same avatar)</li>
            <li>Avatars include initials and colorful patterns</li>
            <li>Download as SVG for scalable use</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
