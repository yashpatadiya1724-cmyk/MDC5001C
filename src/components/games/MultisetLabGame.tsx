import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, Shuffle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WordChallenge {
  word: string;
  letters: string[];
  frequencies: Record<string, number>;
  totalPermutations: number;
  formulaLatex: string;
}

const WORDS: WordChallenge[] = [
  {
    word: 'AABBC',
    letters: ['A', 'A', 'B', 'B', 'C'],
    frequencies: { A: 2, B: 2, C: 1 },
    totalPermutations: 30, // 5! / (2! * 2! * 1!) = 120 / 4 = 30
    formulaLatex: '\\frac{5!}{2! \\times 2! \\times 1!} = \\frac{120}{4} = 30'
  },
  {
    word: 'BANANA',
    letters: ['B', 'A', 'N', 'A', 'N', 'A'],
    frequencies: { B: 1, A: 3, N: 2 },
    totalPermutations: 60, // 6! / (1! * 3! * 2!) = 720 / 12 = 60
    formulaLatex: '\\frac{6!}{1! \\times 3! \\times 2!} = \\frac{720}{12} = 60'
  },
  {
    word: 'LEVEL',
    letters: ['L', 'E', 'V', 'E', 'L'],
    frequencies: { L: 2, E: 2, V: 1 },
    totalPermutations: 30, // 5! / (2! * 2!) = 30
    formulaLatex: '\\frac{5!}{2! \\times 2! \\times 1!} = 30'
  }
];

export const MultisetLabGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const challenge = WORDS[activeWordIdx];

  const [currentSlots, setCurrentSlots] = useState<string[]>([...challenge.letters]);
  const [createdAnagrams, setCreatedAnagrams] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleSwap = (i: number, j: number) => {
    const next = [...currentSlots];
    const temp = next[i];
    next[i] = next[j];
    next[j] = temp;
    setCurrentSlots(next);
  };

  const handleShuffle = () => {
    const shuffled = [...currentSlots].sort(() => Math.random() - 0.5);
    setCurrentSlots(shuffled);
  };

  const handleSaveArrangement = () => {
    const formed = currentSlots.join('');
    if (createdAnagrams.includes(formed)) {
      setStatusMessage(`"${formed}" was already registered in your lab notebook!`);
    } else {
      const next = [...createdAnagrams, formed];
      setCreatedAnagrams(next);
      setScore(s => {
        const updated = s + 10;
        onScoreUpdate(updated);
        return updated;
      });
      setStatusMessage(`Registered new distinct permutation: "${formed}"!`);
      if (next.length === 5 || next.length === challenge.totalPermutations) {
        confetti({ particleCount: 50, spread: 50 });
      }
    }
  };

  const handleSwitchWord = (idx: number) => {
    setActiveWordIdx(idx);
    setCurrentSlots([...WORDS[idx].letters]);
    setCreatedAnagrams([]);
    setStatusMessage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-4 h-4" /> Score: {score}
          </div>
          <button
            onClick={() => {
              setCreatedAnagrams([]);
              setStatusMessage(null);
            }}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Reset notebook"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Multiset Permutation Lab
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Target Multiset: {challenge.word}
            </h3>
          </div>

          <div className="flex gap-2">
            {WORDS.map((w, idx) => (
              <button
                key={w.word}
                onClick={() => handleSwitchWord(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  activeWordIdx === idx
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {w.word}
              </button>
            ))}
          </div>
        </div>

        {/* Formula Breakdown Banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Theoretical Permutations Formula:</span>
            <div className="text-slate-500">
              Identical letters are indistinguishable: swapping two identical letters yields the exact same word!
            </div>
          </div>
          <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            <MathView math={challenge.formulaLatex} />
          </div>
        </div>

        {/* Interactive Letter Slots */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            Click any two adjacent letters to swap them:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-4">
            {currentSlots.map((ch, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-12 h-14 md:w-14 md:h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl md:text-2xl flex items-center justify-center shadow-md select-none">
                  {ch}
                </div>
                {idx < currentSlots.length - 1 && (
                  <button
                    onClick={() => handleSwap(idx, idx + 1)}
                    className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-slate-500 hover:text-indigo-600 transition"
                    title={`Swap ${ch} and ${currentSlots[idx + 1]}`}
                  >
                    ⇄
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSaveArrangement}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
          >
            <Sparkles className="w-4 h-4" /> Register Arrangement "{currentSlots.join('')}"
          </button>
          <button
            onClick={handleShuffle}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition text-sm flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" /> Shuffle
          </button>
        </div>

        {/* Feedback Message */}
        {statusMessage && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-xs font-semibold text-indigo-800 dark:text-indigo-300 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Lab Notebook Log */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
            <span>DISCOVERED PERMUTATIONS ({createdAnagrams.length} / {challenge.totalPermutations})</span>
          </div>
          {createdAnagrams.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No permutations saved yet. Swap letters and hit "Register Arrangement"!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {createdAnagrams.map((wrd, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                >
                  {wrd}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
