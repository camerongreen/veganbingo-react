import * as React from 'react';
import Dashboard from './Dashboard';

// Game data.
const data = require('./data/data.json');

export default function App() {
  return (
    <Dashboard data={data} />
  );
}
