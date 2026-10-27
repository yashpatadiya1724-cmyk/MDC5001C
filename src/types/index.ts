export type PageType = 'learn' | 'exam' | 'games';

export interface PracticeQuestionItem {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string; // for options: index or exact text; for numeric: string of number
  type: 'mcq' | 'numeric' | 'true-false';
  explanation: string;
  hint?: string;
}

export interface TopicLesson {
  id: string;
  number: number;
  title: string;
  category: 'Counting Principles' | 'Permutations & Combinations' | 'Theorems & Principles' | 'Multisets & Partitions' | 'Recurrence Relations';
  shortSummary: string;
  simpleDefinition: string;
  intuitiveExplanation: string;
  simpleLanguageExplanation: string; // "Explain More Simply" version
  primaryFormula: {
    name: string;
    latex: string;
    meaningOfSymbols: { symbol: string; meaning: string }[];
    whenToUse: string;
  };
  workedExample: {
    problem: string;
    stepByStep: { step: number; title: string; detail: string; math?: string }[];
    finalAnswer: string;
  };
  additionalPracticeExample?: {
    problem: string;
    solution: string;
    math?: string;
  };
  commonMistakes: string[];
  examTips: string[];
  practiceQuestions: PracticeQuestionItem[];
}

export interface FormulaItem {
  id: string;
  name: string;
  category: string;
  latex: string;
  whenToUse: string;
  variables: { symbol: string; description: string }[];
  workedExample: {
    problem: string;
    calculation: string;
    result: string;
  };
  practiceQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type ExamDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type ExamMode = 'practice' | 'mock';

export interface ExamQuestion {
  id: string;
  topicId: string;
  topicName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'numeric' | 'true-false' | 'fill-formula';
  question: string;
  latexQuestion?: string;
  options?: string[];
  correctAnswer: string; // option index or numeric string or formula
  explanation: string;
  hint?: string;
  marks: number;
}

export interface ExamConfig {
  mode: ExamMode;
  difficulty: ExamDifficulty;
  questionCount: number;
  durationMinutes: number; // 0 for unlimited in practice
  selectedTopicIds: string[]; // empty means all
}

export interface ExamResult {
  examId: string;
  timestamp: number;
  mode: ExamMode;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  questions: ExamQuestion[];
  userAnswers: Record<string, string>;
  topicBreakdown: Record<string, { total: number; correct: number }>;
}

export interface GameScoreRecord {
  gameId: string;
  highScore: number;
  stars: number;
  lastPlayed: number;
}
