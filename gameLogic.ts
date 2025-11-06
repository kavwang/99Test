import { TOTAL_QUESTIONS } from './constants';
import type { Question } from './types';

export const generateQuestions = (): Question[] => {
  const questionsSet = new Set<string>();
  const newQuestions: Question[] = [];

  while (newQuestions.length < TOTAL_QUESTIONS) {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    
    // Sort to treat 2x3 and 3x2 as the same question
    const key = [num1, num2].sort().join('-');

    if (!questionsSet.has(key)) {
      questionsSet.add(key);
      newQuestions.push({ num1, num2 });
    }
  }
  return newQuestions;
};

export const getEncouragingMessage = (score: number): string => {
    const accuracy = score / TOTAL_QUESTIONS;
    if (accuracy === 1) return "太棒了！全部答對！";
    if (accuracy >= 0.8) return "很厲害喔！繼續加油！";
    if (accuracy >= 0.5) return "不錯喔，再多練習會更棒！";
    return "別灰心，多練習幾次就會進步！";
};
