import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Components.
import Square from './Square';

// CSS.
import './Game.css';


// Data.
const data = require('./data/data.json');

export default function Game() {
  let listItems = [];
  Object.entries(data).forEach(([key, value]) => {
    listItems.push(<Grid item xs={3}><Square name={key} data={value}/></Grid>);
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        {listItems}
      </Grid>
    </Container>
  );
}
