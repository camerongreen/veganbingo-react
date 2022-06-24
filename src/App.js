import * as React from 'react';
import Dashboard from './Dashboard';
import { AppContext } from './AppContext';
import Cookies from 'universal-cookie';

// Game data.
const data = require('./data/data.json');

export default function App() {
  const cookies = new Cookies();
  const cookie_name = 'veganbingo.net';
  const cookie = cookies.get(cookie_name);
  const [bingos, setBingos] = React.useState(cookie || {});

  const hasBingo = id => {
    return id in bingos;
  };

  const addBingo = id => {
    if (!hasBingo(id)) {
      bingos[id] = {id: id, time: new Date()};
      setBingos({...bingos});
      cookies.set(cookie_name, bingos);
    }
  };

  const removeBingo = id => {
    if (hasBingo(id)) {
      delete bingos[id];
      setBingos({...bingos});
      cookies.set(cookie_name, bingos);
    }
  };

  return (
    <AppContext.Provider value={{ bingos, addBingo, hasBingo, removeBingo }}>
      <Dashboard data={data}/>
    </AppContext.Provider>
  );
}
