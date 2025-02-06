import React, { useState } from "react";
import Grid from "./components/Grid";
import Message from "./components/Message";
import Keyboard from "./components/Keyboard";
import "./App.css";

const WORDS = ["APPLE", "BRAVE", "CRANE", "DWARF", "EAGLE",
  "FLAME", "GLOBE", "HONEY", "IGLOO", "JOLLY",
  "KARMA", "LUCKY", "MANGO", "NOBLE", "OLIVE",
  "PRIDE", "QUILT", "ROVER", "SUGAR", "TIGER",
  "UMBRA", "VIVID", "WHALE", "XENON", "YACHT",
  "ZEBRA", "ADOPT", "BLINK", "CHARM", "DENSE",
  "ELBOW", "FAINT", "GRIND", "HOVER", "INBOX",
  "JOUST", "KIOSK", "LEMON", "MIRTH", "NUDGE",
  "OTTER", "PLUCK", "QUARK", "RIVAL", "SWOOP",
  "TREAD", "UNZIP", "VAPOR", "WRIST", "YIELD"]; // Hardcoded 5-letter words

function App() {
  const [targetWord, setTargetWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (key) => {
    if (gameOver) return;

    if (key === "ENTER") {
      if (currentGuess.length !== 5) {
        setMessage("Word must be 5 letters long!");
        return;
      }
      if (!WORDS.includes(currentGuess)) {
        setMessage("Not a valid word!");
        return;
      }

      const newGuesses = [...guesses];
      newGuesses[attempts] = currentGuess;
      setGuesses(newGuesses);

      if (currentGuess === targetWord) {
        setMessage("You win! 🎉");
        setGameOver(true);
      } else if (attempts >= 5) {
        setMessage(`You lose! The word was ${targetWord}.`);
        setGameOver(true);
      } else {
        setAttempts(attempts + 1);
        setCurrentGuess("");
      }
    } else if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const resetGame = () => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses(Array(6).fill(""));
    setCurrentGuess("");
    setAttempts(0);
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      <Message message={message} />
      <Grid guesses={guesses} targetWord={targetWord} attempts={attempts} />
      <Keyboard handleInput={handleInput} />
      <button onClick={resetGame} className="new-game-button">
        New Game
      </button>
    </div>
  );
}

export default App;