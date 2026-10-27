import React, { useState } from 'react';
import { PageType } from '../types';
import { BookOpen, GraduationCap, Gamepad2, Bookmark, Moon, Sun, Menu, X, Sparkles, BookCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  revisionCount: number;
  onOpenQuickDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDarkMode,
  onToggleTheme,
  revisionCount,
  onOpenQuickDrawer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'learn' as PageType, label: 'Learn', fullLabel: 'Learn & Formulas', icon: BookOpen },
    { id: 'exam' as PageType, label: 'Exam', fullLabel: 'Exam Centre', icon: GraduationCap },
    { id: 'games' as PageType, label: 'Games', fullLabel: 'Math Games', icon: Gamepad2 }
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Academic Info */}
          <div 
            onClick={() => onNavigate('learn')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition shrink-0">
              <span className="font-extrabold text-xs sm:text-sm tracking-wider">MDC</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight truncate">
                  Foundation of Math
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
                  MDC5001C
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                <span className="hidden sm:inline">Silver Oak • </span>Unit 1: Combinatorics
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.fullLabel}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Formula & Revision Drawer Button (Desktop + Tablet) */}
            <button
              onClick={onOpenQuickDrawer}
              className="relative p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition"
              title="Formula Quick-Ref & Revision List"
              aria-label="Formula quick reference"
            >
              <Bookmark className="w-4 h-4" />
              {revisionCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                  {revisionCount}
                </span>
              )}
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2 animate-fadeIn shadow-lg">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.fullLabel}
                </button>
              );
            })}

            <button
              onClick={() => {
                onOpenQuickDrawer();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-amber-500" />
                <span>Formulas & Revision Cheat Sheet</span>
              </div>
              {revisionCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs font-bold">
                  {revisionCount}
                </span>
              )}
            </button>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              MSc IT / MCA / MSc DS • Silver Oak College
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb friendly with Safe Area padding) */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 pt-1 pb-[calc(env(safe-area-inset-bottom,0px)+0.35rem)] flex items-center justify-around shadow-xl"
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl min-h-[44px] transition ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[11px] leading-tight">{item.label}</span>
            </button>
          );
        })}

        {/* 4th Tab: Formulas Quick Drawer */}
        <button
          onClick={onOpenQuickDrawer}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl min-h-[44px] transition text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium relative"
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 stroke-[1.8]" />
            {revisionCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-amber-500 text-white rounded-full text-[9px] font-bold min-w-[14px] text-center">
                {revisionCount}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-tight">Formulas</span>
        </button>
      </nav>
    </>
  );
};