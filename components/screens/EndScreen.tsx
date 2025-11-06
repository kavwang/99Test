import React from 'react';
import { TOTAL_QUESTIONS } from '../../constants';
import { getEncouragingMessage } from '../../gameLogic';
import type { Theme } from '../../types';

interface EndScreenProps {
  score: number;
  onRestart: () => void;
  theme: Theme;
  timeElapsed: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart, theme, timeElapsed }) => (
  <div className="text-center">
    <h2 className={`text-3xl md:text-4xl font-bold ${theme.colors.textHeader} mb-4 transition-colors duration-500`}>回合結束！</h2>
    <p className="text-gray-600 text-xl mb-2">你的成績是：</p>
    <div className="text-7xl font-bold text-green-600 my-4 animate-pulse">
      {score} / {TOTAL_QUESTIONS}
    </div>
    
    <div className="flex justify-center items-center space-x-2 text-lg text-gray-500 mb-6" aria-label={`總共花了 ${timeElapsed} 秒`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>總共花了：{formatTime(timeElapsed)}</span>
    </div>

    <p className="text-lg text-gray-700 font-medium mb-8">{getEncouragingMessage(score)}</p>
    <button
      onClick={onRestart}
      className={`w-full ${theme.colors.button} text-white font-bold text-xl py-4 rounded-lg shadow-md ${theme.colors.buttonHover} ${theme.colors.buttonActive} transform hover:-translate-y-1 transition-all duration-300`}
    >
      再玩一次
    </button>
  </div>
);

export default EndScreen;
