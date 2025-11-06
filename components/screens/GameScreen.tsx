import React, { useState, useEffect, useRef } from 'react';
import type { Question, Feedback, Theme } from '../../types';
import { TOTAL_QUESTIONS } from '../../constants';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

// --- Sub-components ---

const ProgressBar: React.FC<{ current: number; total: number; theme: Theme; time: number }> = ({ current, total, theme, time }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
    <div className="flex justify-between items-center mb-2">
      <p className={`text-xl font-semibold ${theme.colors.textHeader} transition-colors duration-500`}>
        第 {current} / {total} 題
      </p>
      <div className="flex items-center space-x-2 text-lg font-mono font-semibold text-gray-600" aria-label={`已用時間 ${time} 秒`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{formatTime(time)}</span>
      </div>
    </div>
    <div className={`w-full ${theme.colors.progressBarBg} rounded-full h-4 transition-colors duration-500`} role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label="問題進度條">
      <div
        className={`${theme.colors.progressBar} h-4 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const QuestionDisplay: React.FC<{ question: Question; theme: Theme }> = ({ question, theme }) => (
  <div className="my-8 bg-gray-50 p-6 rounded-lg">
    <div className="flex justify-center items-center space-x-4 md:space-x-6 text-5xl md:text-7xl font-bold text-gray-800">
      <span>{question.num1}</span>
      <span className={`${theme.colors.textAccent} transition-colors duration-500`}>×</span>
      <span>{question.num2}</span>
    </div>
  </div>
);

const FeedbackDisplay: React.FC<{ feedback: Feedback; question: Question }> = ({ feedback, question }) => (
  <div className="h-20 mt-4 flex items-center justify-center transition-opacity duration-300" aria-live="polite">
    {feedback === 'correct' && (
      <div className="flex items-center space-x-2 text-green-600 animate-flourish">
        <CheckCircleIcon className="w-8 h-8" />
        <span className="text-2xl font-semibold">答對了！</span>
      </div>
    )}
    {feedback === 'incorrect' && (
      <div className="flex flex-col items-center space-y-1 text-red-600 animate-pulse">
        <div className="flex items-center space-x-2">
          <XCircleIcon className="w-8 h-8" />
          <span className="text-2xl font-semibold">答錯了...</span>
        </div>
        <p className="font-medium text-lg">正確答案是: {question.num1 * question.num2}</p>
      </div>
    )}
  </div>
);

// --- Main GameScreen Component ---

interface GameScreenProps {
  question: Question;
  questionNumber: number;
  onSubmit: (answer: number) => void;
  feedback: Feedback;
  theme: Theme;
  timeElapsed: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ question, questionNumber, onSubmit, feedback, theme, timeElapsed }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const answerInputRef = useRef<HTMLInputElement>(null);

  // Focus input on new questions
  useEffect(() => {
    if (!feedback) {
      answerInputRef.current?.focus();
    }
  }, [question, feedback]);

  // Reset input when question changes
  useEffect(() => {
    setUserAnswer('');
  }, [question]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userAnswer || feedback) return;
    onSubmit(parseInt(userAnswer, 10));
  };

  return (
    <>
      <ProgressBar current={questionNumber} total={TOTAL_QUESTIONS} theme={theme} time={timeElapsed} />
      <QuestionDisplay question={question} theme={theme} />
      
      <form onSubmit={handleSubmit}>
        <input
          ref={answerInputRef}
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={!!feedback}
          className={`w-full text-center text-3xl p-4 border-4 ${theme.colors.inputBorder} rounded-lg focus:ring-4 ${theme.colors.inputFocusRing} ${theme.colors.inputFocusBorder} transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="?"
          aria-label="你的答案"
        />
        <button
          type="submit"
          disabled={!!feedback || !userAnswer}
          className={`mt-6 w-full ${theme.colors.button} text-white font-bold text-xl py-4 rounded-lg shadow-md ${theme.colors.buttonHover} ${theme.colors.buttonActive} transform hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
        >
          送出答案
        </button>
      </form>

      <FeedbackDisplay feedback={feedback} question={question} />
    </>
  );
};

export default GameScreen;
