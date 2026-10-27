import React, { useState, useEffect, useMemo } from 'react';
import { EXAM_QUESTION_BANK } from '../data/examQuestions';
import { UNIT1_TOPICS } from '../data/unit1Data';
import { ExamConfig, ExamQuestion, ExamResult, ExamMode, ExamDifficulty } from '../types';
import { MathView } from '../components/MathView';
import { 
  Clock, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Bookmark, 
  RotateCcw, HelpCircle, Trophy, BarChart2, Check, X, ShieldAlert, Award,
  Grid, ChevronDown, ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamPageProps {
  onOpenQuickDrawer: () => void;
  examHistory: ExamResult[];
  onSaveExamResult: (result: ExamResult) => void;
}

export const ExamPage: React.FC<ExamPageProps> = ({
  onOpenQuickDrawer,
  examHistory,
  onSaveExamResult
}) => {
  // Screens: 'config' | 'taking' | 'results'
  const [screen, setScreen] = useState<'config' | 'taking' | 'results'>('config');

  // Exam Configuration State
  const [config, setConfig] = useState<ExamConfig>({
    mode: 'practice',
    difficulty: 'mixed',
    questionCount: 10,
    durationMinutes: 15,
    selectedTopicIds: []
  });

  // Active Exam Session State
  const [currentQuestions, setCurrentQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Submit Modal Confirmation
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);

  // Results State
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);
  const [resultsFilter, setResultsFilter] = useState<'all' | 'incorrect' | 'review'>('all');

  // Filter available questions based on config
  const prepareExam = (overrideQuestions?: ExamQuestion[]) => {
    let pool = overrideQuestions ? [...overrideQuestions] : [...EXAM_QUESTION_BANK];

    if (!overrideQuestions) {
      if (config.difficulty !== 'mixed') {
        pool = pool.filter(q => q.difficulty === config.difficulty);
      }
      if (config.selectedTopicIds.length > 0) {
        pool = pool.filter(q => config.selectedTopicIds.includes(q.topicId));
      }
      // If pool is smaller than questionCount, take all; otherwise shuffle & take questionCount
      pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(config.questionCount, pool.length));
    }

    setCurrentQuestions(pool);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeRemainingSeconds(config.durationMinutes * 60);
    setTimeSpentSeconds(0);
    setIsTimerActive(true);
    setScreen('taking');
  };

  // Timer Hook
  useEffect(() => {
    let timer: any = null;
    if (screen === 'taking' && isTimerActive) {
      timer = setInterval(() => {
        setTimeSpentSeconds(s => s + 1);
        if (config.durationMinutes > 0) {
          setTimeRemainingSeconds(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              handleSubmitExam(); // Auto submit when time runs out
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [screen, isTimerActive, config.durationMinutes]);

  const currentQ = currentQuestions[currentQuestionIndex];

  const handleSelectAnswer = (ans: string) => {
    if (!currentQ) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleToggleReview = () => {
    if (!currentQ) return;
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const normalizeAnswer = (val: string) => {
    return val.trim().toLowerCase().replace(/,/g, '');
  };

  const handleSubmitExam = () => {
    setIsTimerActive(false);
    setConfirmSubmitOpen(false);

    let totalScore = 0;
    let maxMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const topicBreakdown: Record<string, { total: number; correct: number }> = {};

    currentQuestions.forEach(q => {
      maxMarks += q.marks;
      if (!topicBreakdown[q.topicName]) {
        topicBreakdown[q.topicName] = { total: 0, correct: 0 };
      }
      topicBreakdown[q.topicName].total += 1;

      const userAns = userAnswers[q.id];
      if (userAns === undefined || userAns.trim() === '') {
        unansweredCount += 1;
      } else {
        const isCorrect = normalizeAnswer(userAns) === normalizeAnswer(q.correctAnswer);
        if (isCorrect) {
          totalScore += q.marks;
          correctCount += 1;
          topicBreakdown[q.topicName].correct += 1;
        } else {
          incorrectCount += 1;
        }
      }
    });

    const percentage = maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0;

    const result: ExamResult = {
      examId: `exam-${Date.now()}`,
      timestamp: Date.now(),
      mode: config.mode,
      totalMarks: totalScore,
      maxMarks,
      percentage,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds,
      questions: currentQuestions,
      userAnswers,
      topicBreakdown
    };

    setLastResult(result);
    onSaveExamResult(result);
    setScreen('results');

    if (percentage >= 70) {
      confetti({ particleCount: 70, spread: 70 });
    }
  };

  const handleRetryIncorrect = () => {
    if (!lastResult) return;
    const incorrectQs = lastResult.questions.filter(q => {
      const u = lastResult.userAnswers[q.id];
      return !u || normalizeAnswer(u) !== normalizeAnswer(q.correctAnswer);
    });

    if (incorrectQs.length > 0) {
      prepareExam(incorrectQs);
    }
  };

  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k]?.trim() !== '').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* SCREEN 1: CONFIGURATION */}
      {screen === 'config' && (
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-300">
              Examination Practice Centre
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Unit 1 Examination Assessment
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/80 leading-relaxed">
              Test your proficiency in combinatorial algorithms, inclusion-exclusion, permutations, partitions, and recurrence solutions under genuine exam conditions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Configure Your Assessment
            </h2>

            {/* Mode: Practice vs Mock Exam */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Assessment Mode</label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConfig(c => ({ ...c, mode: 'practice' }))}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    config.mode === 'practice'
                      ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm">Practice Mode</div>
                  <div className="text-xs text-slate-500 mt-1">Immediate step hints available. Good for active learning and revision.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setConfig(c => ({ ...c, mode: 'mock' }))}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    config.mode === 'mock'
                      ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm">Mock Examination</div>
                  <div className="text-xs text-slate-500 mt-1">Strict timer. Answers and explanations revealed upon final submission.</div>
                </button>
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Difficulty Level</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['easy', 'medium', 'hard', 'mixed'] as ExamDifficulty[]).map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setConfig(c => ({ ...c, difficulty: diff }))}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold capitalize transition border ${
                      config.difficulty === diff
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions & Duration */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Question Count</label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 20, 30].map(count => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setConfig(c => ({ ...c, questionCount: count }))}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                        config.questionCount === count
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {count} Questions
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 60].map(duration => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setConfig(c => ({ ...c, durationMinutes: duration }))}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                        config.durationMinutes === duration
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {duration} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Filter Selection (Optional) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Syllabus Coverage</label>
                <button
                  type="button"
                  onClick={() => setConfig(c => ({ ...c, selectedTopicIds: [] }))}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Select All Unit 1 Topics
                </button>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>
                  {config.selectedTopicIds.length === 0
                    ? 'All 20 Unit 1 Topics included (Full Syllabus Coverage)'
                    : `${config.selectedTopicIds.length} custom topics selected`}
                </span>
                <span className="font-bold text-indigo-600">
                  {EXAM_QUESTION_BANK.length} Questions in Pool
                </span>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => prepareExam()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-base transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <span>Begin Examination Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2: ACTIVE EXAM SESSION */}
      {screen === 'taking' && currentQ && (
        <div className="space-y-4 sm:space-y-6">
          {/* Top Bar with Live Timer & Controls */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white shrink-0">
                  Q {currentQuestionIndex + 1} of {currentQuestions.length}
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-bold border border-indigo-200 dark:border-indigo-800 shrink-0">
                  {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize font-medium shrink-0 hidden xs:inline">
                  {currentQ.difficulty}
                </span>
              </div>

              {/* Mobile Palette Toggle Button */}
              <button
                onClick={() => setMobilePaletteOpen(o => !o)}
                className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 min-h-[36px]"
              >
                <Grid className="w-3.5 h-3.5 text-indigo-500" />
                <span>Palette</span>
                {mobilePaletteOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* Visible Timer */}
              <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl font-mono font-bold text-xs sm:text-sm border ${
                timeRemainingSeconds < 120
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-300 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
                <span>
                  {Math.floor(timeRemainingSeconds / 60)}:{(timeRemainingSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Mark for Review */}
                <button
                  onClick={handleToggleReview}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition min-h-[36px] ${
                    markedForReview[currentQ.id]
                      ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 text-amber-800 dark:text-amber-300'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-300'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" fill={markedForReview[currentQ.id] ? 'currentColor' : 'none'} />
                  <span>Review</span>
                </button>

                <button
                  onClick={() => setConfirmSubmitOpen(true)}
                  className="px-3 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-xs min-h-[36px]"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Mobile Expandable Question Palette */}
            {mobilePaletteOpen && (
              <div className="lg:hidden pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between text-[11px] font-semibold text-slate-500 gap-2">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" /> Answered ({answeredCount})</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-700 inline-block" /> Left ({currentQuestions.length - answeredCount})</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> Review</span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-0.5">
                  {currentQuestions.map((q, idx) => {
                    const isCurrent = currentQuestionIndex === idx;
                    const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id].trim() !== '';
                    const isReview = markedForReview[q.id];

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentQuestionIndex(idx);
                          setMobilePaletteOpen(false);
                        }}
                        className={`h-9 rounded-xl text-xs font-bold transition flex items-center justify-center min-h-[36px] ${
                          isCurrent
                            ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
                            : ''
                        } ${
                          isReview
                            ? 'bg-amber-400 text-slate-900 font-extrabold'
                            : isAnswered
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 items-start">
            {/* Question Workspace */}
            <main className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Topic: {currentQ.topicName}
                </span>
                <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.question}
                </h3>
                {currentQ.latexQuestion && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-indigo-950 dark:text-indigo-200 font-medium overflow-x-auto scrollbar-none">
                    <MathView math={currentQ.latexQuestion} block />
                  </div>
                )}
              </div>

              {/* Answer Input Area based on question type */}
              <div className="space-y-3 pt-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Your Answer</label>

                {/* MCQ / True-False / Fill-Formula Options */}
                {currentQ.options ? (
                  <div className="space-y-2">
                    {currentQ.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[currentQ.id] === optIdx.toString();
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(optIdx.toString())}
                          className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-left text-xs sm:text-sm font-semibold border-2 transition flex items-center gap-3 min-h-[48px] ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 ring-2 ring-indigo-400/30'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Numeric Answer Input */
                  <div className="space-y-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="Enter integer or numeric result (e.g. 120 or -80)..."
                      value={userAnswers[currentQ.id] || ''}
                      onChange={e => handleSelectAnswer(e.target.value)}
                      className="w-full p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl font-mono text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                    <span className="text-[11px] text-slate-400">
                      Standard integer or simplified numerical format.
                    </span>
                  </div>
                )}
              </div>

              {/* Practice Mode Hint (Instant Feedback) */}
              {config.mode === 'practice' && currentQ.hint && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span><strong>Practice Hint: </strong>{currentQ.hint}</span>
                </div>
              )}

              {/* Bottom Nav Controls */}
              <div className="flex items-center justify-between gap-2 pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(i => i - 1)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 disabled:opacity-40 text-xs font-bold text-slate-700 dark:text-slate-300 transition active:scale-95 min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" /> <span>Prev</span>
                </button>

                <div className="flex items-center gap-2">
                  {userAnswers[currentQ.id] && (
                    <button
                      onClick={() => handleSelectAnswer('')}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-semibold px-2 py-1 min-h-[36px]"
                    >
                      Clear
                    </button>
                  )}

                  {currentQuestionIndex < currentQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(i => i + 1)}
                      className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm active:scale-95 min-h-[44px]"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmSubmitOpen(true)}
                      className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm active:scale-95 min-h-[44px]"
                    >
                      <CheckCircle className="w-4 h-4" /> <span>Submit</span>
                    </button>
                  )}
                </div>
              </div>
            </main>

            {/* Question Palette Sidebar */}
            <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Question Navigation Palette
              </h4>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700 inline-block" />
                  <span>Unanswered ({currentQuestions.length - answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-amber-400 inline-block" />
                  <span>Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md border-2 border-indigo-600 inline-block" />
                  <span>Current</span>
                </div>
              </div>

              {/* Grid Palette Buttons */}
              <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
                {currentQuestions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id].trim() !== '';
                  const isReview = markedForReview[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-bold transition flex items-center justify-center relative ${
                        isCurrent
                          ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white dark:ring-offset-slate-900'
                          : ''
                      } ${
                        isReview
                          ? 'bg-amber-400 text-slate-900 font-extrabold'
                          : isAnswered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setConfirmSubmitOpen(true)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Finish & Submit Assessment
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">Submit Assessment?</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              You have answered <strong>{answeredCount}</strong> of <strong>{currentQuestions.length}</strong> questions.
            </p>

            {currentQuestions.length - answeredCount > 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>You still have {currentQuestions.length - answeredCount} unanswered questions!</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Return to Exam
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: RESULTS PAGE */}
      {screen === 'results' && lastResult && (
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Score Header Card */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Performance Evaluation
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold">Examination Results</h2>
                <p className="text-xs text-indigo-200">
                  Completed in {Math.floor(lastResult.timeSpentSeconds / 60)}m {lastResult.timeSpentSeconds % 60}s • {lastResult.mode.toUpperCase()} MODE
                </p>
              </div>

              <div className="text-center bg-white/10 backdrop-blur-md px-5 py-3 sm:px-6 sm:py-4 rounded-2xl border border-white/20 self-start sm:self-auto">
                <div className="text-2xl sm:text-4xl font-black">{lastResult.percentage}%</div>
                <div className="text-[11px] sm:text-xs font-bold text-indigo-200">
                  {lastResult.totalMarks} / {lastResult.maxMarks} Marks
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 text-center text-xs font-bold">
              <div className="bg-emerald-500/20 border border-emerald-400/30 p-2 sm:p-3 rounded-xl">
                <div className="text-emerald-300 text-base sm:text-lg font-black">{lastResult.correctCount}</div>
                <div className="text-emerald-200 text-[11px] sm:text-xs">Correct</div>
              </div>
              <div className="bg-rose-500/20 border border-rose-400/30 p-2 sm:p-3 rounded-xl">
                <div className="text-rose-300 text-base sm:text-lg font-black">{lastResult.incorrectCount}</div>
                <div className="text-rose-200 text-[11px] sm:text-xs">Incorrect</div>
              </div>
              <div className="bg-slate-500/20 border border-slate-400/30 p-2 sm:p-3 rounded-xl">
                <div className="text-slate-300 text-base sm:text-lg font-black">{lastResult.unansweredCount}</div>
                <div className="text-slate-200 text-[11px] sm:text-xs">Skipped</div>
              </div>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            {lastResult.incorrectCount > 0 && (
              <button
                onClick={handleRetryIncorrect}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" /> Retry Incorrect ({lastResult.incorrectCount})
              </button>
            )}

            <button
              onClick={() => setScreen('config')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition min-h-[44px]"
            >
              Take Another Exam
            </button>

            <button
              onClick={onOpenQuickDrawer}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition min-h-[44px]"
            >
              <Bookmark className="w-4 h-4" /> Review Formulas
            </button>
          </div>

          {/* Topic-Wise Performance */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Topic-Wise Accuracy Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(lastResult.topicBreakdown).map(([topic, stats]) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={topic} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{topic}</span>
                      <span className="text-slate-500 font-mono">{stats.correct} / {stats.total} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Question-by-Question Solutions & Explanations
              </h3>

              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setResultsFilter('all')}
                  className={`px-3 py-1 rounded-lg ${resultsFilter === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-500'}`}
                >
                  All ({lastResult.questions.length})
                </button>
                <button
                  onClick={() => setResultsFilter('incorrect')}
                  className={`px-3 py-1 rounded-lg ${resultsFilter === 'incorrect' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs' : 'text-slate-500'}`}
                >
                  Incorrect ({lastResult.incorrectCount})
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {lastResult.questions.map((q, idx) => {
                const userAns = lastResult.userAnswers[q.id];
                const isCorrect = userAns !== undefined && normalizeAnswer(userAns) === normalizeAnswer(q.correctAnswer);
                const isUnanswered = !userAns || userAns.trim() === '';

                if (resultsFilter === 'incorrect' && isCorrect) return null;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 space-y-3 ${
                      isCorrect
                        ? 'border-emerald-300 dark:border-emerald-900/60'
                        : 'border-rose-300 dark:border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{q.topicName}</span>
                      </div>

                      <span className={`text-xs font-bold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-600' : isUnanswered ? 'text-slate-400' : 'text-rose-600'
                      }`}>
                        {isCorrect ? (
                          <><Check className="w-4 h-4" /> Correct (+{q.marks})</>
                        ) : isUnanswered ? (
                          <><AlertTriangle className="w-4 h-4" /> Unanswered (0)</>
                        ) : (
                          <><X className="w-4 h-4" /> Incorrect (0/{q.marks})</>
                        )}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {q.question}
                    </p>

                    {q.latexQuestion && (
                      <div className="py-1">
                        <MathView math={q.latexQuestion} block />
                      </div>
                    )}

                    {/* Answers Summary */}
                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Your Submitted Answer</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {isUnanswered
                            ? '(None)'
                            : q.options
                            ? q.options[parseInt(userAns)] || userAns
                            : userAns}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <span className="text-emerald-700 dark:text-emerald-300 block text-[10px] uppercase font-bold">Correct Answer</span>
                        <span className="font-bold text-emerald-800 dark:text-emerald-200">
                          {q.options ? q.options[parseInt(q.correctAnswer)] || q.correctAnswer : q.correctAnswer}
                        </span>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
                      <strong>Mathematical Explanation: </strong>{q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
