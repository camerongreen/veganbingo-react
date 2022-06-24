import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Components.
import Square from './Square';

// CSS.
import './Game.css';

export default function Game(props) {
  let listItems = [];
  Object.entries(props.data).forEach(([key, value], index) => {
    listItems.push(<Grid key={key} item xs={3} className={value.colour}><Square key={key} name={key} data={value}/></Grid>);
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {listItems}
      </Grid>
    </Container>
  );
}
