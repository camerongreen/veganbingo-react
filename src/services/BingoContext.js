import * as React from "react";
export const BingoContext = React.createContext([]);

export const winningCombinations = [
  // Rows
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columns
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

export const BingoProvider = (props) => {
  const storage_name = "veganbingo.net";
  const [bingos, setBingos] = React.useState(
    JSON.parse(localStorage.getItem(storage_name)) || {},
  );

  const [completedLines, setCompletedLines] = React.useState(
    JSON.parse(localStorage.getItem(`${storage_name}_completedLines`)) || []
  );
  const [blackoutCompleted, setBlackoutCompleted] = React.useState(
    JSON.parse(localStorage.getItem(`${storage_name}_blackoutCompleted`)) || false
  );

  const [newlyCompletedLines, setNewlyCompletedLines] = React.useState([]);
  const [newlyCompletedBlackout, setNewlyCompletedBlackout] = React.useState(false);

  const { sections } = props;

  const hasBingo = (id) => {
    return id in bingos;
  };

  const addBingo = (id) => {
    if (!hasBingo(id)) {
      const newBingos = { ...bingos, [id]: { id: id, time: new Date().toISOString() } };
      updateBingos(newBingos);
      checkForWins(newBingos);
    }
  };

  const checkForWins = (currentBingos) => {
    const newlyCompleted = [];
    for (let i = 0; i < winningCombinations.length; i++) {
      if (completedLines.includes(i)) continue;

      const combination = winningCombinations[i];
      const isLineComplete = combination.every(index => sections[index] in currentBingos);
      if (isLineComplete) {
        newlyCompleted.push(i);
      }
    }

    if (newlyCompleted.length > 0) {
      const newCompletedLines = [...completedLines, ...newlyCompleted];
      setCompletedLines(newCompletedLines);
      localStorage.setItem(`${storage_name}_completedLines`, JSON.stringify(newCompletedLines));
      setNewlyCompletedLines(newlyCompleted);
    }

    // Check for blackout
    if (!blackoutCompleted && Object.keys(currentBingos).length === 16) {
      setBlackoutCompleted(true);
      localStorage.setItem(`${storage_name}_blackoutCompleted`, JSON.stringify(true));
      setNewlyCompletedBlackout(true);
    }
  };

  const clearNewWins = () => {
    setNewlyCompletedLines([]);
    setNewlyCompletedBlackout(false);
  }

  const removeBingo = (id) => {
    if (hasBingo(id)) {
      delete bingos[id];
      updateBingos({ ...bingos });
    }
  };

  const resetBingos = () => {
    updateBingos({});
    localStorage.removeItem(storage_name);
    localStorage.removeItem(`${storage_name}_completedLines`);
    localStorage.removeItem(`${storage_name}_blackoutCompleted`);
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
        newlyCompletedLines,
        newlyCompletedBlackout,
        clearNewWins,
      }}
    >
      {props.children}
    </BingoContext.Provider>
  );
};
