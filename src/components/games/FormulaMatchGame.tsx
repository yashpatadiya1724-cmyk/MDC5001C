import React, { useState, useEffect } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CardItem {
  id: string;
  type: 'formula' | 'name';
  pairId: string;
  content: string;
  isMath: boolean;
}

const FORMULA_PAIRS = [
  { id: '1', formula: 'P(n,r) = \\frac{n!}{(n-r)!}', name: 'Permutation (Order Matters)', desc: 'Used when arranging r items from n distinct items where sequence matters.' },
  { id: '2', formula: 'C(n,r) = \\frac{n!}{r!(n-r)!}', name: 'Combination (Order Disregarded)', desc: 'Used when picking an unordered team or subset of r items from n.' },
  { id: '3', formula: '|A \\cup B| = |A| + |B| - |A \\cap B|', name: 'Inclusion-Exclusion (2 Sets)', desc: 'Avoids double counting elements that belong to both sets.' },
  { id: '4', formula: 'N = n^r', name: 'Permutation with Repetition', desc: 'Used for PINs and codes where items can be reused.' },
  { id: '5', formula: 'D(n) = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}', name: 'Derangements (!n)', desc: 'Arrangements where no single item ends up in its original position.' },
  { id: '6', formula: '\\lceil N/k \\rceil', name: 'Pigeonhole (Max Occupancy)', desc: 'Guarantees at least one container holds ceil(N/k) items.' },
  { id: '7', formula: '\\binom{r + k - 1}{r}', name: 'Stars & Bars (Multiset Combinations)', desc: 'Selecting r items from k categories with replacement allowed.' },
  { id: '8', formula: 'F_n = F_{n-1} + F_{n-2}', name: 'Fibonacci Recurrence', desc: 'Each term is the sum of the preceding two terms.' }
];

export const FormulaMatchGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [mistakePair, setMistakePair] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [score, setScore] = useState(0);
  const [lastMatchExplanation, setLastMatchExplanation] = useState<string | null>(null);

  const initGame = () => {
    // Pick 6 random pairs for a fresh fun round
    const shuffledPairs = [...FORMULA_PAIRS].sort(() => Math.random() - 0.5).slice(0, 6);
    const cardDeck: CardItem[] = [];
    shuffledPairs.forEach(pair => {
      cardDeck.push({ id: `f-${pair.id}`, type: 'formula', pairId: pair.id, content: pair.formula, isMath: true });
      cardDeck.push({ id: `n-${pair.id}`, type: 'name', pairId: pair.id, content: pair.name, isMath: false });
    });
    setCards(cardDeck.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchedPairIds([]);
    setMistakePair([]);
    setTimerSeconds(0);
    setIsActive(true);
    setScore(0);
    setLastMatchExplanation(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && matchedPairIds.length < 6) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else if (matchedPairIds.length === 6 && matchedPairIds.length > 0) {
      clearInterval(interval);
      setIsActive(false);
      const bonus = Math.max(10, 100 - timerSeconds * 2);
      const finalScore = score + bonus;
      setScore(finalScore);
      onScoreUpdate(finalScore);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
    return () => clearInterval(interval);
  }, [isActive, matchedPairIds, timerSeconds]);

  const handleCardClick = (card: CardItem) => {
    if (matchedPairIds.includes(card.pairId) || selectedCards.find(c => c.id === card.id)) return;
    if (selectedCards.length === 2) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [c1, c2] = newSelected;
      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        // Matched!
        const pair = FORMULA_PAIRS.find(p => p.id === c1.pairId);
        setMatchedPairIds(prev => [...prev, c1.pairId]);
        setScore(s => s + 20);
        setLastMatchExplanation(pair ? `${pair.name}: ${pair.desc}` : 'Correct Match!');
        setSelectedCards([]);
      } else {
        // Missed
        setMistakePair([c1.id, c2.id]);
        setTimeout(() => {
          setSelectedCards([]);
          setMistakePair([]);
        }, 900);
      }
    }
  };

  const isCompleted = matchedPairIds.length === 6 && cards.length > 0;

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

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium text-sm">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-4 h-4" /> Score: {score}
          </div>

          <button
            onClick={initGame}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
        <span className="p-1.5 bg-indigo-600 text-white rounded-lg font-bold text-xs">TIP</span>
        <p>Tap one formula card and one formula name card to connect them. Matched pairs lock in green and earn 20 points each!</p>
      </div>

      {/* Explanation Banner */}
      {lastMatchExplanation && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3 rounded-xl flex items-center gap-2.5 text-xs md:text-sm text-emerald-800 dark:text-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{lastMatchExplanation}</span>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map(card => {
          const isMatched = matchedPairIds.includes(card.pairId);
          const isSelected = selectedCards.some(c => c.id === card.id);
          const isError = mistakePair.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`p-4 min-h-[100px] md:min-h-[120px] rounded-2xl flex flex-col items-center justify-center text-center transition-all select-none border-2 ${
                isMatched
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-700 dark:text-emerald-300 opacity-80 cursor-default scale-95'
                  : isError
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300 animate-shake'
                  : isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-700 dark:text-indigo-200 shadow-md ring-2 ring-indigo-400/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:shadow-sm active:scale-95'
              }`}
            >
              {isMatched && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mb-1" />
              )}
              {isError && (
                <XCircle className="w-4 h-4 text-rose-500 mb-1" />
              )}
              {card.isMath ? (
                <div className="text-sm md:text-base font-semibold">
                  <MathView math={card.content} />
                </div>
              ) : (
                <span className="text-xs md:text-sm font-semibold">{card.content}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Modal / Card */}
      {isCompleted && (
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-4 shadow-lg">
          <div className="inline-flex p-3 bg-emerald-500 text-white rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">Fantastic Job! All Formulas Matched!</h3>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            You completed the challenge in {timerSeconds} seconds with a total score of <strong>{score}</strong> points.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={initGame}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition text-sm"
            >
              Back to Game Zone
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
