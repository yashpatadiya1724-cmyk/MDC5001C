import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Puzzle {
  id: number;
  question: string;
  nItems: number;
  kBoxes: number;
  targetCount: number;
  type: 'calc-occupancy' | 'calc-min-items';
  options: number[];
  correctAnswer: number;
  formulaLatex: string;
  explanation: string;
}

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    question: 'In an MSc lecture class of 38 students, what is the guaranteed minimum number of students who were born in the same calendar month?',
    nItems: 38,
    kBoxes: 12,
    targetCount: 4,
    type: 'calc-occupancy',
    options: [3, 4, 5, 2],
    correctAnswer: 4,
    formulaLatex: '\\lceil 38 / 12 \\rceil = \\lceil 3.167 \\rceil = 4',
    explanation: 'There are 12 months in a year (k = 12). By the generalized Pigeonhole Principle, at least one month must have ceil(38 / 12) = ceil(3.167) = 4 students.'
  },
  {
    id: 2,
    question: 'How many students must be enrolled in a university course to guarantee that at least 6 students receive the exact same final grade, from possible grades {A, B, C, D, F}?',
    nItems: 26,
    kBoxes: 5,
    targetCount: 6,
    type: 'calc-min-items',
    options: [25, 26, 30, 31],
    correctAnswer: 26,
    formulaLatex: 'N = k(m - 1) + 1 = 5(6 - 1) + 1 = 26',
    explanation: 'There are k = 5 grade categories. In the worst case, each grade is given to 5 students (5 * 5 = 25). The 26th student forces one grade to reach 6 students.'
  },
  {
    id: 3,
    question: 'A bag contains 15 blue marbles, 12 red marbles, and 10 yellow marbles. In complete darkness, what is the minimum number of marbles you must pick to guarantee at least one matching pair of the same color?',
    nItems: 4,
    kBoxes: 3,
    targetCount: 2,
    type: 'calc-min-items',
    options: [3, 4, 5, 11],
    correctAnswer: 4,
    formulaLatex: 'k + 1 = 3 + 1 = 4',
    explanation: 'There are k = 3 colors. If you pick 3 marbles, they could all be distinct colors (1 blue, 1 red, 1 yellow). The 4th marble guarantees a duplicate color.'
  },
  {
    id: 4,
    question: '50 computer servers are distributed across 7 server racks in a datacenter. What is the guaranteed minimum number of servers in the most loaded rack?',
    nItems: 50,
    kBoxes: 7,
    targetCount: 8,
    type: 'calc-occupancy',
    options: [7, 8, 9, 10],
    correctAnswer: 8,
    formulaLatex: '\\lceil 50 / 7 \\rceil = \\lceil 7.14 \\rceil = 8',
    explanation: 'Ceiling of 50 / 7 = ceil(7.14) = 8 servers guaranteed in the fullest rack.'
  }
];

export const PigeonholePuzzleGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const puzzle = PUZZLES[currentIndex];

  const handleSelect = (val: number) => {
    if (isAnswered) return;
    setSelectedAnswer(val);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === puzzle.correctAnswer) {
      setScore(s => {
        const next = s + 25;
        onScoreUpdate(next);
        return next;
      });
      if (currentIndex === PUZZLES.length - 1) {
        confetti({ particleCount: 60, spread: 60 });
      }
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIndex < PUZZLES.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 rounded-xl transition min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" /> <span>Back</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
            {currentIndex + 1} / {PUZZLES.length}
          </span>
          <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span>{score}</span>
          </div>
          <button
            onClick={handleRestart}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Restart"
            aria-label="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {completed ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center space-y-4">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-200">Pigeonhole Master!</h3>
          <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
            You solved all collision puzzles and scored <strong>{score}</strong> points.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm min-h-[44px]"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm min-h-[44px]"
            >
              Back to Games
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Pigeonhole Principle Challenge
            </span>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {puzzle.question}
            </p>
          </div>

          {/* Visual container representation with smooth touch scrolling */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto scrollbar-none py-4">
            {Array.from({ length: Math.min(puzzle.kBoxes, 7) }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-11 h-12 sm:w-12 sm:h-14 border-2 border-dashed border-indigo-400 dark:border-indigo-600 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  Box {i + 1}
                </div>
              </div>
            ))}
            {puzzle.kBoxes > 7 && (
              <span className="text-xs font-bold text-slate-400 shrink-0 pl-1">+{puzzle.kBoxes - 7} more</span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {puzzle.options.map(opt => (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`py-3 px-3 rounded-xl font-bold text-sm sm:text-base border-2 transition min-h-[48px] ${
                  selectedAnswer === opt
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
              disabled={selectedAnswer === null}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md shadow-indigo-500/20 text-xs sm:text-sm min-h-[44px]"
            >
              Verify Deduction
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-3.5 sm:p-4 rounded-xl border ${
                selectedAnswer === puzzle.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1 text-xs sm:text-sm">
                  {selectedAnswer === puzzle.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Correct Deduction! (+25 points)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>Incorrect. Correct answer is {puzzle.correctAnswer}</span>
                    </>
                  )}
                </div>
                <div className="my-2 overflow-x-auto scrollbar-none">
                  <MathView math={puzzle.formulaLatex} block />
                </div>
                <p className="text-xs sm:text-sm mt-1">{puzzle.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition hover:opacity-90 min-h-[44px]"
              >
                {currentIndex < PUZZLES.length - 1 ? 'Next Puzzle →' : 'Complete Challenge'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
