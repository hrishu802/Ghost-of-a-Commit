import React, { useRef, useEffect } from 'react';
import { Terminal, Flame, Sparkles, X, CornerDownLeft } from 'lucide-react';

interface TerminalInputProps {
  commitMessage: string;
  setCommitMessage: (msg: string) => void;
  onSummon: () => void;
  isLoading: boolean;
}

const PRESETS = [
  'Fixed authentication bug',
  'Refactored database query',
  'Updated documentation',
  'Removed deprecated legacy code',
  'Fixed typo in CSS styling',
  'Initial commit',
];

export const TerminalInput: React.FC<TerminalInputProps> = ({
  commitMessage,
  setCommitMessage,
  onSummon,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(64, textareaRef.current.scrollHeight)}px`;
    }
  }, [commitMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (commitMessage.trim() && !isLoading) {
        onSummon();
      }
    }
  };

  const isOverLimit = commitMessage.length > 500;
  const canSummon = commitMessage.trim().length > 0 && !isOverLimit && !isLoading;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal Window Box */}
      <div className="terminal-window rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
        {/* Terminal Header */}
        <div className="bg-spooky-900/90 px-4 py-3 border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 cursor-pointer transition-colors" />
            <span className="text-xs text-purple-300/70 font-mono ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              ghost-repo [main] ~/crypt
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
            bash &bull; UTF-8
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 md:p-5">
          <div className="font-mono text-sm text-slate-400 mb-2 flex items-center justify-between">
            <span className="text-purple-400 font-semibold">$ git commit -m &quot;</span>
            {commitMessage.length > 0 && (
              <button
                type="button"
                onClick={() => setCommitMessage('')}
                disabled={isLoading}
                className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition-colors"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={2}
              maxLength={500}
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="e.g. Fixed authentication bug..."
              className="w-full bg-spooky-950/70 text-slate-100 placeholder-slate-600 font-mono text-sm sm:text-base p-3.5 rounded-lg border border-purple-900/40 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 outline-none resize-none transition-all duration-200"
            />
          </div>

          <div className="font-mono text-sm text-purple-400 mt-1 mb-4 flex items-center justify-between">
            <span>&quot;</span>
            <span
              className={`text-xs ${
                isOverLimit
                  ? 'text-rose-400 font-semibold'
                  : commitMessage.length > 400
                  ? 'text-amber-400'
                  : 'text-slate-500'
              }`}
            >
              {commitMessage.length} / 500
            </span>
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5 mb-5">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Or choose a mortal commit message:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setCommitMessage(preset)}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-spooky-800/80 hover:bg-purple-900/40 text-purple-300/80 hover:text-purple-200 border border-purple-900/30 hover:border-purple-600/50 transition-all active:scale-95 disabled:opacity-50"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Summon Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-purple-900/30">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:flex items-center gap-1">
              Press <kbd className="px-1.5 py-0.5 rounded bg-spooky-800 border border-purple-900/50 text-slate-300">⌘</kbd>+<kbd className="px-1.5 py-0.5 rounded bg-spooky-800 border border-purple-900/50 text-slate-300">Enter</kbd> to summon
            </span>

            <button
              type="button"
              onClick={onSummon}
              disabled={!canSummon}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-mono text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                canSummon
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/25 active:scale-98 cursor-pointer'
                  : 'bg-spooky-800/60 text-slate-500 border border-purple-900/20 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Flame className="w-4 h-4 text-emerald-300 animate-spin" />
                  <span>Summoning Nemotron...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Summon the Ghost</span>
                  <CornerDownLeft className="w-3.5 h-3.5 opacity-60 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
