import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Components.
import Square from './Square';

// CSS.
import './Game.css';

// Data.
const data = require('./data/data.json');

const bgColors = [
  '#fbb8b8',
  '#b8c8fb',
  '#fbf7b8',
  '#b8fbc6',
  '#c888ff',
];

export default function Game() {
  let listItems = [];
  Object.entries(data).forEach(([key, value], index) => {
    listItems.push(<Grid item xs={3}><Square key={key} name={key} data={value} bgColor={bgColors[index % 5]}/></Grid>);
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={1}>
        {listItems}
      </Grid>
    </Container>
  );
}
