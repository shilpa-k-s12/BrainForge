import React from 'react';
import { Play, RefreshCw, Pause } from 'lucide-react';

interface GameControlsProps {
  gameStatus: 'idle' | 'playing' | 'paused' | 'completed';
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStatus,
  onStart,
  onReset,
  onPause,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {gameStatus === 'idle' ? (
        <button 
          onClick={onStart}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Game
        </button>
      ) : (
        <>
          <button 
            onClick={onPause}
            className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            {gameStatus === 'paused' ? (
              <>
                <Play className="w-5 h-5 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            )}
          </button>
          
          <button 
            onClick={onReset}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default GameControls;