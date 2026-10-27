import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TermSlot {
  k: number;
  coeff: number;
  selectedCoeff: number | null;
  sign: '+' | '-';
  xPower: number;
  yPower: number;
  expression: string;
}

const EXPANSION_CHALLENGES = [
  {
    id: 1,
    title: 'Expand (x + y)³',
    n: 3,
    binomialText: '(x + y)^3',
    pascalRow: [1, 3, 3, 1],
    terms: [
      { k: 0, coeff: 1, sign: '+', xPower: 3, yPower: 0, text: 'x^3' },
      { k: 1, coeff: 3, sign: '+', xPower: 2, yPower: 1, text: '3x^2y' },
      { k: 2, coeff: 3, sign: '+', xPower: 1, yPower: 2, text: '3xy^2' },
      { k: 3, coeff: 1, sign: '+', xPower: 0, yPower: 3, text: 'y^3' }
    ],
    fullLatex: '(x+y)^3 = x^3 + 3x^2 y + 3xy^2 + y^3'
  },
  {
    id: 2,
    title: 'Expand (x + 2)⁴',
    n: 4,
    binomialText: '(x + 2)^4',
    pascalRow: [1, 4, 6, 4, 1],
    terms: [
      { k: 0, coeff: 1, sign: '+', xPower: 4, yPower: 0, text: 'x^4' }, // 1 * 1 = 1
      { k: 1, coeff: 8, sign: '+', xPower: 3, yPower: 1, text: '8x^3' }, // 4 * 2 = 8
      { k: 2, coeff: 24, sign: '+', xPower: 2, yPower: 2, text: '24x^2' }, // 6 * 4 = 24
      { k: 3, coeff: 32, sign: '+', xPower: 1, yPower: 3, text: '32x' }, // 4 * 8 = 32
      { k: 4, coeff: 16, sign: '+', xPower: 0, yPower: 4, text: '16' } // 1 * 16 = 16
    ],
    fullLatex: '(x+2)^4 = x^4 + 8x^3 + 24x^2 + 32x + 16'
  }
];

export const BinomialBuilderGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [currentK, setCurrentK] = useState(0);
  const [placedTerms, setPlacedTerms] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const challenge = EXPANSION_CHALLENGES[challengeIdx];
  const targetTerm = challenge.terms[currentK];

  // Generate 4 candidate coefficients for targetTerm
  const candidateOptions = [
    targetTerm.coeff,
    targetTerm.coeff + 2,
    Math.max(1, targetTerm.coeff - 2),
    targetTerm.coeff * 2
  ].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5);

  const handlePickCoeff = (c: number) => {
    if (c === targetTerm.coeff) {
      const nextPlaced = [...placedTerms, c];
      setPlacedTerms(nextPlaced);
      setScore(s => {
        const next = s + 20;
        onScoreUpdate(next);
        return next;
      });

      if (currentK < challenge.terms.length - 1) {
        setCurrentK(k => k + 1);
      } else {
        // Round done
        if (challengeIdx < EXPANSION_CHALLENGES.length - 1) {
          setTimeout(() => {
            setChallengeIdx(ci => ci + 1);
            setCurrentK(0);
            setPlacedTerms([]);
          }, 1200);
        } else {
          setCompleted(true);
          confetti({ particleCount: 70, spread: 70 });
        }
      }
    }
  };

  const handleRestart = () => {
    setChallengeIdx(0);
    setCurrentK(0);
    setPlacedTerms([]);
    setScore(0);
    setCompleted(false);
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

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
            Challenge {challengeIdx + 1} of {EXPANSION_CHALLENGES.length}
          </span>
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-4 h-4" /> Score: {score}
          </div>
          <button
            onClick={handleRestart}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {completed ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 p-8 rounded-2xl text-center space-y-4">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">Binomial Architect!</h3>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            You successfully assembled full polynomial expansions with Pascal coefficients and scored <strong>{score}</strong> points.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm"
            >
              Back to Games
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {challenge.title}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Pascal Row {challenge.n}: [{challenge.pascalRow.join(', ')}]
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select the correct coefficient for term <strong>k = {currentK}</strong> (power of x: {targetTerm.xPower}).
            </p>
          </div>

          {/* Builder Equation Display */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-center space-y-2 text-indigo-950 dark:text-indigo-200 font-medium">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target Expression</div>
            <MathView math={`\\text{Expand } ${challenge.binomialText}`} block />
            
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {challenge.terms.map((t, idx) => {
                const isFilled = idx < placedTerms.length;
                const isCurrent = idx === currentK;

                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="font-bold text-slate-400">+</span>}
                    <div
                      className={`px-3 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition border ${
                        isFilled
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                          : isCurrent
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-700 dark:text-indigo-200 animate-pulse'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                      }`}
                    >
                      {isFilled ? t.text : `[ ? ] · x^${t.xPower}`}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Term Builder Choice Buttons */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Pick the correct coefficient for term k = {currentK}:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {candidateOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handlePickCoeff(opt)}
                  className="py-3 px-4 rounded-xl font-bold text-base border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 transition active:scale-95 shadow-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
