import React from 'react';
import { BrainCircuit, Sun, Moon } from 'lucide-react';

interface GameHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 mb-6 rounded-lg flex justify-between items-center">
      <div className="flex items-center">
        <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">LogicCraft</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Strengthen your analytical thinking</p>
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-600" />
        )}
      </button>
    </header>
  );
};

export default GameHeader;