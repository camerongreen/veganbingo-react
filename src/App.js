import * as React from 'react';
import Dashboard from './Dashboard';
import { AppContext } from './AppContext';

// Game data.
const data = require('./data/data.json');

export default function App() {
  const [bingos, setBingos] = React.useState([]);

  const hasBingo = id => {
    return id in bingos;
  };

  const addBingo = id => {
    if (!hasBingo(id)) {
      bingos[id] = {id: id, time: new Date()};
      setBingos(bingos);
    }
  };

  const removeBingo = id => {
    if (hasBingo(id)) {
      delete bingos[id];
      setBingos(bingos);
    }
  };

  return (
    <AppContext.Provider value={{ bingos, addBingo, hasBingo, removeBingo }}>
      <Dashboard data={data}/>
    </AppContext.Provider>
  );
}
