import * as React from 'react';
import Cookies from 'universal-cookie';
export const BingoContext = React.createContext([]);

export const BingoProvider = props => {
  const cookies = new Cookies();
  const cookie_name = 'veganbingo.net';
  const cookieOptions = {
    path: '/',
    sameSite: 'strict',
    maxAge: 63072000
  };
  const cookie = cookies.get(cookie_name, cookieOptions);
  const [bingos, setBingos] = React.useState(cookie || {});
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
    cookies.remove(cookie_name, cookieOptions);
  }

  const toggleBingo = id => {
    hasBingo(id) ? removeBingo(id) : addBingo(id);
  }

  const updateBingos = (bingos) => {
    setBingos(bingos);
    cookies.set(cookie_name, bingos, cookieOptions);
  }

  return (
    <BingoContext.Provider
      value={{ bingos, addBingo, hasBingo, removeBingo, resetBingos, toggleBingo }}>
      {props.children}
    </BingoContext.Provider>
  )
};
