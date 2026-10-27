import React, { useState } from 'react';
import { GameScoreRecord } from '../types';
import { FormulaMatchGame } from '../components/games/FormulaMatchGame';
import { PermVsCombGame } from '../components/games/PermVsCombGame';
import { CountingQuestGame } from '../components/games/CountingQuestGame';
import { PigeonholePuzzleGame } from '../components/games/PigeonholePuzzleGame';
import { BinomialBuilderGame } from '../components/games/BinomialBuilderGame';
import { InclusionExclusionGame } from '../components/games/InclusionExclusionGame';
import { DerangementDeliveryGame } from '../components/games/DerangementDeliveryGame';
import { MultisetLabGame } from '../components/games/MultisetLabGame';
import { PartitionBuilderGame } from '../components/games/PartitionBuilderGame';
import { RecurrenceChallengeGame } from '../components/games/RecurrenceChallengeGame';
import { 
  Gamepad2, Trophy, Star, Sparkles, CheckCircle2, Play, Flame, 
  HelpCircle, Shuffle, LayoutGrid, Layers, Award
} from 'lucide-react';

interface GamesPageProps {
  gameScores: Record<string, GameScoreRecord>;
  onUpdateGameScore: (gameId: string, score: number) => void;
}

interface GameCardMeta {
  id: string;
  number: number;
  title: string;
  topicRef: string;
  category: string;
  shortDesc: string;
  tag: string;
  color: string;
}

const ALL_GAMES: GameCardMeta[] = [
  {
    id: 'game-1',
    number: 1,
    title: 'Formula Match',
    topicRef: 'Topics 1-8',
    category: 'Counting & Identities',
    shortDesc: 'Tap or match formulas with their definitions and application domains against the clock.',
    tag: 'Quick Reflexes',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'game-2',
    number: 2,
    title: 'Permutation vs Combination',
    topicRef: 'Topics 4 & 6',
    category: 'Permutations & Combinations',
    shortDesc: 'Inspect real-life situations: Does order matter? Choose the formula and calculate total ways.',
    tag: 'Decision Challenge',
    color: 'from-indigo-600 to-violet-600'
  },
  {
    id: 'game-3',
    number: 3,
    title: 'Counting Quest',
    topicRef: 'Topics 2 & 3',
    category: 'Counting Principles',
    shortDesc: 'Multi-step real-world scenarios: wardrobes, PINs, license plates. Master AND vs OR rules.',
    tag: 'Quest Adventure',
    color: 'from-violet-600 to-purple-600'
  },
  {
    id: 'game-4',
    number: 4,
    title: 'Pigeonhole Puzzle',
    topicRef: 'Topic 9',
    category: 'Theorems & Principles',
    shortDesc: 'Solve guaranteed collision puzzles with birthdays, dark rooms, socks, and server allocations.',
    tag: 'Deductive Logic',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'game-5',
    number: 5,
    title: 'Binomial Expansion Builder',
    topicRef: 'Topics 10 & 11',
    category: 'Binomial Theorem',
    shortDesc: 'Assemble polynomial expansions step by step using Pascal\'s triangle rows and exponent rules.',
    tag: 'Interactive Builder',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'game-6',
    number: 6,
    title: 'Inclusion-Exclusion Challenge',
    topicRef: 'Topic 12',
    category: 'Theorems & Principles',
    shortDesc: 'Calculate overlapping sets, unions, and intersections on 2-set and 3-set visual Venn scenarios.',
    tag: 'Venn Solver',
    color: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'game-7',
    number: 7,
    title: 'Derangement Delivery',
    topicRef: 'Topic 13',
    category: 'Subfactorials & Derangements',
    shortDesc: 'Deliver letters to mailboxes such that zero letters reach their original address. Uncover all D(n) = 9.',
    tag: 'Spatial Puzzle',
    color: 'from-rose-600 to-pink-600'
  },
  {
    id: 'game-8',
    number: 8,
    title: 'Multiset Arrangement Lab',
    topicRef: 'Topics 14 & 15',
    category: 'Multisets',
    shortDesc: 'Experiment with repeated letters like AABBC and BANANA. Discover why repeated items divide factorials.',
    tag: 'Lab Simulator',
    color: 'from-fuchsia-600 to-purple-600'
  },
  {
    id: 'game-9',
    number: 9,
    title: 'Partition Builder',
    topicRef: 'Topics 16 & 17',
    category: 'Integer Partitions',
    shortDesc: 'Decompose integers into partitions, visualize Ferrers dots & Young boxes, and transpose conjugates.',
    tag: 'Visual Geometry',
    color: 'from-teal-600 to-emerald-600'
  },
  {
    id: 'game-10',
    number: 10,
    title: 'Recurrence Sequence Challenge',
    topicRef: 'Topics 18 & 19',
    category: 'Recurrence Relations',
    shortDesc: 'Generate sequence terms for Fibonacci, Towers of Hanoi, Factorial, and characteristic root recurrences.',
    tag: 'Pattern Prediction',
    color: 'from-indigo-600 to-blue-700'
  }
];

