'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '@aryankarma/simple-avatar-generator';
import { getAvatarUrl } from '@/lib/api';

// Example emails for the hero section
const exampleEmails = [
  'alice.johnson@example.com',
  'bob.smith@company.com',
  'charlie.brown@email.com',
  'diana.prince@hero.com',
  'emma.watson@star.com',
  'frank.miller@design.com',
  'grace.hopper@tech.com',
  'henry.ford@industry.com',
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
};

const codeExamples = [
  {
    title: 'Basic Usage',
    description: 'Simple avatar generation with just an email',
    code: `import { Avatar } from '@aryankarma/simple-avatar-generator';

function UserProfile({ email }) {
  return <Avatar email={email} />;
}`,
  },
  {
    title: 'Custom Size',
    description: 'Control the avatar size',
    code: `import { Avatar } from '@aryankarma/simple-avatar-generator';

function UserAvatar({ email }) {
  return (
    <Avatar 
      email={email} 
      size={150}
    />
  );
}`,
  },
  {
    title: 'With Styling',
    description: 'Add custom CSS classes and styles',
    code: `import { Avatar } from '@aryankarma/simple-avatar-generator';

function StyledAvatar({ email }) {
  return (
    <Avatar 
      email={email}
      size={100}
      className="rounded-full border-2 border-blue-500"
      style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
    />
  );
}`,
  },
  {
    title: 'In a List',
    description: 'Display multiple avatars',
    code: `import { Avatar } from '@aryankarma/simple-avatar-generator';

function UserList({ users }) {
  return (
    <div className="flex gap-4">
      {users.map(user => (
        <Avatar 
          key={user.email}
          email={user.email}
          size={50}
          className="rounded-full"
        />
      ))}
    </div>
  );
}`,
  },
  {
    title: 'Utility Functions',
    description: 'Use utility functions for custom implementations',
    code: `import { 
  generateAvatarSVG, 
  generateAvatarDataURL 
} from '@aryankarma/simple-avatar-generator';

// Get SVG string
const svg = generateAvatarSVG('user@example.com', 200);

// Get data URL
const dataUrl = generateAvatarDataURL('user@example.com', 200);

// Use in custom component
<img src={dataUrl} alt="Avatar" />`,
  },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [avatarSize, setAvatarSize] = useState(200);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerateAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setLoading(true);

    try {
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

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-800 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black dark:text-zinc-50 mb-3 sm:mb-4 bg-clip-text"
            >
              Avatar Generator
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-700 dark:text-zinc-300 mb-2 px-2"
            >
              Generate unique, deterministic avatars from email addresses
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 px-2"
            >
              Powered by{' '}
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded text-xs sm:text-sm md:text-base break-all sm:break-normal">
                @aryankarma/simple-avatar-generator
              </span>
            </motion.p>
          </motion.div>

          {/* Example Avatars Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-zinc-200 dark:border-zinc-800"
          >
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-black dark:text-zinc-50"
            >
              Example Avatars
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6 justify-items-center">
              {exampleEmails.map((exampleEmail, index) => (
                <motion.div
                  key={index}
                  variants={avatarVariants}
                  whileHover="hover"
                  className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer"
                >
                  <motion.div
                    className="rounded-full border-2 border-zinc-200 dark:border-zinc-700 p-1 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                    whileHover={{ borderColor: 'rgb(59 130 246)' }}
                  >
                    <Avatar
                      email={exampleEmail}
                      size={60}
                      className="rounded-full sm:w-20 sm:h-20"
                    />
                  </motion.div>
                  <p className="text-[10px] sm:text-xs text-center text-zinc-600 dark:text-zinc-400 font-mono max-w-[80px] sm:max-w-[100px] truncate">
                    {exampleEmail.split('@')[0]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12"
          >
            {[
              {
                emoji: '🎨',
                title: 'Unique Designs',
                description: 'Each email generates a unique, colorful avatar',
              },
              {
                emoji: '🔄',
                title: 'Deterministic',
                description: 'Same email always produces the same avatar',
              },
              {
                emoji: '📦',
                title: 'Easy to Use',
                description: 'Simple React component, zero configuration',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div
                  className="text-3xl sm:text-4xl mb-2 sm:mb-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="font-semibold text-base sm:text-lg text-black dark:text-zinc-50 mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10 md:gap-12 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        {/* Installation Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Installation</h2>
          <div className="bg-black/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
              <code className="text-green-300 font-mono text-xs sm:text-sm md:text-base lg:text-lg break-all sm:break-normal flex-1">
                npm install @aryankarma/simple-avatar-generator
              </code>
              <button
                onClick={() => copyToClipboard('npm install @aryankarma/simple-avatar-generator', -1)}
                className="sm:ml-4 px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                {copiedIndex === -1 ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://www.npmjs.com/package/@aryankarma/simple-avatar-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 font-semibold hover:bg-blue-50 transition-colors shadow-lg text-sm sm:text-base"
            >
              <span>📦</span>
              <span>View on npm</span>
            </a>
          </div>
        </motion.section>

        {/* Code Examples Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-zinc-50 mb-6 sm:mb-8 text-center px-2">
            Code Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {codeExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                  {example.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-3 sm:mb-4">
                  {example.description}
                </p>
                <div className="relative">
                  <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-zinc-100 font-mono whitespace-pre-wrap break-words">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.code, index)}
                    className="absolute top-2 right-2 px-2 sm:px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-[10px] sm:text-xs rounded transition-colors"
                  >
                    {copiedIndex === index ? '✓' : 'Copy'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 md:p-8 bg-white dark:bg-black shadow-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-black dark:text-zinc-50">
            Try It Out
          </h2>
          <form onSubmit={handleGenerateAvatar} className="flex flex-col gap-3 sm:gap-4">
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
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
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
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Size must be between 50 and 1000 pixels
              </p>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              {loading ? 'Generating...' : 'Generate Avatar'}
            </button>
          </form>
        </motion.div>

        {/* Avatar Display */}
        {avatarUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 md:p-8 bg-white dark:bg-black shadow-lg"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-black dark:text-zinc-50 text-center sm:text-left">
              Your Avatar
            </h2>
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="rounded-xl border-2 border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-900"
              >
                <img
                  src={avatarUrl}
                  alt={`Avatar for ${email}`}
                  className="rounded-lg max-w-full h-auto"
                  width={Math.min(avatarSize, 300)}
                  height={Math.min(avatarSize, 300)}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </motion.div>
              <div className="flex flex-col gap-2 items-center text-center sm:text-left w-full">
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 break-all px-2">
                  Email: <span className="font-mono text-black dark:text-zinc-50">{email}</span>
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Size: <span className="font-mono text-black dark:text-zinc-50">{avatarSize}x{avatarSize}px</span>
                </p>
                <button
                  onClick={handleDownload}
                  className="rounded-lg bg-blue-600 px-4 sm:px-6 py-2 text-white font-medium hover:bg-blue-700 transition-colors mt-2 shadow-md text-sm sm:text-base w-full sm:w-auto"
                >
                  Download SVG
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* API Documentation */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-black shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-black dark:text-zinc-50">
            API Reference
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-2">
                Avatar Component Props
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="text-left py-2 px-4 text-zinc-700 dark:text-zinc-300">Prop</th>
                      <th className="text-left py-2 px-4 text-zinc-700 dark:text-zinc-300">Type</th>
                      <th className="text-left py-2 px-4 text-zinc-700 dark:text-zinc-300">Default</th>
                      <th className="text-left py-2 px-4 text-zinc-700 dark:text-zinc-300">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 px-4 font-mono text-blue-600 dark:text-blue-400">email</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">string</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">-</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">Email address (required)</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">number</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">200</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">Avatar size in pixels</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-2 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">string</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">''</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">CSS class name</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-blue-600 dark:text-blue-400">style</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">CSSProperties</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">{}</td>
                      <td className="py-2 px-4 text-zinc-600 dark:text-zinc-400">Inline styles</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
