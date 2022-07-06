import * as React from 'react';
import Cookies from 'universal-cookie';

export const BingoContext = React.createContext([]);

export const BingoProvider = props => {
  const cookies = new Cookies();
  const cookie_name = 'veganbingo.net';
  const cookie = cookies.get(cookie_name);
  const [bingos, setBingos] = React.useState(cookie || {});

  const hasBingo = id => {
    return id in bingos;
  };

  const addBingo = id => {
    if (!hasBingo(id)) {
      bingos[id] = { id: id, time: (new Date()).toISOString() };
      setBingos({ ...bingos });
      cookies.set(cookie_name, bingos);
    }
  };

  const removeBingo = id => {
    if (hasBingo(id)) {
      delete bingos[id];
      setBingos({ ...bingos });
      cookies.set(cookie_name, bingos);
    }
  };

  const resetBingos = () => {
    setBingos({});
    cookies.remove(cookie_name);
  }

  return (
    <BingoContext.Provider
      value={{ bingos, addBingo, hasBingo, removeBingo, resetBingos }}>
      {props.children}
    </BingoContext.Provider>
  )
};
