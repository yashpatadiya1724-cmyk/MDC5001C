import React, { useState, useMemo } from 'react';
import { UNIT1_TOPICS } from '../data/unit1Data';
import { FORMULA_LIBRARY } from '../data/formulaLibrary';
import { TopicLesson, PracticeQuestionItem } from '../types';
import { MathView } from '../components/MathView';
import { 
  Search, BookOpen, CheckCircle, Bookmark, Copy, Check, ChevronLeft, ChevronRight, 
  ChevronDown, ChevronUp, AlertCircle, Lightbulb, Sparkles, Filter, 
  HelpCircle, RotateCcw, Eye, EyeOff, Layers, Zap, X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearnPageProps {
  completedTopics: string[];
  onToggleCompleteTopic: (topicId: string) => void;
  bookmarkedTopics: string[];
  onToggleBookmarkTopic: (topicId: string) => void;
  revisionList: string[];
  onToggleRevisionFormula: (formulaId: string) => void;
  mistakesList: { questionId: string; question: string; explanation: string; topicTitle: string }[];
  onRecordMistake: (mistake: { questionId: string; question: string; explanation: string; topicTitle: string }) => void;
  onClearMistake: (questionId: string) => void;
  onResetProgress: () => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  completedTopics,
  onToggleCompleteTopic,
  bookmarkedTopics,
  onToggleBookmarkTopic,
  revisionList,
  onToggleRevisionFormula,
  mistakesList,
  onRecordMistake,
  onClearMistake,
  onResetProgress
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(UNIT1_TOPICS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'lesson' | 'flashcards' | 'mistakes'>('lesson');
  const [explainSimply, setExplainSimply] = useState(false);
  const [isExampleExpanded, setIsExampleExpanded] = useState(true);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceChecked, setPracticeChecked] = useState<Record<string, boolean>>({});
  const [mobileTopicDropdownOpen, setMobileTopicDropdownOpen] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const categories = ['All', 'Counting Principles', 'Permutations & Combinations', 'Theorems & Principles', 'Multisets & Partitions', 'Recurrence Relations'];

  const filteredTopics = useMemo(() => {
    return UNIT1_TOPICS.filter(t => {
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.simpleDefinition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const currentTopic = useMemo(() => {
    return UNIT1_TOPICS.find(t => t.id === selectedTopicId) || UNIT1_TOPICS[0];
  }, [selectedTopicId]);

  const currentIndex = UNIT1_TOPICS.findIndex(t => t.id === currentTopic.id);
  const prevTopic = currentIndex > 0 ? UNIT1_TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < UNIT1_TOPICS.length - 1 ? UNIT1_TOPICS[currentIndex + 1] : null;

  const isCurrentCompleted = completedTopics.includes(currentTopic.id);
  const isCurrentBookmarked = bookmarkedTopics.includes(currentTopic.id);
  const completionPercentage = Math.round((completedTopics.length / UNIT1_TOPICS.length) * 100);

  // Check if topic's formula is already in revision
  const matchingFormulaInLib = FORMULA_LIBRARY.find(f => 
    f.name.toLowerCase().includes(currentTopic.title.toLowerCase().slice(0, 10)) ||
    currentTopic.primaryFormula.name.toLowerCase().includes(f.name.toLowerCase().slice(0, 8))
  );

  const handleCopyFormula = () => {
    navigator.clipboard.writeText(currentTopic.primaryFormula.latex);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const handleSelectPracticeAnswer = (qId: string, ans: string) => {
    setPracticeAnswers(prev => ({ ...prev, [qId]: ans }));
    setPracticeChecked(prev => ({ ...prev, [qId]: false }));
  };

  const handleCheckPracticeQuestion = (q: PracticeQuestionItem) => {
    const userAns = practiceAnswers[q.id];
    if (!userAns) return;
    setPracticeChecked(prev => ({ ...prev, [q.id]: true }));

    if (userAns !== q.correctAnswer) {
      onRecordMistake({
        questionId: q.id,
        question: q.question,
        explanation: q.explanation,
        topicTitle: currentTopic.title
      });
    }
  };

  const handleCompleteTopic = () => {
    onToggleCompleteTopic(currentTopic.id);
    if (!isCurrentCompleted) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Top Banner / Progress Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3 sm:space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/10 backdrop-blur-md text-indigo-200 border border-white/20">
              Unit 1 Syllabus
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-indigo-200">
              MSc IT / MCA • Semester 1
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Combinatorics & Discrete Counting
          </h1>
          <p className="text-xs sm:text-base text-indigo-100/90 leading-relaxed">
            Master permutations, combinations, pigeonhole bounds, binomial expansions, derangements, multisets, partitions, and recurrence relations.
          </p>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-1 sm:pt-2">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs font-bold text-indigo-200 gap-1">
              <span>Overall Course Completion</span>
              <span>{completedTopics.length} of {UNIT1_TOPICS.length} Topics ({completionPercentage}%)</span>
            </div>
            <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Controls: Lesson / Formula Flashcards / Revise Mistakes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === 'lesson'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Lessons ({UNIT1_TOPICS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === 'flashcards'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('mistakes')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition ${
              activeTab === 'mistakes'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Mistakes ({mistakesList.length})</span>
          </button>
        </div>

        <button
          onClick={() => setResetModalOpen(true)}
          className="text-xs font-semibold text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 flex items-center gap-1.5 transition self-end sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Progress
        </button>
      </div>

      {/* TAB 1: TOPIC LESSONS */}
      {activeTab === 'lesson' && (
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Mobile Topic Selector Bar (With Quick Step Buttons + Search Drawer) */}
          <div className="lg:hidden col-span-12 space-y-2">
            <div className="flex items-center gap-1.5">
              <button
                disabled={!prevTopic}
                onClick={() => prevTopic && setSelectedTopicId(prevTopic.id)}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 rounded-2xl text-slate-700 dark:text-slate-300 shadow-sm shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center transition active:scale-95"
                title="Previous topic"
                aria-label="Previous topic"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileTopicDropdownOpen(o => !o)}
                className="flex-1 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white shadow-sm min-h-[44px] min-w-0 transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-left truncate min-w-0">
                  <span className="p-1 px-1.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 text-xs font-mono shrink-0">
                    #{currentTopic.number}
                  </span>
                  <span className="truncate">{currentTopic.title}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-slate-400">
                  <span className="text-[11px] font-normal hidden xs:inline">Select</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileTopicDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <button
                disabled={!nextTopic}
                onClick={() => nextTopic && setSelectedTopicId(nextTopic.id)}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-30 rounded-2xl text-slate-700 dark:text-slate-300 shadow-sm shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center transition active:scale-95"
                title="Next topic"
                aria-label="Next topic"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Topic Drawer / Selector with Search & Category Filter */}
            {mobileTopicDropdownOpen && (
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl max-h-96 overflow-y-auto space-y-3 animate-fadeIn">
                <div className="space-y-2 sticky top-0 bg-white dark:bg-slate-900 pt-1 pb-2 z-10 border-b border-slate-100 dark:border-slate-800">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search 20 syllabus topics..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Category Pills on Mobile */}
                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  {filteredTopics.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400">No matching topics found.</div>
                  ) : (
                    filteredTopics.map(t => {
                      const isSelected = selectedTopicId === t.id;
                      const isDone = completedTopics.includes(t.id);
                      const isSaved = bookmarkedTopics.includes(t.id);

                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            setSelectedTopicId(t.id);
                            setMobileTopicDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between gap-2 transition ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-bold shadow-xs'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate min-w-0">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                              #{t.number}
                            </span>
                            <span className="truncate">{t.title}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {isSaved && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                            {isDone && (
                              <CheckCircle className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Topic Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search 20 topics..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {filteredTopics.map(topic => {
                const isSelected = selectedTopicId === topic.id;
                const isDone = completedTopics.includes(topic.id);
                const isSaved = bookmarkedTopics.includes(topic.id);

                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 border ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          #{topic.number}
                        </span>
                        <span className="text-xs font-bold truncate block">{topic.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{topic.shortSummary}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      {isSaved && <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                      {isDone && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Lesson Viewer Content */}
          <main className="lg:col-span-8 space-y-4 sm:space-y-6">
            <article className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6">
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      Topic #{currentTopic.number} • {currentTopic.category}
                    </span>
                    {isCurrentCompleted && (
                      <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {currentTopic.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => onToggleBookmarkTopic(currentTopic.id)}
                    className={`p-2 sm:p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                      isCurrentBookmarked
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-600'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-300'
                    }`}
                    title={isCurrentBookmarked ? 'Remove bookmark' : 'Bookmark topic'}
                  >
                    <Bookmark className="w-4 h-4" fill={isCurrentBookmarked ? 'currentColor' : 'none'} />
                    <span className="hidden sm:inline">{isCurrentBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>

                  <button
                    onClick={handleCompleteTopic}
                    className={`p-2 sm:p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                      isCurrentCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                        : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{isCurrentCompleted ? 'Completed' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>

              {/* Simple Definition */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Concept Definition
                </span>
                <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {currentTopic.simpleDefinition}
                </p>
              </div>

              {/* Intuitive Explanation + "Explain More Simply" Feature */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Intuitive Understanding
                  </span>

                  <button
                    onClick={() => setExplainSimply(e => !e)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-xs hover:bg-indigo-50 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    {explainSimply ? 'Show Standard Academic Text' : 'Explain More Simply'}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {explainSimply ? currentTopic.simpleLanguageExplanation : currentTopic.intuitiveExplanation}
                </p>
              </div>

              {/* Primary Mathematical Formula Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-sm space-y-3 sm:space-y-4 text-slate-900 dark:text-white">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-300 tracking-wider">
                    {currentTopic.primaryFormula.name}
                  </span>
                  
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={handleCopyFormula}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 bg-slate-100 dark:bg-slate-800 transition"
                      title="Copy LaTeX"
                    >
                      {copiedFormula ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="hidden xs:inline">{copiedFormula ? 'Copied' : 'Copy LaTeX'}</span>
                    </button>

                    {matchingFormulaInLib && (
                      <button
                        onClick={() => onToggleRevisionFormula(matchingFormulaInLib.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg flex items-center gap-1 transition ${
                          revisionList.includes(matchingFormulaInLib.id)
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={revisionList.includes(matchingFormulaInLib.id) ? 'currentColor' : 'none'} />
                        <span className="hidden xs:inline">Revision</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Rendered Math Equation with dedicated background container */}
                <div className="py-3 sm:py-4 px-2 sm:px-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center overflow-x-auto scrollbar-none text-sm sm:text-base md:text-lg text-indigo-950 dark:text-indigo-200 font-semibold shadow-inner">
                  <MathView math={currentTopic.primaryFormula.latex} block />
                </div>

                {/* Meaning of Symbols */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Meaning of Symbols</span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    {currentTopic.primaryFormula.meaningOfSymbols.map((item, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-start gap-2">
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                          <MathView math={item.symbol} />
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">{item.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <strong>When to apply: </strong>{currentTopic.primaryFormula.whenToUse}
                </div>
              </div>

              {/* Step-by-Step Worked Example (Collapsible) */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <button
                  onClick={() => setIsExampleExpanded(e => !e)}
                  className="w-full p-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 flex items-center justify-between text-left transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Worked Example from Syllabus
                    </span>
                  </div>
                  {isExampleExpanded ? <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                </button>

                {isExampleExpanded && (
                  <div className="p-5 space-y-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Problem: {currentTopic.workedExample.problem}
                    </p>

                    <div className="space-y-3">
                      {currentTopic.workedExample.stepByStep.map(step => (
                        <div key={step.step} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-[10px]">
                              {step.step}
                            </span>
                            <span>{step.title}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                            {step.detail}
                          </p>
                          {step.math && (
                            <div className="pl-7 py-1">
                              <MathView math={step.math} block />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Final Answer: {currentTopic.workedExample.finalAnswer}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Practice Example */}
              {currentTopic.additionalPracticeExample && (
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Additional Example
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    {currentTopic.additionalPracticeExample.problem}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <strong>Solution: </strong>{currentTopic.additionalPracticeExample.solution}
                  </p>
                  {currentTopic.additionalPracticeExample.math && (
                    <div className="pt-1">
                      <MathView math={currentTopic.additionalPracticeExample.math} block />
                    </div>
                  )}
                </div>
              )}

              {/* Common Mistakes & Exam Tips */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 uppercase">
                    <AlertCircle className="w-4 h-4" /> Common Mistakes
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                    {currentTopic.commonMistakes.map((m, i) => (
                      <li key={i} className="leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase">
                    <Zap className="w-4 h-4" /> Exam Strategy Tips
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                    {currentTopic.examTips.map((tip, i) => (
                      <li key={i} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3 Short Practice Questions with Instant Feedback */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Test Your Knowledge (3 Quick Checks)
                    </h3>
                    <p className="text-xs text-slate-500">Practice questions with immediate feedback & hints</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentTopic.practiceQuestions.map((q, qIdx) => {
                    const selected = practiceAnswers[q.id];
                    const isChecked = practiceChecked[q.id];
                    const isCorrect = isChecked && selected === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-slate-800/60 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            Question {qIdx + 1}
                          </span>
                          {isChecked && (
                            <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                              {isCorrect ? 'Correct!' : 'Incorrect'}
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                          {q.question}
                        </p>

                        {/* Options */}
                        {q.options && (
                          <div className="grid sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => (
                              <button
                                key={optIdx}
                                disabled={isChecked}
                                onClick={() => handleSelectPracticeAnswer(q.id, optIdx.toString())}
                                className={`p-2.5 rounded-xl text-xs font-medium text-left transition border ${
                                  selected === optIdx.toString()
                                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-300'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          {q.hint && (
                            <span className="text-[11px] text-slate-500 italic">
                              💡 Hint: {q.hint}
                            </span>
                          )}

                          {!isChecked ? (
                            <button
                              disabled={!selected}
                              onClick={() => handleCheckPracticeQuestion(q)}
                              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition"
                            >
                              Check Answer
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setPracticeChecked(p => ({ ...p, [q.id]: false }));
                                setPracticeAnswers(p => ({ ...p, [q.id]: '' }));
                              }}
                              className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg"
                            >
                              Try Again
                            </button>
                          )}
                        </div>

                        {isChecked && (
                          <div className={`p-3 rounded-xl text-xs leading-relaxed ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200'}`}>
                            <strong>Explanation: </strong>{q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next Navigation Bar */}
              <div className="flex items-center justify-between gap-2 pt-5 border-t border-slate-200 dark:border-slate-800">
                {prevTopic ? (
                  <button
                    onClick={() => setSelectedTopicId(prevTopic.id)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-xs font-bold text-slate-700 dark:text-slate-200 transition active:scale-95 min-h-[44px]"
                  >
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                    <span><span className="hidden xs:inline">Prev</span> (#{prevTopic.number})</span>
                  </button>
                ) : <div />}

                {nextTopic ? (
                  <button
                    onClick={() => setSelectedTopicId(nextTopic.id)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition active:scale-95 min-h-[44px]"
                  >
                    <span><span className="hidden xs:inline">Next</span> (#{nextTopic.number})</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                ) : (
                  <div className="text-xs font-bold text-emerald-600">You reached the end of Unit 1!</div>
                )}
              </div>
            </article>
          </main>
        </div>
      )}

      {/* TAB 2: FORMULA FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">Unit 1 Formula Flashcards</h3>
            <p className="text-xs text-slate-500">Test your mental recall of core combinatorial formulas</p>
          </div>

          {/* Flashcard Component */}
          {(() => {
            const card = FORMULA_LIBRARY[flashcardIndex];
            return (
              <div className="space-y-4">
                <div 
                  onClick={() => setIsFlashcardFlipped(f => !f)}
                  className="min-h-[220px] sm:min-h-[260px] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3">
                    {card.category} • Card {flashcardIndex + 1} of {FORMULA_LIBRARY.length}
                  </span>

                  {!isFlashcardFlipped ? (
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {card.name}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md">
                        {card.whenToUse}
                      </p>
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 pt-3 sm:pt-4">
                        <Eye className="w-4 h-4" /> Tap card to reveal formula
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4 animate-fadeIn">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-500">{card.name}</h4>
                      <div className="text-base sm:text-xl py-1 sm:py-2 overflow-x-auto scrollbar-none">
                        <MathView math={card.latex} block />
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2 sm:p-2.5 rounded-xl font-mono">
                        Ex: {card.workedExample.problem} → <span className="font-bold text-emerald-600">{card.workedExample.result}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 pt-1 sm:pt-2">
                        <EyeOff className="w-4 h-4" /> Tap to hide
                      </div>
                    </div>
                  )}
                </div>

                {/* Flashcard Navigation */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    disabled={flashcardIndex === 0}
                    onClick={() => {
                      setFlashcardIndex(i => i - 1);
                      setIsFlashcardFlipped(false);
                    }}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-30 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition min-h-[44px]"
                  >
                    ← Prev
                  </button>

                  <button
                    onClick={() => setIsFlashcardFlipped(f => !f)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-800 min-h-[44px]"
                  >
                    {isFlashcardFlipped ? 'Hide' : 'Reveal'}
                  </button>

                  <button
                    disabled={flashcardIndex === FORMULA_LIBRARY.length - 1}
                    onClick={() => {
                      setFlashcardIndex(i => i + 1);
                      setIsFlashcardFlipped(false);
                    }}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white rounded-xl text-xs font-bold transition min-h-[44px]"
                  >
                    Next →
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: REVISE MISTAKES */}
      {activeTab === 'mistakes' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Revise My Mistakes</h3>
            <p className="text-xs text-slate-500">
              Questions you missed during practice are automatically gathered here for focused revision.
            </p>
          </div>

          {mistakesList.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-slate-900 dark:text-white">No mistakes recorded!</h4>
              <p className="text-xs text-slate-500">
                You haven't gotten any practice questions wrong yet. Great work!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mistakesList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      Topic: {item.topicTitle}
                    </span>
                    <button
                      onClick={() => onClearMistake(item.questionId)}
                      className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Got it now! Clear
                    </button>
                  </div>

                  <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {item.question}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Explanation: </strong>{item.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Reset Learning Progress?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This will clear completed topic checks, bookmarks, recorded mistakes, and reset progress to 0%. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setResetModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
