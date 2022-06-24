import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components.
import Square from './Square';

// CSS.
import './Game.css';

export default function Game(props) {
  let listItems = [];
  const theme = useTheme();
  Object.entries(props.data).forEach(([key, value], index) => {
    listItems.push(<Grid key={key} item xs={3} className={value.colour}><Square
      key={key} name={key} data={value}/></Grid>);
  });
  return (
    <Container maxWidth="lg" disableGutters={useMediaQuery(theme.breakpoints.down('sm'))} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {listItems}
      </Grid>
    </Container>
  );
}
