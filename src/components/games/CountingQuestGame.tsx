import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestLevel {
  id: number;
  title: string;
  scenario: string;
  rule: 'Multiplication' | 'Addition' | 'Hybrid';
  options: number[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUEST_LEVELS: QuestLevel[] = [
  {
    id: 1,
    title: 'Wardrobe Combination',
    scenario: 'A student has 4 different shirts, 3 pairs of jeans, and 2 pairs of sneakers. How many unique daily outfits can be created if an outfit consists of 1 shirt, 1 pair of jeans, and 1 pair of sneakers?',
    rule: 'Multiplication',
    options: [9, 14, 24, 36],
    correctAnswer: 24,
    hint: 'Since choices are sequential and combined (shirt AND jeans AND sneakers), use the Multiplication Rule.',
    explanation: 'Multiply the options for each stage: 4 * 3 * 2 = 24 unique outfits.'
  },
  {
    id: 2,
    title: 'Bank ATM PIN Code',
    scenario: 'A bank requires a 4-digit numeric PIN. If the first digit CANNOT be 0, and no digit may be repeated, how many valid PIN codes can be formed?',
    rule: 'Multiplication',
    options: [4536, 5040, 9000, 10000],
    correctAnswer: 4536,
    hint: 'First digit has 9 choices (1-9). Second digit has 9 choices (0 is now allowed, minus the first digit). Third has 8, fourth has 7.',
    explanation: 'Slots: 9 * 9 * 8 * 7 = 4,536 valid PIN codes.'
  },
  {
    id: 3,
    title: 'Campus Course Selection',
    scenario: 'An MSc student must choose 1 elective. There are 5 Cloud Computing electives, 4 AI electives, and 3 Cyber Security electives. No course overlaps. In how many ways can the student choose 1 course?',
    rule: 'Addition',
    options: [60, 12, 15, 23],
    correctAnswer: 12,
    hint: 'The student chooses Cloud OR AI OR Cyber. For mutually exclusive OR choices, apply the Addition Rule.',
    explanation: 'Addition Rule: 5 + 4 + 3 = 12 total elective choices.'
  },
  {
    id: 4,
    title: 'State License Plate Registry',
    scenario: 'A state issues vehicle plates consisting of 3 uppercase letters followed by 3 digits (0-9). If letters cannot repeat, but digits CAN repeat, how many distinct plates can be registered?',
    rule: 'Hybrid',
    options: [15600000, 17576000, 11232000, 1560000],
    correctAnswer: 15600000,
    hint: 'Letters part: P(26, 3) = 26 * 25 * 24 = 15,600. Digits part: 10 * 10 * 10 = 1,000.',
    explanation: 'Letters without repetition = 26 * 25 * 24 = 15,600. Digits with repetition = 10^3 = 1,000. Combined total = 15,600 * 1,000 = 15,600,000 plates.'
  }
];

export const CountingQuestGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quest = QUEST_LEVELS[currentLevel];

  const handleSelect = (val: number) => {
    if (isAnswered) return;
    setSelectedOption(val);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === quest.correctAnswer) {
      const bonus = showHint ? 15 : 25;
      setScore(s => {
        const next = s + bonus;
        onScoreUpdate(next);
        return next;
      });
      if (currentLevel === QUEST_LEVELS.length - 1) {
        confetti({ particleCount: 70, spread: 70 });
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowHint(false);
    setIsAnswered(false);
    if (currentLevel < QUEST_LEVELS.length - 1) {
      setCurrentLevel(l => l + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentLevel(0);
    setSelectedOption(null);
    setShowHint(false);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
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
            {currentLevel + 1} / {QUEST_LEVELS.length}
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

      {finished ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center space-y-4">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-200">Quest Completed!</h3>
          <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
            You solved all counting adventures and amassed <strong>{score}</strong> points!
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
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{quest.title}</span>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                Rule: {quest.rule}
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {quest.scenario}
            </p>
          </div>

          {/* Hint button */}
          <div>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 hover:underline py-1"
              >
                <Lightbulb className="w-3.5 h-3.5" /> Need a rule hint?
              </button>
            ) : (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{quest.hint}</span>
              </div>
            )}
          </div>

          {/* Choices */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {quest.options.map((opt) => (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`p-3 sm:p-4 rounded-xl font-bold text-center text-xs sm:text-sm md:text-base border-2 transition min-h-[48px] ${
                  selectedOption === opt
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-400/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                {opt.toLocaleString()}
              </button>
            ))}
          </div>

          {!isAnswered ? (
            <button
              onClick={handleVerify}
              disabled={selectedOption === null}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md shadow-indigo-500/20 text-xs sm:text-sm min-h-[44px]"
            >
              Confirm Answer
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-3.5 sm:p-4 rounded-xl border ${
                selectedOption === quest.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1 text-xs sm:text-sm">
                  {selectedOption === quest.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Correct! +{showHint ? 15 : 25} points</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>Not quite. Correct answer: {quest.correctAnswer.toLocaleString()}</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm mt-1">{quest.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl transition hover:opacity-90 min-h-[44px]"
              >
                {currentLevel < QUEST_LEVELS.length - 1 ? 'Next Quest →' : 'Finish Adventure'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
