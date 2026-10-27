import React, { useState, useEffect } from 'react';
import { PageType, GameScoreRecord, ExamResult } from './types';
import { Navbar } from './components/Navbar';
import { LearnPage } from './pages/LearnPage';
import { ExamPage } from './pages/ExamPage';
import { GamesPage } from './pages/GamesPage';
import { FormulaQuickDrawer } from './components/FormulaQuickDrawer';
import { BookOpen, GraduationCap, Gamepad2, Bookmark, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Page Routing State: 'learn' | 'exam' | 'games'
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('exam')) return 'exam';
    if (path.includes('games')) return 'games';
    return 'learn';
  });

  // Dark Mode Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_theme');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Completed Topics
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Bookmarked Topics
  const [bookmarkedTopics, setBookmarkedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_bookmarked_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Revision Formula IDs
  const [revisionList, setRevisionList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_revision_list');
      return saved ? JSON.parse(saved) : ['f-add-rule', 'f-perm-distinct', 'f-pigeonhole'];
    } catch {
      return ['f-add-rule', 'f-perm-distinct', 'f-pigeonhole'];
    }
  });

  // Practice Mistakes List
  const [mistakesList, setMistakesList] = useState<{ questionId: string; question: string; explanation: string; topicTitle: string }[]>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_mistakes_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Exam History
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_exam_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Game Scores
  const [gameScores, setGameScores] = useState<Record<string, GameScoreRecord>>(() => {
    try {
      const saved = localStorage.getItem('mdc5001c_game_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Formula Quick Drawer Modal
  const [quickDrawerOpen, setQuickDrawerOpen] = useState(false);

  // Sync Theme to HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mdc5001c_theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Sync State to Local Storage
  useEffect(() => {
    localStorage.setItem('mdc5001c_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('mdc5001c_bookmarked_topics', JSON.stringify(bookmarkedTopics));
  }, [bookmarkedTopics]);

  useEffect(() => {
    localStorage.setItem('mdc5001c_revision_list', JSON.stringify(revisionList));
  }, [revisionList]);

  useEffect(() => {
    localStorage.setItem('mdc5001c_mistakes_list', JSON.stringify(mistakesList));
  }, [mistakesList]);

  useEffect(() => {
    localStorage.setItem('mdc5001c_exam_history', JSON.stringify(examHistory));
  }, [examHistory]);

  useEffect(() => {
    localStorage.setItem('mdc5001c_game_scores', JSON.stringify(gameScores));
  }, [gameScores]);

  // Handle URL change
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('exam')) setCurrentPage('exam');
      else if (path.includes('games')) setCurrentPage('games');
      else setCurrentPage('learn');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleToggleCompleteTopic = (id: string) => {
    setCompletedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleToggleBookmarkTopic = (id: string) => {
    setBookmarkedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleToggleRevisionFormula = (id: string) => {
    setRevisionList(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleRecordMistake = (mistake: { questionId: string; question: string; explanation: string; topicTitle: string }) => {
    setMistakesList(prev => {
      if (prev.some(m => m.questionId === mistake.questionId)) return prev;
      return [...prev, mistake];
    });
  };

  const handleClearMistake = (qId: string) => {
    setMistakesList(prev => prev.filter(m => m.questionId !== qId));
  };

  const handleSaveExamResult = (result: ExamResult) => {
    setExamHistory(prev => [result, ...prev]);
  };

  const handleUpdateGameScore = (gameId: string, score: number) => {
    setGameScores(prev => {
      const current = prev[gameId]?.highScore || 0;
      return {
        ...prev,
        [gameId]: {
          gameId,
          highScore: Math.max(current, score),
          stars: Math.min(3, Math.floor(score / 30) + 1),
          lastPlayed: Date.now()
        }
      };
    });
  };

  const handleResetProgress = () => {
    setCompletedTopics([]);
    setBookmarkedTopics([]);
    setMistakesList([]);
    localStorage.removeItem('mdc5001c_completed_topics');
    localStorage.removeItem('mdc5001c_bookmarked_topics');
    localStorage.removeItem('mdc5001c_mistakes_list');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16 md:pb-0">
      {/* Persistent Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(d => !d)}
        revisionCount={revisionList.length}
        onOpenQuickDrawer={() => setQuickDrawerOpen(true)}
      />

      {/* Main Routed Page Content */}
      <div className="flex-1">
        {currentPage === 'learn' && (
          <LearnPage
            completedTopics={completedTopics}
            onToggleCompleteTopic={handleToggleCompleteTopic}
            bookmarkedTopics={bookmarkedTopics}
            onToggleBookmarkTopic={handleToggleBookmarkTopic}
            revisionList={revisionList}
            onToggleRevisionFormula={handleToggleRevisionFormula}
            mistakesList={mistakesList}
            onRecordMistake={handleRecordMistake}
            onClearMistake={handleClearMistake}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentPage === 'exam' && (
          <ExamPage
            onOpenQuickDrawer={() => setQuickDrawerOpen(true)}
            examHistory={examHistory}
            onSaveExamResult={handleSaveExamResult}
          />
        )}

        {currentPage === 'games' && (
          <GamesPage
            gameScores={gameScores}
            onUpdateGameScore={handleUpdateGameScore}
          />
        )}
      </div>

      {/* Formula Quick-Reference Slide-Over Drawer */}
      <FormulaQuickDrawer
        isOpen={quickDrawerOpen}
        onClose={() => setQuickDrawerOpen(false)}
        revisionList={revisionList}
        onToggleRevision={handleToggleRevisionFormula}
      />

      {/* Academic University Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              Foundation of Mathematics (Course Code: MDC5001C)
            </div>
            <div>
              Unit 1: Introduction to Combinatorics and Its Applications • MSc IT / MCA / MSc Data Science, Sem 1
            </div>
            <div className="text-[11px] text-slate-400">
              Silver Oak College of Computer Application
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => handleNavigate('learn')}
              className="hover:text-indigo-600 transition"
            >
              Learn
            </button>
            <button
              onClick={() => handleNavigate('exam')}
              className="hover:text-indigo-600 transition"
            >
              Exam Centre
            </button>
            <button
              onClick={() => handleNavigate('games')}
              className="hover:text-indigo-600 transition"
            >
              Math Games
            </button>
            <button
              onClick={() => setQuickDrawerOpen(true)}
              className="hover:text-indigo-600 transition"
            >
              Formulas
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
