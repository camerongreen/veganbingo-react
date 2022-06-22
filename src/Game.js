import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Components.
import Square from './Square';

// CSS.
import './Game.css';

const bgColors = [
  '#fbb8b8',
  '#fbf7b8',
  '#d888ff',
  '#b8fbc6',
  '#b8c8fb',
];

export default function Game(props) {
  let listItems = [];
  Object.entries(props.data).forEach(([key, value], index) => {
    listItems.push(<Grid key={key} item xs={3}><Square key={key} name={key} data={value} bgColor={bgColors[index % 5]}/></Grid>);
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {listItems}
      </Grid>
    </Container>
  );
}
