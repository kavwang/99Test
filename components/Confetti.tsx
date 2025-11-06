import React from 'react';

const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  const confettiPieces = Array.from({ length: 150 }).map((_, index) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const style = {
      left: `${Math.random() * 100}%`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: `${Math.random() * 3 + 4}s`,
      animationDelay: `${Math.random() * 0.5}s`,
      width: `${Math.random() * 6 + 8}px`,
      height: `${Math.random() * 10 + 10}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    return <div key={index} className="confetti-piece" style={style} />;
  });

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
};

export default Confetti;
