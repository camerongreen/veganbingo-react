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

  const hasBingo = id => {
    return id in bingos;
  };

  const addBingo = id => {
    if (!hasBingo(id)) {
      bingos[id] = { id: id, time: (new Date()).toISOString() };
      updateBingos({ ...bingos });
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
    cookies.remove(cookie_name, bingoOptions);
  }

  const updateBingos = (bingos) => {
    setBingos(bingos);
    cookies.set(cookie_name, bingos, bingoOptions);
  }

  return (
    <BingoContext.Provider
      value={{ bingos, addBingo, hasBingo, removeBingo, resetBingos }}>
      {props.children}
    </BingoContext.Provider>
  )
};
