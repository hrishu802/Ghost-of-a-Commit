import React from 'react';
import { Ghost, Sparkles, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-3xl mx-auto pt-6 pb-4 text-center select-none">
      {/* Challenge Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono mb-4 shadow-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-semibold text-emerald-400">Hacktoberfest 2026</span>
        <span className="text-purple-400/60">&bull;</span>
        <span>Week 4: Ghost in the Machine</span>
      </div>

      {/* Main App Title */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <Ghost className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 glow-purple" />
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-wider bg-gradient-to-r from-purple-200 via-emerald-300 to-purple-400 bg-clip-text text-transparent filter drop-shadow">
          Ghost of a Commit
        </h1>
        <Ghost className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 glow-green transform scale-x-[-1]" />
      </div>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed px-4">
        Transform ordinary mortal Git commit messages into cryptic, humorous,
        Halloween-themed whispers from an ancient spirit haunting your repository.
      </p>

      {/* Tech badges pill */}
      <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1 text-purple-300/80">
          <Terminal className="w-3 h-3 text-purple-400" />
          Powered by NVIDIA Nemotron (3.5 Lightning)
        </span>
        <span className="text-slate-700">&bull;</span>
        <span className="flex items-center gap-1 text-emerald-300/80">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          OpenRouter Free Open-Weights API
        </span>
      </div>
    </header>
  );
};
