import * as React from 'react';
export const BingoContext = React.createContext([]);

export const BingoProvider = props => {
  const storage_name = 'veganbingo.net';
  const [bingos, setBingos] = React.useState(JSON.parse(localStorage.getItem(storage_name)) || {});
  const [checkScoreState, setCheckScoreState] = React.useState(false);
  const event = new CustomEvent('bingo:add');

  const hasBingo = id => {
    return id in bingos;
  };

  const addBingo = id => {
    if (!hasBingo(id)) {
      bingos[id] = { id: id, time: (new Date()).toISOString() };
      updateBingos({ ...bingos });

      event.data = {
        bingo: id,
        bingos: bingos,
      };

      document.dispatchEvent(event);
      setCheckScoreState(true);
    }
  };

  const removeBingo = id => {
    if (hasBingo(id)) {
      delete bingos[id];
      updateBingos({ ...bingos });
    }
  };

  const resetBingos = () => {
    updateBingos({});
    localStorage.removeItem(storage_name);
  }

  const toggleBingo = id => {
    hasBingo(id) ? removeBingo(id) : addBingo(id);
  }

  const updateBingos = bingos => {
    setBingos(bingos);
    localStorage.setItem(storage_name, JSON.stringify(bingos));
  }

  const checkScore = () => {
    return checkScoreState;
  }

  return (
    <BingoContext.Provider
      value={{ bingos, addBingo, hasBingo, removeBingo, resetBingos, checkScore, toggleBingo }}>
      {props.children}
    </BingoContext.Provider>
  )
};
