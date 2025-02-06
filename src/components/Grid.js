import React from "react";

const Grid = ({ guesses, targetWord, attempts }) => {
  const getFeedback = (guess, index) => {
    if (!guess) return "gray";
    if (guess[index] === targetWord[index]) return "green";
    if (targetWord.includes(guess[index])) return "yellow";
    return "gray";
  };

  return (
    <div className="grid">
      {guesses.map((guess, row) => (
        <div key={row} className="row">
          {Array(5)
            .fill("")
            .map((_, col) => (
              <div
                key={col}
                className={`cell ${row < attempts ? getFeedback(guess, col) : ""}`}
              >
                {guess[col] || ""}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;