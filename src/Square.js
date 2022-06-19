import * as React from 'react';
import Paper from '@mui/material/Paper';

// CSS.
import './Square.css';

export default function Square(props) {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <h2>{props.name}</h2>
      <div>{JSON.stringify(props.data)}</div>
    </Paper>
  );
}
