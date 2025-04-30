export type PuzzleType = 'sequence' | 'pattern' | 'sudoku' | 'matrix';

export type PuzzleData = {
  id: string;
  type: PuzzleType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  timeLimit: number; // in seconds
  points: number;
};

export type GameStats = {
  score: number;
  puzzlesSolved: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number;
};

export type GameState = {
  currentPuzzle: PuzzleData | null;
  gameStats: GameStats;
  remainingTime: number;
  selectedAnswer: string | number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  gameStatus: 'idle' | 'playing' | 'paused' | 'completed';
};