export const GamesPage: React.FC<GamesPageProps> = ({
  gameScores,
  onUpdateGameScore
}) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const totalPoints = Object.values(gameScores).reduce((acc, curr) => acc + curr.highScore, 0);

  const handleReturnToHub = () => {
    setActiveGameId(null);
  };

  const handleGameScore = (score: number) => {
    if (activeGameId) {
      onUpdateGameScore(activeGameId, score);
    }
  };

  // Render the currently selected game if active
  if (activeGameId === 'game-1') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <FormulaMatchGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-2') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <PermVsCombGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-3') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <CountingQuestGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-4') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <PigeonholePuzzleGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-5') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <BinomialBuilderGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-6') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <InclusionExclusionGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-7') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <DerangementDeliveryGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-8') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <MultisetLabGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-9') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <PartitionBuilderGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }
  if (activeGameId === 'game-10') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <RecurrenceChallengeGame onBack={handleReturnToHub} onScoreUpdate={handleGameScore} />
      </div>
    );
  }

  // DEFAULT VIEW: GAME ZONE HUB
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 sm:space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/10 backdrop-blur-md text-purple-200 border border-white/20 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" /> 10 Educational Math Games
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-purple-200">
              MDC5001C • Unit 1 Interactive Zone
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Combinatorial Math Arcade
          </h1>
          <p className="text-xs sm:text-base text-purple-100/90 leading-relaxed">
            Reinforce syllabus concepts through real mathematical simulations, puzzle logic, and formula discovery. Earn stars, beat high scores, and master discrete principles intuitively!
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 sm:pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border border-white/20">
              <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
              <div className="text-xs">
                <span className="font-bold text-sm sm:text-base block">{totalPoints}</span>
                <span className="text-[10px] sm:text-xs text-purple-200">Arcade Points</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border border-white/20">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" />
              <div className="text-xs">
                <span className="font-bold text-sm sm:text-base block">
                  {Object.keys(gameScores).length} / 10
                </span>
                <span className="text-[10px] sm:text-xs text-purple-200">Games Played</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 10 Games */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Select an Interactive Game
          </h2>
          <span className="text-xs text-slate-500 font-semibold">10 Games</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {ALL_GAMES.map(g => {
            const scoreRec = gameScores[g.id];
            const highScore = scoreRec?.highScore || 0;

            return (
              <div
                key={g.id}
                onClick={() => setActiveGameId(g.id)}
                className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 hover:shadow-lg transition flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${g.color} text-white font-black text-xs flex items-center justify-center shadow-xs`}>
                        {g.number}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {g.topicRef}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {g.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {g.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>Best: {highScore} pts</span>
                  </div>

                  <button className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold group-hover:bg-indigo-600 group-hover:text-white transition flex items-center gap-1">
                    <Play className="w-3.5 h-3.5" /> Play
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
