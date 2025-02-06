import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [score, setScore] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [clickedColor, setClickedColor] = useState('');
  const [lives, setLives] = useState(3); 

  // Generate the random color
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const generateColorOptions = (target) => {
    const colors = [target];
    while (colors.length < 6) {
      const color = generateRandomColor();
      if (!colors.includes(color)) colors.push(color);
    }
    return colors.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const newTarget = generateRandomColor();
    setTargetColor(newTarget);
    setColorOptions(generateColorOptions(newTarget));
    setGameStatus('');
    setClickedColor('');
  }, [newGame]);

  const handleGuess = (selectedColor) => {
    setClickedColor(selectedColor); 

    if (selectedColor === targetColor) {
      setScore((prev) => prev + 5);
      setGameStatus('Correct! Well done! 🎉');
      setTimeout(() => {
        if (lives > 0) {
          setNewGame((prev) => !prev);
        }
      }, 1500);
    } else {
      setLives((prev) => prev - 1); 
      setGameStatus('Wrong! Try again! ❌');
      if (lives <= 1) {
        setGameStatus(`Game Over! You ran out of lives! ❌\n Total score: ${score}`);
      }
    }
  };

  const handleNewGame = () => {
    setNewGame((prev) => !prev);
    setScore(0);
    setLives(3); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="mb-4 text-lg font-semibold text-gray-700">
        Lives: {lives} 
      </div>

      <div
        data-testid="colorBox"
        className="w-64 h-64 mb-8 rounded-lg shadow-lg transition-all duration-300"
        style={{ backgroundColor: clickedColor === targetColor ? targetColor : 'transparent' }}
      ></div>

      <div data-testid="gameInstructions" className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Guess the Color!</h1>
        <p className="text-gray-600">Guess the color that matches the box above!</p>
      </div>

      <div data-testid="score" className="mb-4 text-lg font-semibold text-gray-700">
        Score: {score}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full max-w-2xl">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            onClick={() => handleGuess(color)}
            className={`h-20 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200 ${
              clickedColor === color
                ? color === targetColor
                  ? 'border-4 border-green-600'
                  : 'border-4 border-red-600'
                : ''
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Color option ${index + 1}`}
          ></button>
        ))}
      </div>

      {gameStatus && (
        <div
          data-testid="gameStatus"
          className={`mb-4 text-lg font-semibold ${
            gameStatus.includes('Correct') ? 'text-green-600' : 'text-red-600'
          } animate-pulse`}
        >
          {gameStatus}
        </div>
      )}

      {lives <= 0 && (
        <button
          data-testid="newGameButton"
          onClick={handleNewGame}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          New Game
        </button>
      )}
    </div>
  );
}

export default App;
