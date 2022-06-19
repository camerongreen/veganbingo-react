import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// CSS.
import './Game.css';

// Data.
const data = require('./data/data.json');

export default function Game() {
  let listItems = [];
  Object.entries(data).forEach(([key, value]) => {
    listItems.push(<div>{key} -> {JSON.stringify(value)}</div>);
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Game */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <ul className="Game">
            {listItems}
          </ul>
        </Paper>
      </Grid>
    </Container>
  );
}
