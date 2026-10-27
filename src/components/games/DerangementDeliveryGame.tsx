import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterItem {
  id: number;
  label: string; // "Letter A", "Letter B", "Letter C", "Letter D"
}

interface EnvelopeItem {
  id: number;
  label: string; // "Envelope A", "Envelope B", "Envelope C", "Envelope D"
}

export const DerangementDeliveryGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  // Let's use 4 items: A, B, C, D
  const items = [
    { id: 1, letter: 'Letter 1 (Red)', mailbox: 'Mailbox 1 (Red)', color: 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40' },
    { id: 2, letter: 'Letter 2 (Blue)', mailbox: 'Mailbox 2 (Blue)', color: 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40' },
    { id: 3, letter: 'Letter 3 (Green)', mailbox: 'Mailbox 3 (Green)', color: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40' },
    { id: 4, letter: 'Letter 4 (Amber)', mailbox: 'Mailbox 4 (Amber)', color: 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40' }
  ];

  // Placed letter id for each mailbox index (0, 1, 2, 3)
  const [placement, setPlacement] = useState<(number | null)[]>([null, null, null, null]);
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [discoveredDerangements, setDiscoveredDerangements] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isDerangement: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);

  // Derangements for n=4 is D(4) = 9
  const totalDerangements = 9;

  const handleSelectLetter = (id: number) => {
    setSelectedLetterId(id);
    setFeedback(null);
  };

  const handlePlaceInMailbox = (mailboxIndex: number) => {
    if (selectedLetterId === null) return;

    // Check if letter was already placed elsewhere, clear that slot
    const next = [...placement];
    const prevIndex = next.indexOf(selectedLetterId);
    if (prevIndex !== -1) {
      next[prevIndex] = null;
    }

    next[mailboxIndex] = selectedLetterId;
    setPlacement(next);
    setSelectedLetterId(null);
    setFeedback(null);
  };

  const handleClearSlot = (mailboxIndex: number) => {
    const next = [...placement];
    next[mailboxIndex] = null;
    setPlacement(next);
    setFeedback(null);
  };

  const handleVerifyDelivery = () => {
    if (placement.includes(null)) {
      setFeedback({ isDerangement: false, message: 'Please deliver all 4 letters to all 4 mailboxes first.' });
      return;
    }

    // Check for fixed points: where letter id === mailbox id (mailbox index + 1)
    const fixedPoints: number[] = [];
    placement.forEach((letterId, idx) => {
      if (letterId === idx + 1) {
        fixedPoints.push(letterId!);
      }
    });

    if (fixedPoints.length > 0) {
      setFeedback({
        isDerangement: false,
        message: `Oops! Letter ${fixedPoints.join(', ')} was delivered to its own mailbox! In a derangement, ZERO letters may match.`
      });
    } else {
      // It is a valid derangement!
      const key = placement.join('-');
      if (discoveredDerangements.includes(key)) {
        setFeedback({
          isDerangement: true,
          message: 'Valid derangement, but you already discovered this combination before! Try to find another one of the 9.'
        });
      } else {
        const nextFound = [...discoveredDerangements, key];
        setDiscoveredDerangements(nextFound);
        setScore(s => {
          const next = s + 20;
          onScoreUpdate(next);
          return next;
        });
        setFeedback({
          isDerangement: true,
          message: `Awesome! You found valid derangement (${nextFound.length} of ${totalDerangements})! Total D(4) = 9.`
        });
        if (nextFound.length === totalDerangements) {
          confetti({ particleCount: 80, spread: 80 });
        }
      }
    }
  };

  const handleResetPlacement = () => {
    setPlacement([null, null, null, null]);
    setSelectedLetterId(null);
    setFeedback(null);
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
            Discovered: {discoveredDerangements.length} / {totalDerangements}
          </span>
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-4 h-4" /> Score: {score}
          </div>
          <button
            onClick={handleResetPlacement}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Clear Current Mailboxes"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Derangement Delivery: D(4) = 9
            </span>
            <div className="text-xs font-mono font-semibold text-slate-500">
              <MathView math="D(n) = n! \sum_{k=0}^n \frac{(-1)^k}{k!}" />
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tap a letter below, then tap a mailbox to deliver it. <strong>Goal:</strong> deliver all 4 letters such that <em>no letter goes to its own matching numbered mailbox!</em>
          </p>
        </div>

        {/* Mailboxes (Drop Targets) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Mailboxes (Destinations)</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.map((m, idx) => {
              const placedId = placement[idx];
              const placedLetter = items.find(it => it.id === placedId);
              const isMatchError = placedId === m.id;

              return (
                <div
                  key={m.id}
                  onClick={() => handlePlaceInMailbox(idx)}
                  className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[110px] ${
                    isMatchError
                      ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-2 ring-rose-400/40'
                      : placedLetter
                      ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30'
                      : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-500 mb-1">{m.mailbox}</span>
                  {placedLetter ? (
                    <div className="space-y-1">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-600 text-white inline-block">
                        {placedLetter.letter}
                      </span>
                      {isMatchError && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600">
                          <AlertTriangle className="w-3 h-3" /> Own Box!
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">Tap to place letter</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Letters */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Unplaced / Available Letters</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {items.map(letter => {
              const isPlaced = placement.includes(letter.id);
              const isSelected = selectedLetterId === letter.id;

              return (
                <button
                  key={letter.id}
                  disabled={isPlaced}
                  onClick={() => handleSelectLetter(letter.id)}
                  className={`p-3 rounded-xl border font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition ${
                    isPlaced
                      ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 line-through cursor-not-allowed'
                      : isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white ring-2 ring-indigo-400/40'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  {letter.letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button & Feedback */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={handleVerifyDelivery}
              disabled={placement.includes(null)}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md shadow-indigo-500/20 text-sm"
            >
              Verify Derangement
            </button>
            <button
              onClick={handleResetPlacement}
              className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition"
            >
              Clear
            </button>
          </div>

          {feedback && (
            <div className={`p-4 rounded-xl border text-xs md:text-sm animate-fadeIn ${
              feedback.isDerangement
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {feedback.isDerangement ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                )}
                <span>{feedback.message}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
