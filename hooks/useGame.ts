import { useState, useCallback, useEffect } from 'react';
import { generateQuestions } from '../gameLogic';
import type { GameState, Question, Feedback } from '../types';
import { TOTAL_QUESTIONS } from '../constants';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const startGame = useCallback(() => {
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback(null);
    setShowConfetti(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setGameState('playing');
  }, []);
  
  const nextQuestion = useCallback(() => {
    setShowConfetti(false);
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setFeedback(null);
    } else {
      setGameState('end');
    }
  }, [currentQuestionIndex]);

  const submitAnswer = useCallback((answer: number) => {
    if (feedback || !currentQuestion) return;

    const correctAnswer = currentQuestion.num1 * currentQuestion.num2;

    if (answer === correctAnswer) {
      setScore(prevScore => prevScore + 1);
      setFeedback('correct');
      setShowConfetti(true);
    } else {
      setFeedback('incorrect');
    }
    
    setTimeout(() => {
        nextQuestion();
    }, 1800);
  }, [feedback, currentQuestion, nextQuestion]);

  useEffect(() => {
    let timerInterval: number | undefined;

    if (gameState === 'playing' && startTime) {
      timerInterval = window.setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [gameState, startTime]);


  return {
    gameState,
    startGame,
    currentQuestion,
    currentQuestionIndex,
    submitAnswer,
    feedback,
    score,
    showConfetti,
    timeElapsed,
  };
};
