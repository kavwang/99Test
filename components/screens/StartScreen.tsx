import React from 'react';
import { TOTAL_QUESTIONS } from '../../constants';
import type { Theme } from '../../types';

interface StartScreenProps {
  onStart: () => void;
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<Pick<StartScreenProps, 'themes' | 'currentTheme' | 'onThemeChange'>> = ({ themes, currentTheme, onThemeChange }) => (
    <div className="mt-10 pt-6 border-t">
        <h3 className="text-center text-gray-600 mb-4">選擇一個你喜歡的主題：</h3>
        <div className="flex justify-center flex-wrap gap-4">
            {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() => onThemeChange(theme)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        currentTheme.id === theme.id
                            ? `${theme.colors.button} text-white shadow-md ${theme.colors.themeSelectorRing}`
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={currentTheme.id === theme.id}
                >
                    {theme.name}
                </button>
            ))}
        </div>
    </div>
);


const StartScreen: React.FC<StartScreenProps> = ({ onStart, themes, currentTheme, onThemeChange }) => (
  <div className="text-center">
    <h1 className={`text-3xl md:text-4xl font-bold ${currentTheme.colors.textHeader} mb-4 transition-colors duration-500`}>九九乘法表挑戰</h1>
    <p className="text-gray-600 mb-8 text-lg">準備好挑戰 {TOTAL_QUESTIONS} 道不重複的題目了嗎？</p>
    <button
      onClick={onStart}
      className={`w-full ${currentTheme.colors.button} text-white font-bold text-xl py-4 rounded-lg shadow-md ${currentTheme.colors.buttonHover} ${currentTheme.colors.buttonActive} transform hover:-translate-y-1 transition-all duration-300`}
    >
      開始遊戲
    </button>
    <ThemeSelector themes={themes} currentTheme={currentTheme} onThemeChange={onThemeChange} />
  </div>
);

export default StartScreen;
