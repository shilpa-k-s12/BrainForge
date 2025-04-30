import React from 'react';
import { TrendingUp, Award, Clock } from 'lucide-react';
import { GameStats } from '../types/game';

interface ScoreBoardProps {
  stats: GameStats;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Your Progress</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-300" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">{stats.score}</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 mb-2">
            <Award className="w-5 h-5 text-green-600 dark:text-green-300" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Solved</span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.puzzlesSolved}</span>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Streak</span>
          <div className="flex items-center space-x-1">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">{stats.currentStreak}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">/ {stats.bestStreak}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-800 mb-2">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-300" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Avg Time</span>
          <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">
            {stats.averageTime > 0 ? `${Math.round(stats.averageTime)}s` : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;