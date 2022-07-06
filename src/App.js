import * as React from 'react';
import Dashboard from './Dashboard';
import { BingoProvider } from './BingoContext';


import './styles/App.css';

export default function App() {

  return (
    <BingoProvider>
      <Dashboard />
    </BingoProvider>
  );
}
