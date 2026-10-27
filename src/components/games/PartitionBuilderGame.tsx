import React, { useState } from 'react';
import { MathView } from '../MathView';
import { Trophy, RotateCcw, ArrowLeft, Grid, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IntegerPartitionSet {
  n: number;
  p_n: number;
  partitions: number[][];
}

const PARTITION_DATA: Record<number, number[][]> = {
  3: [[3], [2, 1], [1, 1, 1]],
  4: [[4], [3, 1], [2, 2], [2, 1, 1], [1, 1, 1, 1]],
  5: [[5], [4, 1], [3, 2], [3, 1, 1], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]]
};

export const PartitionBuilderGame: React.FC<{ onBack: () => void; onScoreUpdate: (score: number) => void }> = ({ onBack, onScoreUpdate }) => {
  const [selectedN, setSelectedN] = useState<number>(4);
  const [activePartitionIdx, setActivePartitionIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'ferrers' | 'young'>('ferrers');
  const [isTransposed, setIsTransposed] = useState<boolean>(false);
  const [discoveredIndices, setDiscoveredIndices] = useState<number[]>([0]);
  const [score, setScore] = useState(0);

  const partitions = PARTITION_DATA[selectedN];
  const activePartition = partitions[activePartitionIdx];

  // Calculate conjugate (transpose)
  const computeConjugate = (parts: number[]): number[] => {
    if (parts.length === 0) return [];
    const maxVal = parts[0];
    const conjugate: number[] = [];
    for (let c = 0; c < maxVal; c++) {
      let count = 0;
      for (let r = 0; r < parts.length; r++) {
        if (parts[r] > c) count++;
      }
      conjugate.push(count);
    }
    return conjugate;
  };

  const conjugatePartition = computeConjugate(activePartition);
  const displayedParts = isTransposed ? conjugatePartition : activePartition;

  // Is self-conjugate?
  const isSelfConjugate = activePartition.join(',') === conjugatePartition.join(',');

  const handleSelectPartition = (idx: number) => {
    setActivePartitionIdx(idx);
    setIsTransposed(false);
    if (!discoveredIndices.includes(idx)) {
      const next = [...discoveredIndices, idx];
      setDiscoveredIndices(next);
      setScore(s => {
        const nextScore = s + 15;
        onScoreUpdate(nextScore);
        return nextScore;
      });
      if (next.length === partitions.length) {
        confetti({ particleCount: 60, spread: 60 });
      }
    }
  };

  const handleSelectN = (n: number) => {
    setSelectedN(n);
    setActivePartitionIdx(0);
    setIsTransposed(false);
    setDiscoveredIndices([0]);
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
            Discovered: {discoveredIndices.length} / {partitions.length}
          </span>
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl font-bold text-sm border border-indigo-200 dark:border-indigo-800">
            <Trophy className="w-4 h-4" /> Score: {score}
          </div>
          <button
            onClick={() => {
              setDiscoveredIndices([0]);
              setActivePartitionIdx(0);
              setIsTransposed(false);
            }}
            className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Integer Partition & Diagram Lab
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Decomposing Integer n = {selectedN} (p({selectedN}) = {partitions.length})
            </h3>
          </div>

          <div className="flex gap-2">
            {[3, 4, 5].map(nVal => (
              <button
                key={nVal}
                onClick={() => handleSelectN(nVal)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  selectedN === nVal
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                n = {nVal}
              </button>
            ))}
          </div>
        </div>

        {/* Partition Selector Chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            Click to explore each partition of {selectedN}:
          </span>
          <div className="flex flex-wrap gap-2">
            {partitions.map((part, idx) => {
              const isSelected = activePartitionIdx === idx;
              const isExplored = discoveredIndices.includes(idx);

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectPartition(idx)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold border transition flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : isExplored
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  <span>{part.join(' + ')}</span>
                  {isExplored && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagram Visualizer Area */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Current: <span className="font-mono text-indigo-600 dark:text-indigo-400">{displayedParts.join(' + ')}</span>
                {isTransposed && <span className="text-xs text-amber-600 font-semibold ml-2">(Transposed Conjugate)</span>}
              </span>
              {isSelfConjugate && (
                <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-[10px] border border-purple-200 dark:border-purple-800">
                  Self-Conjugate!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(v => v === 'ferrers' ? 'young' : 'ferrers')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
              >
                Style: {viewMode === 'ferrers' ? 'Ferrers (Dots)' : 'Young (Boxes)'}
              </button>
              <button
                onClick={() => setIsTransposed(t => !t)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" /> Transpose Conjugate
              </button>
            </div>
          </div>

          {/* Diagram Canvas */}
          <div className="py-6 flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[160px]">
            {displayedParts.map((count, rIdx) => (
              <div key={rIdx} className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, cIdx) => (
                  viewMode === 'ferrers' ? (
                    <div
                      key={cIdx}
                      className="w-5 h-5 rounded-full bg-indigo-600 shadow-sm"
                      title={`Row ${rIdx + 1}, Col ${cIdx + 1}`}
                    />
                  ) : (
                    <div
                      key={cIdx}
                      className="w-8 h-8 rounded-lg border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300"
                    >
                      1
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700 pt-3">
            <strong>Key Concept:</strong> In an integer <em>partition</em>, order does not matter ({activePartition.join(' + ')} is the exact same partition as its reverse). In an integer <em>composition</em>, order matters: for n = {selectedN}, there are 2^({selectedN}-1) = {Math.pow(2, selectedN - 1)} distinct compositions!
          </div>
        </div>
      </div>
    </div>
  );
};
