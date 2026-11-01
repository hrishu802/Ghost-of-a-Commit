import React from 'react';
import { Skull, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto mt-16 pt-8 pb-10 border-t border-purple-950/80 text-center text-xs font-mono text-slate-500 space-y-3 px-4 select-none">
      <div className="flex items-center justify-center gap-1.5 text-slate-400">
        <span>Conjured with</span>
        <Skull className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span>and</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>for DEV Hacktoberfest 2026</span>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap text-[11px] text-slate-500">
        <span className="flex items-center gap-1 text-emerald-400/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Server-side Token Security (Vercel Serverless)
        </span>
        <span className="text-slate-800">&bull;</span>
        <span className="flex items-center gap-1 text-purple-400/80">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Model: nvidia/nemotron-3.5-lightning:free
        </span>
      </div>

      <p className="text-[11px] text-slate-600">
        May your branches never conflict and your spirits rest peacefully in git history.
      </p>
    </footer>
  );
};
