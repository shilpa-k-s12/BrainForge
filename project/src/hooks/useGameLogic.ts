import { useState, useEffect, useCallback } from 'react';
import { GameState, GameStats, PuzzleData } from '../types/game';
import { getRandomPuzzle } from '../data/puzzles';

const initialGameStats: GameStats = {
  score: 0,
  puzzlesSolved: 0,
  currentStreak: 0,
  bestStreak: 0,
  averageTime: 0,
};

const initialGameState: GameState = {
  currentPuzzle: null,
  gameStats: initialGameStats,
  remainingTime: 0,
  selectedAnswer: null,
  isCorrect: null,
  showExplanation: false,
  gameStatus: 'idle',
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Load a new puzzle
  const loadPuzzle = useCallback(() => {
    const puzzle = getRandomPuzzle();
    
    setGameState(prev => ({
      ...prev,
      currentPuzzle: puzzle,
      remainingTime: puzzle.timeLimit,
      selectedAnswer: null,
      isCorrect: null,
      showExplanation: false,
      gameStatus: 'playing',
    }));
  }, []);

  // Start the game
  const startGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      gameStatus: 'playing',
    });
    loadPuzzle();
  }, [loadPuzzle]);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [timer]);

  // Pause the game
  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'paused' ? 'playing' : 'paused',
    }));
  }, []);

  // Select an answer
  const selectAnswer = useCallback((answer: string | number) => {
    if (gameState.gameStatus !== 'playing' || !gameState.currentPuzzle) return;

    const isCorrect = answer === gameState.currentPuzzle.correctAnswer;
    
    const newStreak = isCorrect 
      ? gameState.gameStats.currentStreak + 1 
      : 0;
    
    const newBestStreak = Math.max(newStreak, gameState.gameStats.bestStreak);
    
    const timeSpent = gameState.currentPuzzle.timeLimit - gameState.remainingTime;
    
    const newAverageTime = gameState.gameStats.puzzlesSolved === 0
      ? timeSpent
      : (gameState.gameStats.averageTime * gameState.gameStats.puzzlesSolved + timeSpent) / 
        (gameState.gameStats.puzzlesSolved + (isCorrect ? 1 : 0));

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect,
      showExplanation: true,
      gameStats: {
        score: prev.gameStats.score + (isCorrect ? prev.currentPuzzle?.points || 0 : 0),
        puzzlesSolved: prev.gameStats.puzzlesSolved + (isCorrect ? 1 : 0),
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        averageTime: newAverageTime,
      },
    }));

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [gameState, timer]);

  // Next puzzle
  const nextPuzzle = useCallback(() => {
    loadPuzzle();
  }, [loadPuzzle]);

  // Timer effect
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameState.currentPuzzle && !timer) {
      const interval = setInterval(() => {
        setGameState(prev => {
          if (prev.remainingTime <= 0) {
            clearInterval(interval);
            return {
              ...prev,
              remainingTime: 0,
              showExplanation: true,
              isCorrect: false,
              gameStats: {
                ...prev.gameStats,
                currentStreak: 0,
              },
            };
          }
          return {
            ...prev,
            remainingTime: prev.remainingTime - 1,
          };
        });
      }, 1000);
      
      setTimer(interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [gameState.gameStatus, gameState.currentPuzzle, timer]);

  // Pause timer when game is paused
  useEffect(() => {
    if (gameState.gameStatus === 'paused' && timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [gameState.gameStatus, timer]);

  return {
    gameState,
    startGame,
    resetGame,
    pauseGame,
    selectAnswer,
    nextPuzzle,
  };
};