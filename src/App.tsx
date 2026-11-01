import { useState } from 'react';
import { Header } from './components/Header';
import { GhostVisual, GhostState } from './components/GhostVisual';
import { TerminalInput } from './components/TerminalInput';
import { SpookyOutput } from './components/SpookyOutput';
import { GraveyardError } from './components/GraveyardError';
import { Footer } from './components/Footer';

interface SpookyResult {
  spookyMessage: string;
  originalMessage: string;
  model: string;
}

export function App() {
  const [commitMessage, setCommitMessage] = useState<string>('Fixed authentication bug');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpookyResult | null>(null);
  const [ghostState, setGhostState] = useState<GhostState>('idle');

  const handleSummon = async () => {
    const trimmed = commitMessage.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGhostState('summoning');

    try {
      const response = await fetch('/api/ghost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commitMessage: trimmed }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMsg = data.error || `The spirits could not be reached (HTTP ${response.status})`;
        setError(errorMsg);
        setGhostState('error');
      } else {
        setResult(data);
        setGhostState('revealed');
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Failed to contact the ethereal realm. Network connection lost.';
      setError(errorMsg);
      setGhostState('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGhostPoke = () => {
    if (!isLoading) {
      // Toggle a playful reaction
      if (ghostState === 'idle') {
        setGhostState('revealed');
        setTimeout(() => setGhostState('idle'), 1500);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Ectoplasmic Wisps */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[36rem] h-64 bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 container mx-auto px-4 py-6 flex-1 flex flex-col items-center">
        <Header />

        <div className="w-full max-w-3xl flex flex-col items-center my-4 space-y-6">
          {/* Animated Ghost Visual Mascot */}
          <GhostVisual state={ghostState} onClick={handleGhostPoke} />

          {/* Terminal Commit Input Area */}
          <TerminalInput
            commitMessage={commitMessage}
            setCommitMessage={setCommitMessage}
            onSummon={handleSummon}
            isLoading={isLoading}
          />

          {/* Error Banner (Never silent) */}
          {error && <GraveyardError error={error} onRetry={handleSummon} />}

          {/* Spooky AI Output Card */}
          {result && !error && (
            <SpookyOutput
              originalMessage={result.originalMessage}
              spookyMessage={result.spookyMessage}
              model={result.model}
            />
          )}
        </div>
      </main>

      {/* Atmospheric Footer */}
      <Footer />
    </div>
  );
}

export default App;
