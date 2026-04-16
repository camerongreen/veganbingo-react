import * as React from "react";
export const BingoContext = React.createContext({});

export const winningCombinations = [
  // Rows.
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columns.
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonals.
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

export const BingoProvider = (props) => {
  const storage_name = "veganbingo.net";
  const [bingos, setBingos] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storage_name)) || {};
    } catch {
      return {};
    }
  });

  const { sections } = props;

  const hasBingo = (id) => {
    return id in bingos;
  };

  const addBingo = (id) => {
    if (!hasBingo(id)) {
      const newBingos = { ...bingos, [id]: { id: id, time: new Date().toISOString() } };
      updateBingos(newBingos);
      checkForWins(newBingos, id);
    }
  };

  const checkForWins = (currentBingos, newSquareId) => {
    const newSquareIndex = sections.indexOf(newSquareId);
    const completedSquares = new Set();

    // Check for blackout first
    if (Object.keys(currentBingos).length === 16) {
      // Add all squares for blackout
      sections.forEach(section => completedSquares.add(section));
    } else {
      // Find all winning combinations that contain the newly added square
      for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        
        // Only check combinations that contain the new square
        if (combination.includes(newSquareIndex)) {
          const isLineComplete = combination.every(index => sections[index] in currentBingos);
          
          if (isLineComplete) {
            // Add all squares from this winning line
            combination.forEach(index => {
              completedSquares.add(sections[index]);
            });
          }
        }
      }
    }

    // Only save if there are completed squares
    if (completedSquares.size > 0) {
      localStorage.setItem(
        `${storage_name}_completed_squares`, 
        JSON.stringify(Array.from(completedSquares))
      );
    }
  };

  const removeBingo = (id) => {
    if (hasBingo(id)) {
      const newBingos = Object.fromEntries(
        Object.entries(bingos).filter(([key]) => key !== id)
      );
      updateBingos(newBingos);
    }
  };

  const resetBingos = () => {
    updateBingos({});
    localStorage.removeItem(storage_name);
    localStorage.removeItem(`${storage_name}_completed_squares`);
  };

  const toggleBingo = (id) => {
    hasBingo(id) ? removeBingo(id) : addBingo(id);
  };

  const updateBingos = (bingos) => {
    setBingos(bingos);
    localStorage.setItem(storage_name, JSON.stringify(bingos));
  };

  return (
    <BingoContext.Provider
      value={{
        bingos,
        addBingo,
        hasBingo,
        removeBingo,
        resetBingos,
        toggleBingo,
      }}
    >
      {props.children}
    </BingoContext.Provider>
  );
};
