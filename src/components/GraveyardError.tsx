import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, KeyRound, Skull } from 'lucide-react';

interface GraveyardErrorProps {
  error: string;
  onRetry: () => void;
}

export const GraveyardError: React.FC<GraveyardErrorProps> = ({ error, onRetry }) => {
  const isTokenMissing =
    error.toLowerCase().includes('openrouter_api_key') ||
    error.toLowerCase().includes('hf_token') ||
    error.toLowerCase().includes('token is not configured') ||
    error.toLowerCase().includes('key is not configured') ||
    error.toLowerCase().includes('not configured');
  const isAuthFailure = error.toLowerCase().includes('authentication') || error.toLowerCase().includes('invalid');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="w-full max-w-2xl mx-auto mt-6"
    >
      <div className="rounded-xl border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-spooky-950/90 p-5 shadow-lg shadow-rose-950/30 backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-rose-900/40 border border-rose-700/50 text-rose-400 shrink-0">
            {isTokenMissing ? (
              <KeyRound className="w-5 h-5 text-rose-400" />
            ) : (
              <Skull className="w-5 h-5 text-rose-400" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-rose-200 font-mono flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                The Summoning Ritual Failed
              </h4>
            </div>

            <p className="text-xs sm:text-sm font-mono text-rose-300/90 leading-relaxed bg-spooky-950/80 p-3 rounded-lg border border-rose-900/40 break-words">
              {error}
            </p>

            {isTokenMissing && (
              <div className="text-xs font-mono text-slate-400 bg-spooky-900/70 p-3 rounded-lg border border-purple-900/30 space-y-1">
                <p className="text-purple-300 font-semibold">How to configure your API Key:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>Get a free OpenRouter API key at <code className="text-emerald-400">openrouter.ai/keys</code></li>
                  <li>Copy <code className="text-emerald-400">.env.example</code> to <code className="text-emerald-400">.env</code></li>
                  <li>Add <code className="text-emerald-400">OPENROUTER_API_KEY=sk-or-v1-your_token</code></li>
                  <li>Restart the local dev server</li>
                </ol>
              </div>
            )}

            {isAuthFailure && !isTokenMissing && (
              <p className="text-xs font-mono text-slate-400">
                Please verify that your OpenRouter API key is valid and configured in .env.
              </p>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onRetry}
                className="px-4 py-1.5 rounded-lg font-mono text-xs font-medium flex items-center gap-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-800/60 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Summoning</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
