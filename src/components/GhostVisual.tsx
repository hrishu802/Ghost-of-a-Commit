import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';

export type GhostState = 'idle' | 'summoning' | 'revealed' | 'error';

interface GhostVisualProps {
  state: GhostState;
  onClick?: () => void;
}

export const GhostVisual: React.FC<GhostVisualProps> = ({ state, onClick }) => {
  const isSummoning = state === 'summoning';
  const isError = state === 'error';
  const isRevealed = state === 'revealed';

  // Dynamic status text
  const statusLabels: Record<GhostState, { label: string; color: string; icon: React.ReactNode }> = {
    idle: {
      label: 'Spirit is slumbering in the crypt',
      color: 'text-purple-400 border-purple-900/50 bg-purple-950/40',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />,
    },
    summoning: {
      label: 'Channeling NVIDIA Nemotron (3.5 Lightning)...',
      color: 'text-emerald-400 border-emerald-900/60 bg-emerald-950/40',
      icon: <Flame className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />,
    },
    revealed: {
      label: 'The ghost has spoken from beyond',
      color: 'text-purple-300 border-purple-800/60 bg-purple-950/50',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-300" />,
    },
    error: {
      label: 'A disturbance in the ether',
      color: 'text-rose-400 border-rose-900/60 bg-rose-950/40',
      icon: <Flame className="w-3.5 h-3.5 text-rose-400" />,
    },
  };

  const status = statusLabels[state];

  return (
    <div className="flex flex-col items-center justify-center select-none py-2 relative">
      {/* Background Glowing Aura */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: isSummoning ? [1, 1.25, 1.1] : [1, 1.08, 1],
            opacity: isSummoning ? [0.6, 0.9, 0.6] : [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: isSummoning ? 1.5 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
            isSummoning
              ? 'bg-emerald-500/40'
              : isError
              ? 'bg-rose-600/30'
              : isRevealed
              ? 'bg-purple-500/35'
              : 'bg-purple-600/25'
          }`}
        />

        {/* Floating Ghost Container */}
        <motion.div
          animate={{
            y: isSummoning ? [-4, 4, -4] : [0, -12, 0],
            rotate: isSummoning ? [-3, 3, -3] : [0, 1.5, -1.5, 0],
          }}
          transition={{
            duration: isSummoning ? 1.2 : 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="relative cursor-pointer group z-10"
          title="Click to disturb the phantom"
        >
          {/* Ectoplasm particles around ghost */}
          {isSummoning && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 border border-dashed border-emerald-400/40 rounded-full pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 border border-dotted border-purple-400/30 rounded-full pointer-events-none"
              />
            </>
          )}

          {/* SVG Ghost Art */}
          <svg
            className={`w-32 h-36 md:w-36 md:h-40 transition-all duration-500 ${
              isSummoning ? 'glow-green' : isError ? 'filter drop-shadow(0 0 16px rgba(244,63,94,0.4))' : 'glow-purple'
            }`}
            viewBox="0 0 140 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ghostGradient" x1="70" y1="10" x2="70" y2="155" gradientUnits="userSpaceOnUse">
                <stop stopColor={isSummoning ? '#ecfdf5' : '#f8fafc'} />
                <stop offset="0.6" stopColor={isSummoning ? '#a7f3d0' : '#e2e8f0'} />
                <stop offset="1" stopColor={isSummoning ? '#34d399' : isError ? '#fca5a5' : '#c084fc'} stopOpacity="0.4" />
              </linearGradient>
              <filter id="ghostShadow" x="0" y="0" width="140" height="160" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={isSummoning ? '#10b981' : '#7e22ce'} floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Ghost Body */}
            <path
              d="M70 14C42 14 24 38 24 72C24 102 20 128 20 142C20 146 25 149 28 146C34 141 40 140 45 144C51 148 57 148 62 143C67 138 73 138 78 143C83 148 89 148 95 144C100 140 106 141 112 146C115 149 120 146 120 142C120 128 116 102 116 72C116 38 98 14 70 14Z"
              fill="url(#ghostGradient)"
              filter="url(#ghostShadow)"
            />

            {/* Ghost Arms */}
            <motion.path
              animate={{
                d: isSummoning
                  ? 'M24 74C14 68 8 74 12 86C15 94 22 92 24 86'
                  : 'M24 78C16 80 12 86 16 94C19 98 23 94 25 88',
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              fill="url(#ghostGradient)"
            />
            <motion.path
              animate={{
                d: isSummoning
                  ? 'M116 74C126 68 132 74 128 86C125 94 118 92 116 86'
                  : 'M116 78C124 80 128 86 124 94C121 98 117 94 115 88',
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              fill="url(#ghostGradient)"
            />

            {/* Left Eye */}
            <motion.ellipse
              cx="50"
              cy="62"
              rx={isSummoning ? 6.5 : isError ? 4 : 5}
              ry={isSummoning ? 8 : isError ? 3 : 7}
              fill={isSummoning ? '#064e3b' : isError ? '#881337' : '#1e1b4b'}
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.9, 0.92, 0.94, 1],
              }}
            />
            {/* Left Eye Glow Pupil */}
            <circle
              cx={isSummoning ? 51 : 51}
              cy={isSummoning ? 60 : 60}
              r={isSummoning ? 3 : 2}
              fill={isSummoning ? '#34d399' : isError ? '#f43f5e' : '#a855f7'}
            />

            {/* Right Eye */}
            <motion.ellipse
              cx="90"
              cy="62"
              rx={isSummoning ? 6.5 : isError ? 4 : 5}
              ry={isSummoning ? 8 : isError ? 3 : 7}
              fill={isSummoning ? '#064e3b' : isError ? '#881337' : '#1e1b4b'}
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.9, 0.92, 0.94, 1],
              }}
            />
            {/* Right Eye Glow Pupil */}
            <circle
              cx={isSummoning ? 91 : 91}
              cy={isSummoning ? 60 : 60}
              r={isSummoning ? 3 : 2}
              fill={isSummoning ? '#34d399' : isError ? '#f43f5e' : '#a855f7'}
            />

            {/* Ghost Mouth */}
            {isSummoning ? (
              // Open chanting mouth
              <motion.ellipse
                cx="70"
                cy="85"
                rx="6"
                ry="9"
                fill="#064e3b"
                animate={{ ry: [7, 10, 7] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ) : isRevealed ? (
              // Playful spooky grin
              <path
                d="M58 82C62 89 78 89 82 82"
                stroke="#2e1065"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : isError ? (
              // Frowning mouth
              <path
                d="M60 86C65 81 75 81 80 86"
                stroke="#881337"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : (
              // Small cute "o" mouth
              <ellipse cx="70" cy="82" rx="4" ry="5.5" fill="#1e1b4b" />
            )}

            {/* Floating Rosy Ghost Cheeks */}
            <ellipse cx="40" cy="74" rx="4" ry="2.5" fill={isSummoning ? '#6ee7b7' : '#f472b6'} opacity="0.4" />
            <ellipse cx="100" cy="74" rx="4" ry="2.5" fill={isSummoning ? '#6ee7b7' : '#f472b6'} opacity="0.4" />
          </svg>
        </motion.div>
      </div>

      {/* Spirit Status Badge */}
      <motion.div
        layout
        className={`mt-4 px-3.5 py-1 rounded-full border text-xs font-mono flex items-center gap-2 backdrop-blur-md transition-all duration-300 shadow-sm ${status.color}`}
      >
        {status.icon}
        <span>{status.label}</span>
      </motion.div>
    </div>
  );
};
