import { useState, useEffect } from 'react';

const MAX_SCORE = 100; // Define the maximum score

function Score() {
  const [score, setScore] = useState(MAX_SCORE);
  const [gameOver, setGameOver] = useState(false);

  // Function to update score based on the answer (correct/incorrect)
  const updateScore = (isCorrect) => {
    if (isCorrect) {
      // No score deduction for correct answers (maintain current score)
      return;
    }

    const newScore = Math.max(score - 10, 0); // Reduce score by 10, capped at 0
    setScore(newScore);

    if (newScore === 0) {
      setGameOver(true); // Set game over if score reaches 0
    }
  };

  // Reset score functionality (optional)
  const resetScore = () => {
    setScore(MAX_SCORE);
    setGameOver(false);
  };

  return { score, gameOver, updateScore, resetScore };
}

export default Score;
