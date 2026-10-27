import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Scenario {
  id: number;
  story: string;
  n: number;
  r: number;
  orderMatters: boolean;
  correctFormula: 'P' | 'C';
  calculatedAnswer: number;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    story: 'Awarding 1st place, 2nd place, and 3rd place trophies to 8 sprinters in an athletics final.',
    n: 8,
    r: 3,
    orderMatters: true,
    correctFormula: 'P',
    calculatedAnswer: 336, // P(8,3) = 8*7*6 = 336
    explanation: 'The prizes are distinct (1st, 2nd, 3rd place). Since receiving 1st is different from 2nd, ORDER MATTERS. Use P(8, 3) = 8 * 7 * 6 = 336.'
  },
  {
    id: 2,
    story: 'Selecting a 4-person committee from a pool of 10 university professors with no distinct titles or ranks.',
    n: 10,
    r: 4,
    orderMatters: false,
    correctFormula: 'C',
    calculatedAnswer: 210, // C(10,4) = 210
    explanation: 'All 4 members have identical status on the committee. Selecting Alice then Bob is identical to selecting Bob then Alice. ORDER DOES NOT MATTER. Use C(10, 4) = 210.'
  },
  {
    id: 3,
    story: 'Creating a 3-character security passcode using distinct letters from {A, B, C, D, E}.',
    n: 5,
    r: 3,
    orderMatters: true,
    correctFormula: 'P',
    calculatedAnswer: 60, // P(5,3) = 5*4*3 = 60
    explanation: 'In passwords, passcode "ABC" is completely different from "CBA". Sequence is essential, so ORDER MATTERS. Use P(5, 3) = 60.'
  },
  {
    id: 4,
    story: 'Choosing 3 toppings for your pizza from 7 available vegetable toppings.',
    n: 7,
    r: 3,
    orderMatters: false,
    correctFormula: 'C',
    calculatedAnswer: 35, // C(7,3) = 35
    explanation: 'Putting olives first then mushrooms results in the exact same pizza as mushrooms then olives. ORDER DOES NOT MATTER. Use C(7, 3) = 35.'
  },
  {
    id: 5,
    story: 'Assigning a President, Vice President, and Secretary from a club of 12 students.',
    n: 12,
    r: 3,
    orderMatters: true,
    correctFormula: 'P',
    calculatedAnswer: 1320, // P(12,3) = 12*11*10 = 1320
    explanation: 'Each selected member occupies a unique office. Changing who gets which position creates a new officer team. ORDER MATTERS. Use P(12, 3) = 1,320.'
  },
  {
    id: 6,
    story: 'Dealing a 5-card poker hand from a standard 52-card deck.',
    n: 52,
    r: 5,
    orderMatters: false,
    correctFormula: 'C',
    calculatedAnswer: 2598960,
    explanation: 'In card games, the contents of your hand determine its value, not the order in which the cards were dealt. ORDER DOES NOT MATTER. Use C(52, 5).'
  }
];

export const PermVsCombGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userOrderChoice, setUserOrderChoice] = useState<boolean | null>(null);
  const [userFormulaChoice, setUserFormulaChoice] = useState<'P' | 'C' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  const scenario = SCENARIOS[currentIndex];

  const handleSubmit = () => {
    if (userOrderChoice === null || userFormulaChoice === null) return;
    setIsAnswerSubmitted(true);

    const isOrderCorrect = userOrderChoice === scenario.orderMatters;
    const isFormulaCorrect = userFormulaChoice === scenario.correctFormula;

    let points = 0;
    if (isOrderCorrect) points += 10;
    if (isFormulaCorrect) points += 15;

    setScore(s => {
      const updated = s + points;
      onScoreUpdate(updated);
      return updated;
    });

    if (isOrderCorrect && isFormulaCorrect && currentIndex === SCENARIOS.length - 1) {
      confetti({ particleCount: 60, spread: 60 });
    }
  };

  const handleNext = () => {
    setUserOrderChoice(null);
    setUserFormulaChoice(null);
    setIsAnswerSubmitted(false);
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setTotalCompleted(SCENARIOS.length);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserOrderChoice(null);
    setUserFormulaChoice(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setTotalCompleted(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
            Scenario {currentIndex + 1} of {SCENARIOS.length}
          </span>
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-4 h-4" /> Score: {score}
          </div>
          <button
            onClick={handleRestart}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {totalCompleted === SCENARIOS.length ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 p-8 rounded-2xl text-center space-y-4">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">Challenge Mastered!</h3>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            You successfully analyzed all scenarios and scored <strong>{score}</strong> points.
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
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Real-World Scenario</span>
            <p className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              "{scenario.story}"
            </p>
            <div className="flex gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
              <span>Pool Size: <strong>n = {scenario.n}</strong></span>
              <span>Selection: <strong>r = {scenario.r}</strong></span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Step 1: Does order matter? */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 space-y-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Step 1: Does order matter?</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={isAnswerSubmitted}
                  onClick={() => setUserOrderChoice(true)}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition border ${
                    userOrderChoice === true
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  Yes, Order Matters
                </button>
                <button
                  disabled={isAnswerSubmitted}
                  onClick={() => setUserOrderChoice(false)}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition border ${
                    userOrderChoice === false
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  No, Order Doesn't Matter
                </button>
              </div>
            </div>

            {/* Step 2: Which formula applies? */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 space-y-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Step 2: Choose the formula</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={isAnswerSubmitted}
                  onClick={() => setUserFormulaChoice('P')}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition border ${
                    userFormulaChoice === 'P'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  Permutation <MathView math={`P(${scenario.n}, ${scenario.r})`} />
                </button>
                <button
                  disabled={isAnswerSubmitted}
                  onClick={() => setUserFormulaChoice('C')}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition border ${
                    userFormulaChoice === 'C'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                  }`}
                >
                  Combination <MathView math={`C(${scenario.n}, ${scenario.r})`} />
                </button>
              </div>
            </div>
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={userOrderChoice === null || userFormulaChoice === null}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md shadow-indigo-500/20"
            >
              Check My Answer
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-4 rounded-xl border ${
                userOrderChoice === scenario.orderMatters && userFormulaChoice === scenario.correctFormula
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {userOrderChoice === scenario.orderMatters && userFormulaChoice === scenario.correctFormula ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Excellent! Both selections are correct (+25 points)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-600" />
                      <span>Review the reasoning below</span>
                    </>
                  )}
                </div>
                <p className="text-xs md:text-sm mt-1 leading-relaxed">{scenario.explanation}</p>
                <div className="mt-2 text-xs font-mono font-bold">
                  Calculation result: {scenario.calculatedAnswer.toLocaleString()} total ways
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition hover:opacity-90"
              >
                {currentIndex < SCENARIOS.length - 1 ? 'Next Scenario →' : 'View Final Score'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
