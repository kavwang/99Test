import React, { useMemo, useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import Confetti from './components/Confetti';
import StartScreen from './components/screens/StartScreen';
import GameScreen from './components/screens/GameScreen';
import EndScreen from './components/screens/EndScreen';
import { THEMES } from './themes';
import type { Theme } from './types';

export default function App() {
  const {
    gameState,
    startGame,
    currentQuestion,
    currentQuestionIndex,
    submitAnswer,
    feedback,
    score,
    showConfetti,
    timeElapsed
  } = useGame();
  
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('multiplication-game-theme');
    if (savedThemeId) {
      const savedTheme = THEMES.find(t => t.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('multiplication-game-theme', theme.id);
  };

  const cardAnimation = useMemo(() => {
    if (feedback === 'correct') {
      return 'border-green-400 shadow-lg shadow-green-500/30';
    }
    if (feedback === 'incorrect') {
      return 'animate-shake border-red-400 shadow-lg shadow-red-500/30';
    }
    return '';
  }, [feedback]);
  
  const renderGameContent = () => {
    switch (gameState) {
      case 'playing':
        if (!currentQuestion) return null;
        return (
          <GameScreen
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            onSubmit={submitAnswer}
            feedback={feedback}
            theme={currentTheme}
            timeElapsed={timeElapsed}
          />
        );
      case 'end':
        return <EndScreen score={score} onRestart={startGame} theme={currentTheme} timeElapsed={timeElapsed} />;
      case 'start':
      default:
        return <StartScreen 
          onStart={startGame} 
          themes={THEMES} 
          currentTheme={currentTheme} 
          onThemeChange={handleThemeChange} 
        />;
    }
  };

  return (
    <>
      <Confetti active={showConfetti} />
      <main className={`${currentTheme.colors.background} min-h-screen flex items-center justify-center p-4 font-sans antialiased transition-colors duration-500`}>
        <div className={`w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 border-4 border-transparent transition-all duration-500 ${cardAnimation}`}>
          {renderGameContent()}
        </div>
      </main>
    </>
  );
}
