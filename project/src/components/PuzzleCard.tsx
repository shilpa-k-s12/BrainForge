import React from 'react';
import { Check, X, HelpCircle, BrainCircuit } from 'lucide-react';
import { PuzzleData } from '../types/game';
import Timer from './Timer';

interface PuzzleCardProps {
  puzzle: PuzzleData;
  selectedAnswer: string | number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  remainingTime: number;
  onSelectAnswer: (answer: string | number) => void;
  onNextPuzzle: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({
  puzzle,
  selectedAnswer,
  isCorrect,
  showExplanation,
  remainingTime,
  onSelectAnswer,
  onNextPuzzle,
}) => {
  const getDifficultyColor = () => {
    switch (puzzle.difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTypeIcon = () => {
    switch (puzzle.type) {
      case 'pattern':
        return <BrainCircuit className="w-5 h-5 text-blue-500" />;
      case 'sequence':
        return <BrainCircuit className="w-5 h-5 text-purple-500" />;
      case 'matrix':
        return <BrainCircuit className="w-5 h-5 text-green-500" />;
      case 'sudoku':
        return <BrainCircuit className="w-5 h-5 text-orange-500" />;
      default:
        return <BrainCircuit className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {getTypeIcon()}
            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{puzzle.type}</span>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium capitalize ${getDifficultyColor()}`}>{puzzle.difficulty}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm font-medium text-blue-500">{puzzle.points} pts</span>
          </div>
        </div>
        
        <div className="mb-5">
          <Timer remainingTime={remainingTime} totalTime={puzzle.timeLimit} />
        </div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{puzzle.question}</h3>
        
        {puzzle.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {puzzle.options.map((option) => (
              <button
                key={option}
                onClick={() => onSelectAnswer(option)}
                disabled={showExplanation}
                className={`py-3 px-4 border rounded-lg text-left transition-all ${
                  selectedAnswer === option
                    ? isCorrect !== null
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : option === puzzle.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : option === puzzle.correctAnswer && showExplanation
                      ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option}
                {selectedAnswer === option && isCorrect !== null && (
                  <span className="float-right">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
                {option === puzzle.correctAnswer && showExplanation && selectedAnswer !== option && (
                  <span className="float-right">
                    <Check className="w-5 h-5 text-green-500" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {showExplanation && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start">
              <HelpCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">Explanation</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-200 mt-1">{puzzle.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {showExplanation && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={onNextPuzzle}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Next Puzzle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleCard;