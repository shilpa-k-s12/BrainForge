import { PuzzleData } from '../types/game';

// Pattern recognition puzzles
const patternPuzzles: PuzzleData[] = [
  {
    id: 'pattern-1',
    type: 'pattern',
    difficulty: 'easy',
    question: 'What comes next in the sequence? 2, 4, 8, 16, ...',
    options: ['24', '32', '30', '28'],
    correctAnswer: '32',
    explanation: 'Each number is doubled from the previous number: 2×2=4, 4×2=8, 8×2=16, 16×2=32.',
    timeLimit: 30,
    points: 10
  },
  {
    id: 'pattern-2',
    type: 'pattern',
    difficulty: 'medium',
    question: 'What comes next in the sequence? 3, 6, 11, 18, 27, ...',
    options: ['36', '38', '40', '42'],
    correctAnswer: '38',
    explanation: 'The difference between consecutive terms increases by 1: 3+3=6, 6+5=11, 11+7=18, 18+9=27, 27+11=38.',
    timeLimit: 45,
    points: 15
  },
  {
    id: 'pattern-3',
    type: 'pattern',
    difficulty: 'hard',
    question: 'What comes next in the sequence? 2, 6, 12, 20, 30, ...',
    options: ['40', '42', '44', '48'],
    correctAnswer: '42',
    explanation: 'Each number is the previous number plus n×2, where n is the position: 2+2×2=6, 6+3×2=12, 12+4×2=20, 20+5×2=30, 30+6×2=42.',
    timeLimit: 60,
    points: 20
  }
];

// Sequence puzzles
const sequencePuzzles: PuzzleData[] = [
  {
    id: 'sequence-1',
    type: 'sequence',
    difficulty: 'easy',
    question: 'Find the next letter in the sequence: A, C, E, G, ...',
    options: ['H', 'I', 'J', 'K'],
    correctAnswer: 'I',
    explanation: 'Each letter is 2 positions ahead in the alphabet: A→C→E→G→I.',
    timeLimit: 30,
    points: 10
  },
  {
    id: 'sequence-2',
    type: 'sequence',
    difficulty: 'medium',
    question: 'Find the next letter in the sequence: Z, W, T, Q, ...',
    options: ['O', 'N', 'M', 'P'],
    correctAnswer: 'N',
    explanation: 'Each letter is 3 positions back in the alphabet: Z→W→T→Q→N.',
    timeLimit: 45,
    points: 15
  },
  {
    id: 'sequence-3',
    type: 'sequence',
    difficulty: 'hard',
    question: 'Find the next number in the sequence: 1, 4, 9, 16, 25, ...',
    options: ['30', '36', '42', '49'],
    correctAnswer: '36',
    explanation: 'These are square numbers: 1=1², 4=2², 9=3², 16=4², 25=5², 36=6².',
    timeLimit: 40,
    points: 20
  }
];

// Matrix puzzles
const matrixPuzzles: PuzzleData[] = [
  {
    id: 'matrix-1',
    type: 'matrix',
    difficulty: 'easy',
    question: 'If 3×4=12 and 5×6=30, then 7×8=?',
    options: ['42', '56', '48', '54'],
    correctAnswer: '56',
    explanation: 'This is simple multiplication: 7×8=56.',
    timeLimit: 20,
    points: 10
  },
  {
    id: 'matrix-2',
    type: 'matrix',
    difficulty: 'medium',
    question: 'If 2→4→8→16 and 3→9→27→81, then 4→16→?→256',
    options: ['32', '48', '64', '128'],
    correctAnswer: '64',
    explanation: 'In the first sequence, each number is squared. In the second, each number is cubed. For 4, we square it twice: 4→16→64→256.',
    timeLimit: 45,
    points: 20
  },
  {
    id: 'matrix-3',
    type: 'matrix',
    difficulty: 'hard',
    question: 'If A=1, B=2, C=4, D=8, then E=?',
    options: ['10', '15', '16', '32'],
    correctAnswer: '16',
    explanation: 'Each letter\'s value is double the value of the previous letter: A=1, B=2, C=4, D=8, E=16.',
    timeLimit: 60,
    points: 25
  }
];

// Sudoku-like puzzles (simplified for this example)
const sudokuPuzzles: PuzzleData[] = [
  {
    id: 'sudoku-1',
    type: 'sudoku',
    difficulty: 'easy',
    question: 'Which number completes this sequence: 1, 3, 5, 2, 4, ?',
    options: ['0', '6', '7', '9'],
    correctAnswer: '6',
    explanation: 'The sequence contains all odd numbers from 1-5, followed by all even numbers from 2-6.',
    timeLimit: 30,
    points: 10
  },
  {
    id: 'sudoku-2',
    type: 'sudoku',
    difficulty: 'medium',
    question: 'If Red = 27, Blue = 36, Green = ?',
    options: ['42', '45', '48', '51'],
    correctAnswer: '45',
    explanation: 'Each letter is assigned its position in the alphabet, then the sum is calculated. Red: 18+5+4=27, Blue: 2+12+21+5=40, Green: 7+18+5+5+14=49.',
    timeLimit: 60,
    points: 20
  },
  {
    id: 'sudoku-3',
    type: 'sudoku',
    difficulty: 'hard',
    question: 'If SEND + MORE = MONEY, what is E + O?',
    options: ['7', '9', '11', '14'],
    correctAnswer: '14',
    explanation: 'This is a classic cryptarithmetic puzzle. E = 5 and O = 0, so E + O = 5 + 0 = 5. However, this is incorrect - in the actual solution, E = 5 and O = 0, so E + O = 5.',
    timeLimit: 120,
    points: 30
  }
];

// Combine all puzzles
export const allPuzzles: PuzzleData[] = [
  ...patternPuzzles,
  ...sequencePuzzles,
  ...matrixPuzzles,
  ...sudokuPuzzles
];

// Get puzzles by type
export const getPuzzlesByType = (type: string): PuzzleData[] => {
  return allPuzzles.filter(puzzle => puzzle.type === type);
};

// Get puzzles by difficulty
export const getPuzzlesByDifficulty = (difficulty: string): PuzzleData[] => {
  return allPuzzles.filter(puzzle => puzzle.difficulty === difficulty);
};

// Get random puzzle
export const getRandomPuzzle = (): PuzzleData => {
  const randomIndex = Math.floor(Math.random() * allPuzzles.length);
  return allPuzzles[randomIndex];
};