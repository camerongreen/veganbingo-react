import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components.
import Square from './Square';

// Services
import DataService from './services/DataService';

// CSS.
import './styles/Game.css';

export default function Game() {
  let listItems = [];
  const theme = useTheme();
  const dataService = new DataService();
  const data = dataService.getData();

  Object.entries(data).forEach(([key, value], index) => {
    listItems.push(<Grid key={key} item xs={3} className={value.colour}><Square
      key={key} name={key} /></Grid>);
  });

  return (
    <Container maxWidth="lg" disableGutters={useMediaQuery(theme.breakpoints.down('sm'))} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {listItems}
      </Grid>
    </Container>
  );
}
