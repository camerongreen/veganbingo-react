import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// CSS.
import './Page.css';

// Data.
const data = require('./data/data.json');

export default function Page() {
  let { name } = useParams();
  const page = data[name];
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <img src={require('../public/images/' + name + '.png')}
             alt={page.description + ' Page'}/>
        <h2>{page.description}</h2>
        <div className="rules">{page.rules}</div>
        <div className="main">{page.main}</div>
      </Grid>
    </Container>
  );
}
