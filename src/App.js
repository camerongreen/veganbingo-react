import * as React from 'react';
import Dashboard from './Dashboard';
import { AppContext } from './AppContext';
import Cookies from 'universal-cookie';

import './App.css';

// Game data.
const data = require('./data/data.json');

export default function App() {
  const cookies = new Cookies();
  const cookie_name = 'veganbingo.net';
  const cookie = cookies.get(cookie_name);
  const [bingos, setBingos] = React.useState(cookie || {});
  const colours = [
    'yellow',
    'pink',
    'blue',
    'purple',
    'green',
  ];

  Object.keys(data).forEach((key, index) => {
    data[key].colour = colours[index % colours.length];
  });

  const hasBingo = id => {
    return id in bingos;
  };

  const addBingo = id => {
    if (!hasBingo(id)) {
      bingos[id] = {id: id, time: (new Date()).toString()};
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

  const resetBingos = () => {
    setBingos({});
    cookies.remove(cookie_name);
  }

  return (
    <AppContext.Provider value={{ bingos, addBingo, hasBingo, removeBingo, resetBingos }}>
      <Dashboard data={data}/>
    </AppContext.Provider>
  );
}
