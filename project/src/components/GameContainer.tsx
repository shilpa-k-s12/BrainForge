import React, { useState } from 'react';
import { HelpCircle, BookOpen, BrainCircuit } from 'lucide-react';
import GameHeader from './GameHeader';
import ScoreBoard from './ScoreBoard';
import PuzzleCard from './PuzzleCard';
import GameControls from './GameControls';
import { useGameLogic } from '../hooks/useGameLogic';

const GameContainer: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const {
    gameState,
    startGame,
    resetGame,
    pauseGame,
    selectAnswer,
    nextPuzzle,
  } = useGameLogic();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-200">
        <div className="max-w-3xl mx-auto">
          <GameHeader 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
          />

          <div className="mb-6 flex justify-between items-center">
            <GameControls 
              gameStatus={gameState.gameStatus}
              onStart={startGame}
              onReset={resetGame}
              onPause={pauseGame}
            />
            
            <button
              onClick={toggleInstructions}
              className="flex items-center p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {showInstructions ? (
                <>
                  <HelpCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm">Hide Help</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm">Help</span>
                </>
              )}
            </button>
          </div>

          {showInstructions && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-start mb-3">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">How to Play</h2>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <p>Welcome to LogicCraft, a game designed to strengthen your logical thinking skills through various puzzles.</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Each puzzle has a time limit shown by the timer at the top.</li>
                  <li>Select the correct answer from the given options.</li>
                  <li>If you answer correctly, you earn points based on the puzzle's difficulty.</li>
                  <li>If you run out of time, you'll lose your current streak.</li>
                  <li>After each puzzle, you'll see an explanation of the correct solution.</li>
                  <li>Try to maintain your streak to demonstrate your mastery!</li>
                </ol>
              </div>
            </div>
          )}

          <ScoreBoard stats={gameState.gameStats} />

          {gameState.currentPuzzle ? (
            <PuzzleCard
              puzzle={gameState.currentPuzzle}
              selectedAnswer={gameState.selectedAnswer}
              isCorrect={gameState.isCorrect}
              showExplanation={gameState.showExplanation}
              remainingTime={gameState.remainingTime}
              onSelectAnswer={selectAnswer}
              onNextPuzzle={nextPuzzle}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <BrainCircuit className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Ready to Train Your Brain?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Solve puzzles, improve your logical thinking, and track your progress.
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Start Playing
              </button>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>LogicCraft © 2025 • Exercise your brain daily!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;