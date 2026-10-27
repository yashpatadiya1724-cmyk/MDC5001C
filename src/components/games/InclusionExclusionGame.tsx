import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VennScenario {
  id: number;
  title: string;
  problem: string;
  setA: { name: string; size: number };
  setB: { name: string; size: number };
  setC?: { name: string; size: number };
  overlapAB: number;
  overlapAC?: number;
  overlapBC?: number;
  overlapABC?: number;
  targetQuestion: string;
  correctAnswer: number;
  options: number[];
  formulaLatex: string;
  stepExplanation: string;
}

const VENN_SCENARIOS: VennScenario[] = [
  {
    id: 1,
    title: 'Two-Set Club Membership',
    problem: 'In a college batch of 80 students, 45 belong to the Coding Club (A) and 35 belong to the Robotics Club (B). 15 students belong to both clubs.',
    setA: { name: 'Coding (A)', size: 45 },
    setB: { name: 'Robotics (B)', size: 35 },
    overlapAB: 15,
    targetQuestion: 'How many students belong to AT LEAST ONE club (|A ∪ B|)?',
    correctAnswer: 65,
    options: [65, 80, 50, 95],
    formulaLatex: '|A \\cup B| = 45 + 35 - 15 = 65',
    stepExplanation: 'Add individual clubs and subtract the 15 double-counted students: 45 + 35 - 15 = 65 students.'
  },
  {
    id: 2,
    title: 'Number Divisibility (1 to 100)',
    problem: 'Consider all integers from 1 to 100 inclusive. Let A be the set of integers divisible by 4, and B be integers divisible by 6.',
    setA: { name: 'Div by 4', size: 25 },
    setB: { name: 'Div by 6', size: 16 },
    overlapAB: 8, // Div by LCM(4,6) = 12: floor(100/12) = 8
    targetQuestion: 'How many integers between 1 and 100 are divisible by 4 OR 6?',
    correctAnswer: 33,
    options: [33, 41, 30, 25],
    formulaLatex: '|A \\cup B| = 25 + 16 - 8 = 33',
    stepExplanation: 'Numbers div by 4 = 25. Numbers div by 6 = 16. Numbers div by LCM(4,6)=12 is floor(100/12) = 8. Union = 25 + 16 - 8 = 33.'
  },
  {
    id: 3,
    title: 'Three-Set Language Survey',
    problem: 'A survey of 100 tech employees reveals: 50 know Python, 40 know Java, 30 know C++. 15 know Python & Java, 10 know Java & C++, 12 know Python & C++, and 5 know all three.',
    setA: { name: 'Python (P)', size: 50 },
    setB: { name: 'Java (J)', size: 40 },
    setC: { name: 'C++ (C)', size: 30 },
    overlapAB: 15,
    overlapAC: 12,
    overlapBC: 10,
    overlapABC: 5,
    targetQuestion: 'How many employees know AT LEAST ONE of these three languages (|P ∪ J ∪ C|)?',
    correctAnswer: 88,
    options: [88, 93, 83, 75],
    formulaLatex: '|P \\cup J \\cup C| = (50+40+30) - (15+10+12) + 5 = 120 - 37 + 5 = 88',
    stepExplanation: 'Sum singles (120) - sum pairwise intersections (37) + triple intersection (5) = 88 employees.'
  }
];

export const InclusionExclusionGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = VENN_SCENARIOS[currentIdx];

  const handleSelect = (ans: number) => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === scenario.correctAnswer) {
      setScore(s => {
        const next = s + 30;
        onScoreUpdate(next);
        return next;
      });
      if (currentIdx === VENN_SCENARIOS.length - 1) {
        confetti({ particleCount: 70, spread: 70 });
      }
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentIdx < VENN_SCENARIOS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
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
            Scenario {currentIdx + 1} of {VENN_SCENARIOS.length}
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
          <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">Venn Master!</h3>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            You solved all overlapping set challenges and scored <strong>{score}</strong> points.
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
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {scenario.title}
            </span>
            <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
              {scenario.problem}
            </p>
            <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-xl font-bold text-slate-900 dark:text-white text-sm">
              {scenario.targetQuestion}
            </div>
          </div>

          {/* Simple Visual Venn Representation */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
              <span>{scenario.setA.name}: {scenario.setA.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
              <span>{scenario.setB.name}: {scenario.setB.size}</span>
            </div>
            {scenario.setC && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>{scenario.setC.name}: {scenario.setC.size}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <span>Overlap AB: {scenario.overlapAB}</span>
            </div>
            {scenario.overlapABC !== undefined && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <span>Overlap ABC: {scenario.overlapABC}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {scenario.options.map(opt => (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`py-3 px-4 rounded-xl font-bold text-base border-2 transition ${
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
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md shadow-indigo-500/20"
            >
              Verify Calculation
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-4 rounded-xl border ${
                selectedAnswer === scenario.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selectedAnswer === scenario.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Spot on! (+30 points)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Incorrect. The answer is {scenario.correctAnswer}</span>
                    </>
                  )}
                </div>
                <div className="my-2">
                  <MathView math={scenario.formulaLatex} block />
                </div>
                <p className="text-xs md:text-sm mt-1">{scenario.stepExplanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition hover:opacity-90"
              >
                {currentIdx < VENN_SCENARIOS.length - 1 ? 'Next Scenario →' : 'Finish Challenge'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
