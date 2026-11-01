import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, Volume2, Sparkles, Ghost } from 'lucide-react';

interface SpookyOutputProps {
  originalMessage: string;
  spookyMessage: string;
  model: string;
}

export const SpookyOutput: React.FC<SpookyOutputProps> = ({
  originalMessage,
  spookyMessage,
  model,
}) => {
  const [copiedType, setCopiedType] = useState<'text' | 'git' | null>(null);

  const gitCommand = `git commit -m "${spookyMessage.replace(/"/g, '\\"')}"`;

  const handleCopy = async (text: string, type: 'text' | 'git') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  // Play synthesized spectral wind/chime using Web Audio API
  const playSpookyChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch {
      // AudioContext not allowed or supported
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto mt-6"
      >
        <div className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-spooky-900/95 to-spooky-950/98 shadow-ghost-glow backdrop-blur-xl">
          {/* Glowing Top Bar Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-emerald-400 to-purple-600" />

          {/* Card Header */}
          <div className="px-5 py-3.5 border-b border-purple-900/40 bg-purple-950/20 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-900/40 text-purple-300 border border-purple-700/40">
                <Ghost className="w-4 h-4 text-purple-300" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-purple-200 font-display tracking-wide">
                  The Ghost&apos;s Transmutation
                </h3>
                <span className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Model: {model}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={playSpookyChime}
              className="px-2.5 py-1 text-xs font-mono text-purple-300/70 hover:text-purple-200 hover:bg-purple-900/40 rounded border border-purple-900/40 transition-colors flex items-center gap-1.5"
              title="Play spectral whisper tone"
            >
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Whisper</span>
            </button>
          </div>

          {/* Card Body */}
          <div className="p-5 md:p-6 space-y-4">
            {/* Original mortal message reference */}
            <div className="text-xs font-mono text-slate-400 bg-spooky-950/80 px-3.5 py-2 rounded-lg border border-purple-950/80 flex items-baseline gap-2">
              <span className="text-slate-500 shrink-0 select-none">Mortal commit:</span>
              <span className="text-slate-300 italic truncate">&quot;{originalMessage}&quot;</span>
            </div>

            {/* Spooky transformed message */}
            <div className="relative group">
              <div className="p-4 md:p-5 rounded-lg bg-spooky-950/90 border border-emerald-500/30 text-emerald-100 font-mono text-base md:text-lg leading-relaxed shadow-inner">
                <p className="text-glow-green select-text font-medium">
                  &ldquo;{spookyMessage}&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {/* Copy raw message */}
              <button
                type="button"
                onClick={() => handleCopy(spookyMessage, 'text')}
                className="px-4 py-2.5 rounded-lg font-mono text-xs md:text-sm font-medium flex items-center justify-center gap-2 bg-spooky-800/90 hover:bg-spooky-700/90 text-purple-200 border border-purple-800/40 hover:border-purple-600/60 transition-all active:scale-98 shadow-sm"
              >
                {copiedType === 'text' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied Message!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-purple-400" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>

              {/* Copy full git command */}
              <button
                type="button"
                onClick={() => handleCopy(gitCommand, 'git')}
                className="px-4 py-2.5 rounded-lg font-mono text-xs md:text-sm font-medium flex items-center justify-center gap-2 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 hover:border-emerald-600/70 transition-all active:scale-98 shadow-sm"
              >
                {copiedType === 'git' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied Git Command!</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Copy as `git commit`</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
