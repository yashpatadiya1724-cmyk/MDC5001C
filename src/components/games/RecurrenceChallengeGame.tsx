import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RecurrenceProblem {
  id: number;
  name: string;
  ruleLatex: string;
  initialTerms: number[];
  targetIndexName: string;
  options: number[];
  correctAnswer: number;
  explanation: string;
}

const RECURRENCE_PROBLEMS: RecurrenceProblem[] = [
  {
    id: 1,
    name: 'Fibonacci Sequence',
    ruleLatex: 'F_n = F_{n-1} + F_{n-2} \\quad (F_0 = 0, F_1 = 1)',
    initialTerms: [0, 1, 1, 2, 3, 5, 8],
    targetIndexName: 'F(7)',
    options: [11, 13, 15, 21],
    correctAnswer: 13,
    explanation: 'F(7) = F(6) + F(5) = 8 + 5 = 13.'
  },
  {
    id: 2,
    name: 'Towers of Hanoi Moves',
    ruleLatex: 'T_n = 2 T_{n-1} + 1 \\quad (T_1 = 1)',
    initialTerms: [1, 3, 7, 15],
    targetIndexName: 'T(5)',
    options: [25, 30, 31, 32],
    correctAnswer: 31,
    explanation: 'T(5) = 2 * T(4) + 1 = 2 * 15 + 1 = 31 (Notice T_n = 2^n - 1).'
  },
  {
    id: 3,
    name: 'Factorial Recurrence',
    ruleLatex: 'F_n = n \\times F_{n-1} \\quad (F_0 = 1)',
    initialTerms: [1, 1, 2, 6, 24],
    targetIndexName: 'F(5) = 5!',
    options: [96, 120, 100, 720],
    correctAnswer: 120,
    explanation: 'F(5) = 5 * F(4) = 5 * 24 = 120.'
  },
  {
    id: 4,
    name: 'Second-Order Linear Recurrence',
    ruleLatex: 'a_n = 2 a_{n-1} + 3 a_{n-2} \\quad (a_0 = 1, a_1 = 2)',
    initialTerms: [1, 2, 7, 20],
    targetIndexName: 'a(4)',
    options: [61, 58, 67, 54],
    correctAnswer: 61,
    explanation: 'a(4) = 2 * a(3) + 3 * a(2) = 2 * 20 + 3 * 7 = 40 + 21 = 61.'
  }
];

export const RecurrenceChallengeGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const problem = RECURRENCE_PROBLEMS[currentIdx];

  const handleSelect = (val: number) => {
    if (isAnswered) return;
    setSelectedAns(val);
  };

  const handleCheck = () => {
    if (selectedAns === null) return;
    setIsAnswered(true);
    if (selectedAns === problem.correctAnswer) {
      setScore(s => {
        const next = s + 25;
        onScoreUpdate(next);
        return next;
      });
      if (currentIdx === RECURRENCE_PROBLEMS.length - 1) {
        confetti({ particleCount: 70, spread: 70 });
      }
    }
  };

  const handleNext = () => {
    setSelectedAns(null);
    setIsAnswered(false);
    if (currentIdx < RECURRENCE_PROBLEMS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAns(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 rounded-xl transition min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" /> <span>Back</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
            Seq {currentIdx + 1}/{RECURRENCE_PROBLEMS.length}
          </span>
          <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {score}
          </div>
          <button
            onClick={handleRestart}
            aria-label="Restart Challenge"
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {completed ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 p-5 sm:p-8 rounded-2xl text-center space-y-4">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-200">Sequence Champion!</h3>
          <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
            You calculated recurrence steps accurately and earned <strong>{score}</strong> points.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm min-h-[44px]"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm min-h-[44px]"
            >
              Back to Games
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {problem.name}
            </span>
            <div className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
              Recurrence Rule:
            </div>
            <div className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-indigo-950 dark:text-indigo-200 font-medium overflow-x-auto scrollbar-none">
              <MathView math={problem.ruleLatex} block />
            </div>
          </div>

          {/* Sequence Stream */}
          <div className="space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Sequence Progression</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 py-1 sm:py-2">
              {problem.initialTerms.map((t, i) => (
                <div
                  key={i}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {t}
                </div>
              ))}
              <div className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border-2 border-dashed border-indigo-500 font-mono font-bold text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 animate-pulse">
                {problem.targetIndexName} = ?
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {problem.options.map(opt => (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`min-h-[48px] py-3 px-3 sm:px-4 rounded-xl font-bold text-sm sm:text-base border-2 transition active:scale-[0.98] ${
                  selectedAns === opt
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-400/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {!isAnswered ? (
            <button
              onClick={handleCheck}
              disabled={selectedAns === null}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md shadow-indigo-500/20 min-h-[48px] active:scale-[0.99]"
            >
              Verify Next Term
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-3.5 sm:p-4 rounded-xl border ${
                selectedAns === problem.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1 text-sm sm:text-base">
                  {selectedAns === problem.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Correct Step! (+25 points)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>Incorrect. The next term is {problem.correctAnswer}</span>
                    </>
                  )}
                </div>
                <p className="text-xs md:text-sm mt-1">{problem.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition hover:opacity-90 min-h-[48px] active:scale-[0.99]"
              >
                {currentIdx < RECURRENCE_PROBLEMS.length - 1 ? 'Next Sequence →' : 'Complete Challenge'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
