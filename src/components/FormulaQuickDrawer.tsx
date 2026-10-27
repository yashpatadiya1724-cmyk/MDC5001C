import React, { useState } from 'react';
import { FORMULA_LIBRARY } from '../data/formulaLibrary';
import { MathView } from './MathView';
import { X, Search, Bookmark, Copy, Check, BookOpen } from 'lucide-react';

interface FormulaQuickDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  revisionList: string[]; // array of formula ids
  onToggleRevision: (id: string) => void;
}

export const FormulaQuickDrawer: React.FC<FormulaQuickDrawerProps> = ({
  isOpen,
  onClose,
  revisionList,
  onToggleRevision
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'revision'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredFormulas = FORMULA_LIBRARY.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'revision') {
      return matchesSearch && revisionList.includes(f.id);
    }
    return matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl border-l border-slate-200 dark:border-slate-800 animate-slideLeft"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 rounded-xl shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 dark:text-white text-base truncate">Formula Quick-Ref</h2>
              <p className="text-xs text-slate-500 truncate">Unit 1: Combinatorics Cheat-Sheet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close formula drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search formulas or concepts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 rounded-lg transition min-h-[38px] ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({FORMULA_LIBRARY.length})
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1.5 min-h-[38px] ${
                activeTab === 'revision'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Revision ({revisionList.length})</span>
            </button>
          </div>
        </div>

        {/* Formula Cards List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)]">
          {filteredFormulas.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              {activeTab === 'revision'
                ? 'Your revision list is empty. Click the bookmark icon on any formula to save it here!'
                : 'No formulas found matching your search.'}
            </div>
          ) : (
            filteredFormulas.map(f => {
              const inRevision = revisionList.includes(f.id);
              return (
                <div
                  key={f.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 space-y-2.5 transition hover:border-indigo-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {f.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{f.name}</h4>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(f.id, f.latex)}
                        title="Copy formula LaTeX"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg transition hover:bg-slate-200 dark:hover:bg-slate-700"
                      >
                        {copiedId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onToggleRevision(f.id)}
                        title={inRevision ? 'Remove from revision' : 'Add to revision'}
                        className={`p-1.5 rounded-lg transition ${
                          inRevision
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                            : 'text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={inRevision ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-indigo-950 dark:text-indigo-200 font-medium overflow-x-auto scrollbar-none text-sm sm:text-base">
                    <MathView math={f.latex} block />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">When to use: </span>
                    {f.whenToUse}
                  </p>

                  <div className="text-[11px] bg-slate-100 dark:bg-slate-800/80 p-2 rounded-lg font-mono text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-indigo-600">Ex: </span> {f.workedExample.problem} → <strong className="text-emerald-600">{f.workedExample.result}</strong>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
