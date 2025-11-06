export type GameState = 'start' | 'playing' | 'end';
export type Feedback = 'correct' | 'incorrect' | null;
export type Question = {
  num1: number;
  num2: number;
};

export type Theme = {
  id: string;
  name: string;
  colors: {
    background: string;
    textHeader: string;
    button: string;
    buttonHover: string;
    buttonActive: string;
    progressBar: string;
    progressBarBg: string;
    textAccent: string;
    inputBorder: string;
    inputFocusBorder: string;
    inputFocusRing: string;
    themeSelectorRing: string;
  };
};
