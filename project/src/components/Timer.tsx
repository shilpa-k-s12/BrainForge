import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  remainingTime: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ remainingTime, totalTime }) => {
  const percentage = (remainingTime / totalTime) * 100;
  
  // Determine color based on remaining time
  const getColorClass = () => {
    if (percentage > 60) return 'text-green-500';
    if (percentage > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <Clock className={`w-5 h-5 ${getColorClass()}`} />
      <div className="flex flex-col">
        <span className={`text-lg font-semibold ${getColorClass()}`}>
          {formatTime(remainingTime)}
        </span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className={`h-2 rounded-full ${getColorClass().replace('text-', 'bg-')}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timer;